'use client';

import React, { useState, FormEvent, ChangeEvent } from 'react';
import { useLanguage } from '@/context/LanguageContext';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  botcheck: boolean; // For the honeypot
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

// Simple SVG Icon for close button
const CloseIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);
// Simple SVG Icon for checkmark
const CheckCircleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
);


const ContactForm: React.FC = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
    botcheck: false, // Honeypot
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [formStatus, setFormStatus] = useState<{ type: 'idle' | 'loading' | 'success' | 'error'; message: string }>({
    type: 'idle',
    message: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox' && e.target instanceof HTMLInputElement) {
        setFormData(prev => ({ ...prev, [name]: e.target.checked }));
    } else {
        setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    // Clear error for this field on change
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = t('Name is required.', 'Ad zorunludur.');
    if (!formData.email.trim()) {
      newErrors.email = t('Email is required.', 'E-posta zorunludur.');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('Email is invalid.', 'E-posta geçersiz.');
    }
    if (!formData.subject.trim()) newErrors.subject = t('Subject is required.', 'Konu zorunludur.');
    if (!formData.message.trim()) newErrors.message = t('Message is required.', 'Mesaj zorunludur.');
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) {
      setFormStatus({ type: 'error', message: t('Please correct the errors above.', 'Lütfen yukarıdaki hataları düzeltin.') });
      // Focus the first invalid input
      const firstErrorKey = Object.keys(errors).find(key => errors[key as keyof FormErrors]);
      if (firstErrorKey) {
        const firstErrorInput = e.currentTarget.elements.namedItem(firstErrorKey);
        if (firstErrorInput instanceof HTMLElement) {
            firstErrorInput.focus();
        }
      }
      return;
    }

    // Honeypot check
    if (formData.botcheck) {
        console.log("Bot submission detected.");
        setFormStatus({ type: 'success', message: t('Message Sent! Thank you for reaching out.', 'Mesaj Gönderildi! Ulaştığınız için teşekkür ederim.')}); // Pretend success for bots
        return;
    }

    setFormStatus({ type: 'loading', message: t('Sending...', 'Gönderiliyor...') });

    const web3FormsData = {
      ...formData,
      access_key: 'f592ab44-0b05-47b0-919b-4b2b62efe706', // Your Web3Forms Access Key
      subject: formData.subject, // Use user's subject
      from_name: formData.name,
    };

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(web3FormsData),
      });
      const result = await response.json();

      if (result.success) {
        setFormStatus({ type: 'success', message: t('Message Sent! Thank you for reaching out. I\'ll get back to you soon.', 'Mesaj Gönderildi! Ulaştığınız için teşekkür ederim. Yakında size geri döneceğim.') });
        setFormData({ name: '', email: '', subject: '', message: '', botcheck: false }); // Reset form
        setErrors({});
        // Consider hCaptcha reset if using a React library for it
      } else {
        console.error('Form submission error:', result);
        setFormStatus({ type: 'error', message: result.message || t('An error occurred. Please try again.', 'Bir hata oluştu. Lütfen tekrar deneyin.') });
      }
    } catch (error) {
      console.error('Network error:', error);
      setFormStatus({ type: 'error', message: t('Network error. Please check your connection.', 'Ağ hatası. Lütfen bağlantınızı kontrol edin.') });
    }
  };
  
  const commonInputClass = "w-full p-sm bg-background-DEFAULT border border-border rounded-sm font-main text-base text-text-primary focus:outline-none focus:border-primary-DEFAULT focus:ring-2 focus:ring-primary-DEFAULT/50";
  const errorInputClass = "border-error";
  const successInputClass = "border-success"; // Optional: for valid inputs

  return (
    <section id="contact" className="py-xxl bg-background-DEFAULT">
      <div className="container mx-auto px-md">
        <h2 className="text-3xl md:text-4xl font-bold font-heading text-center mb-xl relative pb-sm
                       after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2
                       after:w-[70px] after:h-[3px] after:bg-primary-DEFAULT after:rounded-sm">
          {t('Contact Me', 'Bana Ulaşın')}
        </h2>

        <div className="flex flex-col md:flex-row gap-xl">
          {/* Contact Info */}
          <div className="md:w-1/3 space-y-md">
            <div>
              <h3 className="text-2xl font-semibold font-heading text-accent-DEFAULT mb-sm">
                {t("Let's Connect", "Bağlantı Kuralım")}
              </h3>
              <p className="text-text-secondary leading-relaxed">
                {t("Interested in working together or have questions about my services? You can get in touch to discuss localization, technical translation, or potential collaborations.",
                   "Birlikte çalışmakla mı ilgileniyorsunuz veya hizmetlerim hakkında sorularınız mı var? Yerelleştirme, teknik çeviri veya potansiyel işbirliklerini görüşmek için iletişime geçebilirsiniz.")}
              </p>
            </div>
            <div className="space-y-sm text-sm">
              <div className="flex items-center gap-sm">
                <span className="text-primary-DEFAULT text-lg">📧</span> {/* Email Icon */}
                <a href="mailto:contact@alpyalay.org" className="text-text-secondary hover:text-primary-DEFAULT hover:underline">contact@alpyalay.org</a>
              </div>
              <div className="flex items-center gap-sm">
                <span className="text-primary-DEFAULT text-lg">🔗</span> {/* GitHub Icon (simple) */}
                <a href="https://github.com/KhazP" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-primary-DEFAULT hover:underline">github.com/KhazP</a>
              </div>
              <div className="flex items-center gap-sm">
                <span className="text-primary-DEFAULT text-lg">🔗</span> {/* LinkedIn Icon (simple) */}
                <a href="https://linkedin.com/in/alpyalay" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-primary-DEFAULT hover:underline">linkedin.com/in/alpyalay</a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:w-2/3 bg-card-bg p-lg rounded-lg shadow-xl border border-border">
            {formStatus.type === 'success' ? (
              <div className="text-center p-lg border border-success bg-background-alt rounded-md relative">
                 <button 
                    type="button" 
                    onClick={() => setFormStatus({type: 'idle', message: ''})}
                    className="absolute top-sm right-sm text-text-secondary hover:text-text-primary"
                    aria-label={t("Close message", "Mesajı kapat")}
                  >
                   <CloseIcon className="w-5 h-5" />
                 </button>
                <CheckCircleIcon className="w-12 h-12 text-success mx-auto mb-md" />
                <h4 className="text-xl font-semibold text-success mb-sm">{t('Message Sent!', 'Mesaj Gönderildi!')}</h4>
                <p className="text-text-secondary">{formStatus.message}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-md">
                {/* Honeypot - hidden field */}
                <input type="checkbox" name="botcheck" checked={formData.botcheck} onChange={handleChange} className="hidden" style={{ display: 'none' }} aria-hidden="true" />
                
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-label mb-xs">
                    {t('Name', 'Ad')} <span className="text-error">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={`${commonInputClass} ${errors.name ? errorInputClass : (formData.name && successInputClass)}`}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "name-error" : undefined}
                  />
                  {errors.name && <p id="name-error" className="text-xs text-error mt-xs">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-label mb-xs">
                    {t('Email', 'E-posta')} <span className="text-error">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={`${commonInputClass} ${errors.email ? errorInputClass : (formData.email && !errors.email && successInputClass)}`}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                  />
                  {errors.email && <p id="email-error" className="text-xs text-error mt-xs">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="subject-input" className="block text-sm font-medium text-label mb-xs">
                    {t('Subject', 'Konu')} <span className="text-error">*</span>
                  </label>
                  <input
                    type="text"
                    name="subject"
                    id="subject-input"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className={`${commonInputClass} ${errors.subject ? errorInputClass : (formData.subject && successInputClass)}`}
                    aria-invalid={!!errors.subject}
                    aria-describedby={errors.subject ? "subject-error" : undefined}
                  />
                  {errors.subject && <p id="subject-error" className="text-xs text-error mt-xs">{errors.subject}</p>}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-label mb-xs">
                    {t('Message', 'Mesaj')} <span className="text-error">*</span>
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className={`${commonInputClass} ${errors.message ? errorInputClass : (formData.message && successInputClass)}`}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? "message-error" : undefined}
                  ></textarea>
                  {errors.message && <p id="message-error" className="text-xs text-error mt-xs">{errors.message}</p>}
                </div>
                
                {/* hCaptcha placeholder - Full React integration would need a library */}
                <div className="h-captcha" data-captcha="true" data-sitekey="8a56cbe6-4354-4354-859a-be7663ac498e">
                    {/* This will not function as a real hCaptcha without its JS. 
                        A library like @hcaptcha/react-hcaptcha would be needed for full functionality.
                        For now, it's a visual placeholder. */}
                    <div className="w-full h-20 bg-background-DEFAULT border border-border rounded-sm flex items-center justify-center text-text-muted text-sm">
                        {t('hCaptcha Placeholder', 'hCaptcha Alanı')}
                    </div>
                </div>

                {formStatus.type === 'error' && formStatus.message && (
                  <p className="text-sm text-error text-center">{formStatus.message}</p>
                )}
                {formStatus.type === 'loading' && (
                  <p className="text-sm text-text-muted text-center">{formStatus.message}</p>
                )}


                <button
                  type="submit"
                  disabled={formStatus.type === 'loading'}
                  className="w-full bg-primary-DEFAULT text-text-on-dark font-semibold px-lg py-md rounded-md
                                 hover:bg-primary-hover transform hover:-translate-y-px shadow-lg hover:shadow-xl 
                                 transition-all duration-fast disabled:opacity-70 disabled:cursor-not-allowed
                                 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-DEFAULT ring-offset-2 ring-offset-card-bg"
                >
                  {formStatus.type === 'loading' ? t('Sending...', 'Gönderiliyor...') : t('Send Message', 'Mesaj Gönder')}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
