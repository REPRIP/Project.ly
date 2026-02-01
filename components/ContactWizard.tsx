import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Check, Send, AlertCircle, Loader2, X } from 'lucide-react';

// --- Types ---
interface FormData {
    name: string;
    email: string;
    company: string;
    role: string;
    projectType: 'web-app' | 'website' | 'internal-tool' | 'other' | '';
    budget: string;
    timeline: string;
    description: string;
    competitors: string;
}

const INITIAL_DATA: FormData = {
    name: '',
    email: '',
    company: '',
    role: '',
    projectType: '',
    budget: '',
    timeline: '',
    description: '',
    competitors: ''
};

// --- Sub-components ---

const InputField = ({ label, value, onChange, placeholder, error, type = "text" }: any) => (
    <div className="space-y-2">
        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{label}</label>
        <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`w-full p-4 rounded-xl bg-zinc-100 dark:bg-zinc-800/50 border 
      ${error ? 'border-red-500 focus:border-red-500' : 'border-zinc-200 dark:border-zinc-700 focus:border-neon-blue'} 
      outline-none transition-all placeholder:text-zinc-400 dark:placeholder:text-zinc-600`}
        />
        {error && <span className="text-xs text-red-500 flex items-center gap-1"><AlertCircle size={10} /> {error}</span>}
    </div>
);

const RadioCard = ({ selected, value, onChange, label, description }: any) => (
    <div
        onClick={() => onChange(value)}
        className={`p-4 rounded-xl border cursor-pointer transition-all duration-300 relative overflow-hidden group
      ${selected === value
                ? 'border-neon-blue bg-neon-blue/5 dark:bg-neon-blue/10'
                : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600'
            }
    `}
    >
        <div className="flex justify-between items-start mb-2">
            <span className={`font-medium ${selected === value ? 'text-neon-blue' : 'text-zinc-900 dark:text-white'}`}>{label}</span>
            {selected === value && <Check size={16} className="text-neon-blue" />}
        </div>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">{description}</p>
    </div>
);

import { supabase } from '../lib/supabase';

// --- Wizard ---

interface ContactWizardProps {
    isOpen: boolean;
    onClose: () => void;
}

export const ContactWizard: React.FC<ContactWizardProps> = ({ isOpen, onClose }) => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState<FormData>(INITIAL_DATA);
    const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // Anti-spam state
    const [honeyPot, setHoneyPot] = useState('');
    const openTime = React.useRef(Date.now());

    // Reset when closed
    useEffect(() => {
        if (!isOpen) {
            const timer = setTimeout(() => {
                setStep(1);
                setIsSuccess(false);
                setFormData(INITIAL_DATA);
                setHoneyPot(''); // Reset honeypot
                openTime.current = Date.now(); // Reset timer
            }, 300); // Reset after animation
            return () => clearTimeout(timer);
        } else {
            openTime.current = Date.now();
        }
    }, [isOpen]);

    const updateData = (field: keyof FormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        // Clear error on change
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: undefined }));
        }
    };

    const validateStep = (currentStep: number) => {
        const newErrors: Partial<Record<keyof FormData, string>> = {};
        let isValid = true;

        if (currentStep === 1) {
            if (!formData.name) newErrors.name = "Name is required";
            if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Valid email is required";
        }
        if (currentStep === 2) {
            if (!formData.projectType) newErrors.projectType = "Please select a project type";
            if (!formData.budget) newErrors.budget = "Please select a budget range";
        }
        if (currentStep === 3) {
            if (!formData.description || formData.description.length < 20) newErrors.description = "Please provide a bit more detail (min 20 chars)";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            isValid = false;
        }

        return isValid;
    };

    const handleNext = () => {
        if (validateStep(step)) {
            setStep(prev => prev + 1);
        }
    };

    const handleBack = () => setStep(prev => prev - 1);

    const handleSubmit = async () => {
        // 1. Honeypot check (Bots fill hidden fields)
        if (honeyPot !== '') {
            console.warn("Bot detected: Honeypot filled");
            setIsSuccess(true); // Fake success to trick bot
            return;
        }

        // 2. Minimum time check (Humans take time)
        const timeTaken = Date.now() - openTime.current;
        if (timeTaken < 3000) { // 3 seconds minimum
            console.warn("Bot detected: Too fast");
            return; // Silent fail
        }

        // 3. Rate Limiting (LocalStorage)
        const lastSubmission = localStorage.getItem('lastSubmissionTime');
        const COOLDOWN = 60 * 1000; // 60 seconds
        if (lastSubmission && Date.now() - parseInt(lastSubmission) < COOLDOWN) {
            alert("Please wait a minute before sending another request.");
            return;
        }

        if (!validateStep(step)) return;

        setIsSubmitting(true);

        try {
            const { error } = await supabase
                .from('projects')
                .insert([
                    {
                        name: formData.name,
                        email: formData.email,
                        company: formData.company,
                        role: formData.role,
                        project_type: formData.projectType,
                        budget: formData.budget,
                        description: formData.description,
                        competitors: formData.competitors,
                        status: 'new'
                    }
                ]);

            if (error) throw error;

            // Update local rate limit
            localStorage.setItem('lastSubmissionTime', Date.now().toString());

            console.log("Form Submitted to Supabase:", formData);
            setIsSuccess(true);
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Something went wrong. Please try again.'); // Simple error handling for now
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
                    />

                    {/* Hidden Honeypot Field - for Bots */}
                    <input
                        type="text"
                        name="website_url_check"
                        value={honeyPot}
                        onChange={(e) => setHoneyPot(e.target.value)}
                        style={{ display: 'none' }}
                        tabIndex={-1}
                        autoComplete="off"
                    />

                    {/* Modal Container */}
                    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-white dark:bg-zinc-950 w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 flex flex-col md:flex-row max-h-[90vh] pointer-events-auto"
                        >
                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
                            >
                                <X size={16} />
                            </button>

                            {isSuccess ? (
                                <div className="w-full flex items-center justify-center text-center p-12">
                                    <div className="max-w-md">
                                        <div className="w-24 h-24 bg-neon-green/20 rounded-full flex items-center justify-center mx-auto mb-6 text-neon-green">
                                            <Check size={48} />
                                        </div>
                                        <h3 className="text-3xl font-bold text-zinc-900 dark:text-white mb-4">Message Received!</h3>
                                        <p className="text-zinc-600 dark:text-zinc-400 mb-8">
                                            Thanks for reaching out, {formData.name}. We've received your project details and will get back to you within 24 hours.
                                        </p>
                                        <button
                                            onClick={onClose}
                                            className="px-6 py-3 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-semibold"
                                        >
                                            Close
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    {/* Sidebar / Progress */}
                                    <div className="bg-zinc-100 dark:bg-zinc-900/50 md:w-64 p-6 md:p-8 border-b md:border-b-0 md:border-r border-zinc-200 dark:border-zinc-800 flex flex-row md:flex-col justify-between items-center md:items-start gap-4 shrink-0">
                                        <div className="space-y-1">
                                            {['Identity', 'Scope', 'Vision', 'Review'].map((s, i) => (
                                                <div key={i} className="flex items-center gap-3">
                                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all
                                                        ${step > i + 1 ? 'bg-neon-green text-zinc-900' : step === i + 1 ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900' : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-500'}`}>
                                                        {step > i + 1 ? <Check size={14} /> : i + 1}
                                                    </div>
                                                    <span className={`text-sm font-medium hidden md:block ${step === i + 1 ? 'text-zinc-900 dark:text-white' : 'text-zinc-500'}`}>
                                                        {s}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Form Area */}
                                    <div className="flex-1 p-6 md:p-10 relative flex flex-col overflow-y-auto custom-scrollbar">
                                        <div className="flex-1">
                                            <AnimatePresence mode="wait">
                                                {step === 1 && (
                                                    <motion.div
                                                        key="step1"
                                                        initial={{ opacity: 0, x: 20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        exit={{ opacity: 0, x: -20 }}
                                                        className="space-y-6"
                                                    >
                                                        <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">Let's get to know you</h3>
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                            <InputField label="Name" value={formData.name} onChange={(e: any) => updateData('name', e.target.value)} error={errors.name} placeholder="John Doe" />
                                                            <InputField label="Email" value={formData.email} onChange={(e: any) => updateData('email', e.target.value)} error={errors.email} placeholder="john@company.com" />
                                                        </div>
                                                        <InputField label="Company Name" value={formData.company} onChange={(e: any) => updateData('company', e.target.value)} placeholder="Acme Inc." />
                                                        <InputField label="Your Role" value={formData.role} onChange={(e: any) => updateData('role', e.target.value)} placeholder="Founder, CTO, etc." />
                                                    </motion.div>
                                                )}

                                                {step === 2 && (
                                                    <motion.div
                                                        key="step2"
                                                        initial={{ opacity: 0, x: 20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        exit={{ opacity: 0, x: -20 }}
                                                        className="space-y-6"
                                                    >
                                                        <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">Project Scope</h3>

                                                        <div className="space-y-4">
                                                            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Project Type</label>
                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                                <RadioCard label="Web Application" description="SaaS, Dashboard, Complex Logic" value="web-app" selected={formData.projectType} onChange={(v: string) => updateData('projectType', v)} />
                                                                <RadioCard label="Marketing Site" description="Landing Page, Portfolio, Corp Site" value="website" selected={formData.projectType} onChange={(v: string) => updateData('projectType', v)} />
                                                                <RadioCard label="Internal Tool" description="Admin Panel, Data Management" value="internal-tool" selected={formData.projectType} onChange={(v: string) => updateData('projectType', v)} />
                                                                <RadioCard label="Other" description="Something unique?" value="other" selected={formData.projectType} onChange={(v: string) => updateData('projectType', v)} />
                                                            </div>
                                                            {errors.projectType && <span className="text-xs text-red-500 flex items-center gap-1"><AlertCircle size={10} /> {errors.projectType}</span>}
                                                        </div>

                                                        <div className="space-y-4">
                                                            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Budget Range (INR)</label>
                                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                                                {['< 1000/-', '1000/- to 5000/-', '5000/- to 10k/-', '>10k/-'].map(b => (
                                                                    <button
                                                                        key={b}
                                                                        onClick={() => updateData('budget', b)}
                                                                        className={`p-3 rounded-lg text-sm border font-medium transition-all
                                                                            ${formData.budget === b
                                                                                ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 border-transparent'
                                                                                : 'bg-transparent border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:border-neon-blue'}`}
                                                                    >
                                                                        {b}
                                                                    </button>
                                                                ))}
                                                            </div>
                                                            {errors.budget && <span className="text-xs text-red-500 flex items-center gap-1"><AlertCircle size={10} /> {errors.budget}</span>}
                                                        </div>
                                                    </motion.div>
                                                )}

                                                {step === 3 && (
                                                    <motion.div
                                                        key="step3"
                                                        initial={{ opacity: 0, x: 20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        exit={{ opacity: 0, x: -20 }}
                                                        className="space-y-6"
                                                    >
                                                        <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">The Vision</h3>
                                                        <div className="space-y-2">
                                                            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Tell us about the project goal and core features</label>
                                                            <textarea
                                                                value={formData.description}
                                                                onChange={(e) => updateData('description', e.target.value)}
                                                                className={`w-full p-4 h-32 rounded-xl bg-zinc-100 dark:bg-zinc-800/50 border outline-none resize-none
                                                                ${errors.description ? 'border-red-500' : 'border-zinc-200 dark:border-zinc-700 focus:border-neon-blue'}
                                                                `}
                                                                placeholder="We need a dashboard for our logistics company that tracks..."
                                                            />
                                                            {errors.description && <span className="text-xs text-red-500 flex items-center gap-1"><AlertCircle size={10} /> {errors.description}</span>}
                                                        </div>

                                                        <div className="space-y-2">
                                                            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Competitors or Inspiration (Optional)</label>
                                                            <input
                                                                value={formData.competitors}
                                                                onChange={(e) => updateData('competitors', e.target.value)}
                                                                className="w-full p-4 rounded-xl bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 outline-none focus:border-neon-blue"
                                                                placeholder="e.g. Linear, Airbnb, Stripe..."
                                                            />
                                                        </div>
                                                    </motion.div>
                                                )}

                                                {step === 4 && (
                                                    <motion.div
                                                        key="step4"
                                                        initial={{ opacity: 0, x: 20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        exit={{ opacity: 0, x: -20 }}
                                                        className="space-y-6"
                                                    >
                                                        <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">Review Details</h3>
                                                        <div className="bg-zinc-50 dark:bg-zinc-900 rounded-xl p-6 border border-zinc-200 dark:border-zinc-800 space-y-4">
                                                            <div className="grid grid-cols-2 gap-4">
                                                                <div>
                                                                    <span className="text-xs text-zinc-500">Name</span>
                                                                    <p className="font-medium text-zinc-900 dark:text-white">{formData.name}</p>
                                                                </div>
                                                                <div>
                                                                    <span className="text-xs text-zinc-500">Email</span>
                                                                    <p className="font-medium text-zinc-900 dark:text-white">{formData.email}</p>
                                                                </div>
                                                                <div>
                                                                    <span className="text-xs text-zinc-500">Type</span>
                                                                    <p className="font-medium text-zinc-900 dark:text-white capitalize">{formData.projectType.replace('-', ' ')}</p>
                                                                </div>
                                                                <div>
                                                                    <span className="text-xs text-zinc-500">Budget</span>
                                                                    <p className="font-medium text-zinc-900 dark:text-white">{formData.budget}</p>
                                                                </div>
                                                            </div>
                                                            <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800">
                                                                <span className="text-xs text-zinc-500">Description</span>
                                                                <p className="text-sm text-zinc-700 dark:text-zinc-300 mt-1">{formData.description}</p>
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>

                                        {/* Navigation */}
                                        <div className="flex justify-between items-center mt-8 pt-6 border-t border-zinc-100 dark:border-zinc-800/50">
                                            {step > 1 ? (
                                                <button
                                                    onClick={handleBack}
                                                    className="flex items-center gap-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
                                                >
                                                    <ChevronLeft size={18} /> Back
                                                </button>
                                            ) : (
                                                <div></div>
                                            )}

                                            {step < 4 ? (
                                                <button
                                                    onClick={handleNext}
                                                    className="px-6 py-3 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-semibold flex items-center gap-2 hover:opacity-90 transition-opacity"
                                                >
                                                    Next <ChevronRight size={18} />
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={handleSubmit}
                                                    disabled={isSubmitting}
                                                    className="px-8 py-3 rounded-xl bg-gradient-to-r from-neon-blue to-neon-green text-zinc-900 font-bold flex items-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-neon-blue/20"
                                                >
                                                    {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : <><Send size={18} /> Send Request</>}
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </>
                            )}
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
};
