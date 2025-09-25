'use client';
import React, { Suspense } from 'react';
import LoginForm from '@/components/loginForm/LoginForm';

export default function Page() {
  return (
    <Suspense fallback={<div />}>
        <div className="inner-section">
            <LoginForm />
        </div>
      
    </Suspense>
  );
}