import emailjs from '@emailjs/browser';
import { EMAIL_CONFIG } from './constants';

// Initialize EmailJS (call once on app load)
export const initEmailService = () => {
  if (EMAIL_CONFIG.publicKey && EMAIL_CONFIG.publicKey !== 'YOUR_PUBLIC_KEY') {
    emailjs.init(EMAIL_CONFIG.publicKey);
    return true;
  }
  return false;
};

// Send inquiry email with design
export const sendInquiryEmail = async (inquiryData) => {
  const {
    designPreview,
    signSize,
    quantity,
    timeline,
    notes,
    contactPreference,
    userName,
    userEmail,
    userPhone,
    companyName,
  } = inquiryData;

  // Check if EmailJS is configured
  if (EMAIL_CONFIG.serviceId === 'YOUR_SERVICE_ID') {
    // For development/demo, log the inquiry and return success
    console.log('Email Service not configured. Inquiry data:', inquiryData);
    return {
      success: true,
      message: 'Inquiry submitted successfully! (Demo mode - email service not configured)',
      demo: true,
    };
  }

  try {
    const templateParams = {
      to_email: EMAIL_CONFIG.toEmail,
      from_name: userName,
      from_email: userEmail,
      phone: userPhone,
      company_name: companyName,
      sign_size: signSize,
      quantity: quantity,
      timeline: timeline,
      contact_preference: contactPreference,
      notes: notes,
      design_preview: designPreview,
    };

    const response = await emailjs.send(
      EMAIL_CONFIG.serviceId,
      EMAIL_CONFIG.templateId,
      templateParams
    );

    return {
      success: true,
      message: 'Your inquiry has been sent successfully! We will contact you soon.',
      response,
    };
  } catch (error) {
    console.error('Failed to send email:', error);
    return {
      success: false,
      message: 'Failed to send inquiry. Please try again or contact us directly.',
      error,
    };
  }
};

// Send contact form email
export const sendContactEmail = async (contactData) => {
  const { name, email, phone, message } = contactData;

  // Check if EmailJS is configured
  if (EMAIL_CONFIG.serviceId === 'YOUR_SERVICE_ID') {
    console.log('Email Service not configured. Contact data:', contactData);
    return {
      success: true,
      message: 'Message sent successfully! (Demo mode - email service not configured)',
      demo: true,
    };
  }

  try {
    const templateParams = {
      to_email: EMAIL_CONFIG.toEmail,
      from_name: name,
      from_email: email,
      phone: phone || 'Not provided',
      message: message,
    };

    const response = await emailjs.send(
      EMAIL_CONFIG.serviceId,
      EMAIL_CONFIG.templateId,
      templateParams
    );

    return {
      success: true,
      message: 'Your message has been sent successfully!',
      response,
    };
  } catch (error) {
    console.error('Failed to send email:', error);
    return {
      success: false,
      message: 'Failed to send message. Please try again.',
      error,
    };
  }
};
