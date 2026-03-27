"use client";

import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { contactMessageSchema } from '../lib/validators';
import { toast } from './Toast';

export default function ContactForm() {
    const { t } = useLanguage();
  const user = null;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [directEmail, setDirectEmail] = useState('');

  useEffect(() => {
    fetch('/api/info')
      .then(res => res.json())
      .then(data => setDirectEmail(data.directEmail || 'nathan@example.com'));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      try {
        contactMessageSchema.parse(formData);
      } catch (zodError: any) {
        if (zodError && Array.isArray(zodError.issues) && zodError.issues.length > 0 && typeof zodError.issues[0].message === 'string') {
          toast(zodError.issues[0].message, 'error');
        } else {
          toast('Invalid input.', 'error');
        }
        setSubmitting(false);
        return;
      }

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch {
          toast('Failed to send message', 'error');
          setSubmitting(false);
          return;
        }
        let errorMessage = 'An error occurred.';
        if (errorData && Array.isArray(errorData.issues) && errorData.issues.length > 0 && typeof errorData.issues[0].message === 'string') {
          errorMessage = errorData.issues[0].message;
        } else if (typeof errorData.error === 'string') {
          errorMessage = errorData.error;
        } else if (Array.isArray(errorData) && errorData.length > 0 && typeof errorData[0].message === 'string') {
          errorMessage = errorData[0].message;
        } else if (typeof errorData === 'string') {
          errorMessage = errorData;
        }
        toast(errorMessage, 'error');
        setSubmitting(false);
        return;
      }

      setSuccess(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (error: any) {
      if (error && error.errors && Array.isArray(error.errors)) {
        const messages = error.errors.map((i: any) => typeof i.message === 'string' ? i.message : 'Invalid input.');
        toast(messages[0] || 'Invalid input.', 'error');
      } else if (error instanceof Error && typeof error.message === 'string') {
        toast(error.message, 'error');
      } else {
        toast('An error occurred', 'error');
      }
      setSubmitting(false);
      return;
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="glass-card p-8 text-center animate-scale-in">
        <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-white mb-4">Message Sent!</h3>
        <p className="text-gray-400 mb-6">Thank you for reaching out. I'll get back to you as soon as possible.</p>
        <button
          onClick={() => setSuccess(false)}
          className="neon-button px-6 py-3 font-semibold hover:scale-105 transition-all duration-300"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <div className="glass-card p-8 animate-slide-up">
      <div className="mb-8">
        <h2 className="text-3xl font-bold gradient-text mb-4">{t('contact.connectTitle')}</h2>
        <p className="text-gray-400">{t('contact.formIntro')}</p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="group">
            <label className="block text-sm font-medium text-gray-300 mb-2 group-focus-within:text-primary-400 transition-colors">
              {t('contact.formNameLabel')}
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 bg-dark-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 focus:bg-dark-800/80 transition-all duration-300"
              placeholder={t('contact.formNamePlaceholder')}
            />
          </div>

          <div className="group">
            <label className="block text-sm font-medium text-gray-300 mb-2 group-focus-within:text-primary-400 transition-colors">
              {t('contact.formEmailLabel')}
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 bg-dark-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 focus:bg-dark-800/80 transition-all duration-300"
              placeholder={t('contact.formEmailPlaceholder')}
            />
          </div>
        </div>

        <div className="group">
          <label className="block text-sm font-medium text-gray-300 mb-2 group-focus-within:text-primary-400 transition-colors">
            {t('contact.formMessageLabel')}
          </label>
          <textarea
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            rows={6}
            className="w-full px-4 py-3 bg-dark-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 focus:bg-dark-800/80 transition-all duration-300 resize-none"
            placeholder={t('contact.formMessagePlaceholder')}
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="group w-full neon-button px-8 py-4 font-semibold text-base disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3"
        >
          {submitting ? (
            <>
              <div className="w-5 h-5 border-2 border-primary-500/30 border-t-primary-500 rounded-full animate-spin"></div>
              <span>{t('contact.formSending')}</span>
            </>
          ) : (
            <>
              <span>{t('contact.formSendButton')}</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </>
          )}
        </button>

        <div className="text-center text-sm text-gray-500">
          <p>{t('contact.formDirectLabel')} <a href={`mailto:${directEmail}`} className="text-primary-400 hover:text-primary-300 font-mono transition-colors">{directEmail}</a></p>
        </div>
      </form>
    </div>
  );
}
