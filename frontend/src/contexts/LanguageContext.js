import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

const translations = {
  en: {
    // Navigation
    home: 'Home',
    dashboard: 'Dashboard',
    submitComplaint: 'Submit Complaint',
    login: 'Login',
    register: 'Register',
    logout: 'Logout',
    adminLogin: 'Admin Login',
    
    // Home Page
    saveEnvironment: 'Save Our Environment',
    reportIssues: 'Report local environmental issues and help make your community better',
    reportAnIssue: 'Report an Issue',
    joinUs: 'Join Us',
    howItWorks: 'How It Works',
    reportIssuesTitle: 'Report Issues',
    reportIssuesDesc: 'Upload photos/videos of environmental problems in your area with location details',
    governmentAction: 'Government Action',
    governmentActionDesc: 'Your complaint goes directly to government officials for immediate attention',
    trackProgress: 'Track Progress',
    trackProgressDesc: 'Get updates on resolution progress and provide feedback on completed work',
    makeDifference: 'Together We Can Make a Difference',
    joinThousands: 'Join thousands of citizens working to improve our environment',
    getStartedToday: 'Get Started Today',
    
    // Dashboard
    welcomeBack: 'Welcome back',
    yourComplaints: 'Your Complaints',
    noComplaints: 'No complaints submitted yet',
    submitFirstComplaint: 'Submit Your First Complaint',
    feedbackRequired: 'Feedback Required!',
    provideMandatoryFeedback: 'Provide Mandatory Feedback',
    provideFeedback: 'Provide Feedback',
    yourRating: 'Your Rating:',
    feedbackSubmitted: 'Feedback Submitted:',
    submitted: 'Submitted',
    resolved: 'Resolved',
    
    // Complaint Form
    complaintTitle: 'Complaint Title',
    description: 'Description',
    category: 'Category',
    roadDamage: 'Road Damage',
    treeMaintenance: 'Tree Maintenance',
    infrastructure: 'Infrastructure',
    other: 'Other',
    address: 'Address',
    uploadMedia: 'Upload Photos/Videos',
    submit: 'Submit',
    
    // Feedback
    rateResolution: 'Rate the resolution:',
    additionalComments: 'Additional Comments',
    commentsRequired: 'Comments (Required)',
    submitFeedback: 'Submit Feedback',
    cancel: 'Cancel',
    
    // Status
    pending: 'Pending',
    assigned: 'Assigned',
    inProgress: 'In Progress',
    closed: 'Closed',
    
    // Messages
    feedbackSubmittedSuccess: 'Feedback submitted successfully!',
    failedToSubmitFeedback: 'Failed to submit feedback',
    complaintSubmittedSuccess: 'Complaint submitted successfully!',
    
    // Admin
    adminDashboard: 'Admin Dashboard',
    totalComplaints: 'Total Complaints',
    overdue: 'Overdue',
    allComplaints: 'All Complaints',
    title: 'Title',
    submittedBy: 'Submitted By',
    date: 'Date',
    media: 'Media',
    userFeedback: 'User Feedback',
    actions: 'Actions',
    update: 'Update',
    updateComplaintStatus: 'Update Complaint Status',
    status: 'Status',
    updateStatus: 'Update Status'
  },
  hi: {
    // Navigation
    home: 'होम',
    dashboard: 'डैशबोर्ड',
    submitComplaint: 'शिकायत दर्ज करें',
    login: 'लॉगिन',
    register: 'रजिस्टर',
    logout: 'लॉगआउट',
    adminLogin: 'एडमिन लॉगिन',
    
    // Home Page
    saveEnvironment: 'हमारे पर्यावरण को बचाएं',
    reportIssues: 'अपने क्षेत्र की पर्यावरणीय समस्याओं की रिपोर्ट करें और अपने समुदाय को बेहतर बनाने में मदद करें',
    reportAnIssue: 'समस्या की रिपोर्ट करें',
    joinUs: 'हमसे जुड़ें',
    howItWorks: 'यह कैसे काम करता है',
    reportIssuesTitle: 'समस्याओं की रिपोर्ट करें',
    reportIssuesDesc: 'अपने क्षेत्र की पर्यावरणीय समस्याओं की तस्वीरें/वीडियो स्थान विवरण के साथ अपलोड करें',
    governmentAction: 'सरकारी कार्रवाई',
    governmentActionDesc: 'आपकी शिकायत सीधे सरकारी अधिकारियों के पास तत्काल ध्यान के लिए जाती है',
    trackProgress: 'प्रगति ट्रैक करें',
    trackProgressDesc: 'समाधान की प्रगति पर अपडेट प्राप्त करें और पूर्ण कार्य पर फीडबैक दें',
    makeDifference: 'मिलकर हम बदलाव ला सकते हैं',
    joinThousands: 'हमारे पर्यावरण को बेहतर बनाने के लिए काम कर रहे हजारों नागरिकों से जुड़ें',
    getStartedToday: 'आज ही शुरुआत करें',
    
    // Dashboard
    welcomeBack: 'वापस स्वागत है',
    yourComplaints: 'आपकी शिकायतें',
    noComplaints: 'अभी तक कोई शिकायत दर्ज नहीं की गई',
    submitFirstComplaint: 'अपनी पहली शिकायत दर्ज करें',
    feedbackRequired: 'फीडबैक आवश्यक!',
    provideMandatoryFeedback: 'अनिवार्य फीडबैक दें',
    provideFeedback: 'फीडबैक दें',
    yourRating: 'आपकी रेटिंग:',
    feedbackSubmitted: 'फीडबैक जमा किया गया:',
    submitted: 'जमा किया गया',
    resolved: 'हल किया गया',
    
    // Complaint Form
    complaintTitle: 'शिकायत का शीर्षक',
    description: 'विवरण',
    category: 'श्रेणी',
    roadDamage: 'सड़क क्षति',
    treeMaintenance: 'वृक्ष रखरखाव',
    infrastructure: 'बुनियादी ढांचा',
    other: 'अन्य',
    address: 'पता',
    uploadMedia: 'तस्वीरें/वीडियो अपलोड करें',
    submit: 'जमा करें',
    
    // Feedback
    rateResolution: 'समाधान को रेट करें:',
    additionalComments: 'अतिरिक्त टिप्पणियां',
    commentsRequired: 'टिप्पणियां (आवश्यक)',
    submitFeedback: 'फीडबैक जमा करें',
    cancel: 'रद्द करें',
    
    // Status
    pending: 'लंबित',
    assigned: 'सौंपा गया',
    inProgress: 'प्रगति में',
    closed: 'बंद',
    
    // Messages
    feedbackSubmittedSuccess: 'फीडबैक सफलतापूर्वक जमा किया गया!',
    failedToSubmitFeedback: 'फीडबैक जमा करने में विफल',
    complaintSubmittedSuccess: 'शिकायत सफलतापूर्वक जमा की गई!',
    
    // Admin
    adminDashboard: 'एडमिन डैशबोर्ड',
    totalComplaints: 'कुल शिकायतें',
    overdue: 'देर से',
    allComplaints: 'सभी शिकायतें',
    title: 'शीर्षक',
    submittedBy: 'द्वारा जमा',
    date: 'दिनांक',
    media: 'मीडिया',
    userFeedback: 'उपयोगकर्ता फीडबैक',
    actions: 'कार्रवाई',
    update: 'अपडेट',
    updateComplaintStatus: 'शिकायत स्थिति अपडेट करें',
    status: 'स्थिति',
    updateStatus: 'स्थिति अपडेट करें'
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  const t = (key) => {
    return translations[language][key] || key;
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'hi' : 'en');
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};