"use client"

import React, { useState } from 'react';

interface FormData {
  name: string;
  email: string;
  message: string;
}

function PostRequestForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/product', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Error submitting form: ${response.statusText}`);
      }

      console.log('Form submission successful!', response);
      setFormData({ name: '', email: '', message: '' }); // Clear form after success
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
      <label htmlFor="email">Email:</label>
      <input type="email" id="email" name="email" value={formData.name} onChange={handleChange} required />
      <label htmlFor="message">Message:</label>
      <textarea id="message" name="message" value={formData.message} onChange={handleChange} required />
      <button type="submit">Submit</button>
    </form>
  );
}

export default PostRequestForm;
