import React from 'react';

export type Theme = 'light' | 'dark';

export interface SectionProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
}

export interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay?: number;
}