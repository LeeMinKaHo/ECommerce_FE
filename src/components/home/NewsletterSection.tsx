import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { AnimatedSection } from './AnimatedSection';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubscribe = async () => {
    if (!email.trim()) {
      toast.error('Please enter your email address');
      return;
    }
    if (!validateEmail(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    // Simulate subscription
    await new Promise((resolve) => setTimeout(resolve, 800));
    toast.success('Thank you for subscribing! 🎉');
    setEmail('');
    setIsSubmitting(false);
  };

  return (
    <AnimatedSection>
      <div className="bg-primary mt-[150px] px-8 py-[100px]">
        <div className="container mx-auto flex max-w-[570px] flex-col gap-[30px]">
          <h2 className="font-secondary text-[42px]/[52px] font-bold text-white">
            Subscribe our newsletter to get latest product updates
          </h2>
          <div className="flex gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubscribe()}
              placeholder="Enter your email"
              id="newsletter-email"
              className="font-secondary w-full rounded-xl border-[1px] border-white px-5 py-4 text-white outline-none placeholder:text-white/60 transition-all duration-300 focus:border-secondary focus:shadow-[0_0_0_3px_rgba(255,212,77,0.3)] bg-transparent"
            />
            <motion.button
              onClick={handleSubscribe}
              disabled={isSubmitting}
              className="text-primary font-secondary rounded-xl bg-secondary px-9 py-4 text-[18px] font-medium transition-all duration-300 hover:brightness-110 disabled:opacity-60"
              whileTap={{ scale: 0.95 }}
            >
              {isSubmitting ? 'Sending...' : 'Subscribe'}
            </motion.button>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};
