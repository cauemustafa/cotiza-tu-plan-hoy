# Resend Email Integration Guide

This document outlines the steps to integrate the Resend email service into your project, utilizing a Vercel serverless function for secure email submission from the frontend contact form.

## 1. Overview

We've transitioned the contact form submission from directly opening WhatsApp to sending emails via [Resend](https://resend.com/). This is achieved by: 

*   Creating a secure serverless function on Vercel to handle email sending, preventing exposure of your Resend API key.
*   Updating the frontend contact form to send data to this serverless function.
*   Implementing robust validation using Zod for incoming form data.

## 2. Frontend Changes (`src/pages/Contacto.tsx`)

*   **Form Schema Update:** The `formSchema` now includes fields for `fullName`, `email`, `phone`, and `message`, with specific validation rules (e.g., Chilean phone number format). The `tipoSeguro` field has been removed from the form submission data as per your request.
*   **Submission Logic:** The `handleSubmit` function no longer opens WhatsApp. Instead, it now sends a `POST` request with the form data to the `/api/send-email` endpoint.
*   **User Feedback:** `toast` notifications are used to inform the user about the success or failure of their submission.
*   **Variable Naming:** All relevant variables and function names within `Contacto.tsx` have been translated to English for consistency.

## 3. Serverless Function (`api/send-email.ts`)

This file contains the Vercel serverless function responsible for processing contact form submissions and sending emails via Resend.

*   **Location:** `api/send-email.ts` (created at the root of your project).
*   **Dependencies:** Uses `resend` for email sending and `zod` for data validation. These were installed as development dependencies (`npm install resend zod --save-dev`).
*   **Validation:** It validates the incoming `POST` request body against a `quoteSchema` (similar to the frontend's `formSchema`).
*   **Email Sending:** Upon successful validation, it sends two emails using Resend:
    *   One to the insurance broker (configurable recipient).
    *   One confirmation email to the client who submitted the form.
*   **HTML Templates:** It uses predefined HTML templates (`generateEmailTemplateCorretora` and `generateEmailTemplateCliente`) for a professional and consistent email appearance.
*   **Environment Variable:** It securely accesses the `RESEND_API_KEY` from Vercel's environment variables.

## 4. Configuration Steps

To ensure the email system functions correctly, please follow these crucial configuration steps:

1.  **Obtain your Resend API Key:**
    *   Go to [Resend](https://resend.com/), sign up or log in to your account.
    *   Navigate to the API Keys section and create a new API key. Copy this key; it will look something like `re_xxxxxxxxxxxxxxxxxxxxxx`.

2.  **Configure the `RESEND_API_KEY` Environment Variable in Vercel:**
    *   Access your project dashboard on Vercel.
    *   Go to **Settings** > **Environment Variables**.
    *   Add a new environment variable with the following details:
        *   **Name:** `RESEND_API_KEY`
        *   **Value:** Paste the API key you obtained from Resend.
        *   **Environments:** Ensure this variable is linked to both **Development** and **Production** environments.

3.  **Verify Your Sending Domain in Resend:**
    *   In your Resend dashboard, go to the **Domains** section.
    *   Add and verify the domain from which you intend to send emails (e.g., `cotizatuplanhoy.cl`). Resend will provide specific DNS records (TXT, CNAME) that you must add to your domain's DNS settings with your domain registrar.
    *   **Important:** Once your domain is verified, you **must** update the `from` email address in `api/send-email.ts`. Change the line `from: 'Cotiza Tu Plan Hoy <onboarding@resend.dev>'` to an email address on your verified domain (e.g., `from: 'Cotiza Tu Plan Hoy <no-reply@yourdomain.com>'`). Using `onboarding@resend.dev` is only for testing and will not work in production with your verified domain.

4.  **Configure the Recipient Email Address (Broker):**
    *   In the `api/send-email.ts` file, locate the line specifying the recipient for the broker's email (e.g., `to: 'contacto@cotizatuplanhoy.cl'`).
    *   Change `'contacto@cotizatuplanhoy.cl'` to the actual email address where you wish to receive the quote requests. For better management, consider making this an environment variable in Vercel as well.

## 5. Deployment

*   **Commit and Push:** Ensure all your changes, including the new `api/send-email.ts` file and the updated `src/pages/Contacto.tsx`, are committed and pushed to your Git repository.
*   **Vercel Automatic Deployment:** Vercel will automatically detect the `api/` directory and deploy its contents as a serverless function. Your frontend changes will also be deployed.
*   **Endpoint:** The serverless function will be accessible at `YOUR_VERCEL_DEPLOYMENT_URL/api/send-email` (e.g., `https://your-project-name.vercel.app/api/send-email`).

Once these steps are completed, your contact form will securely send emails via Resend, providing a more robust and professional communication channel.