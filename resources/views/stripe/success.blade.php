<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>GoPeakFit</title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="bg-gray-100 text-gray-900">
<div class="min-h-screen bg-white flex items-center justify-center px-4 py-16">
    <div class="bg-white border rounded-2xl shadow-lg p-8 max-w-lg text-center space-y-6">
        
        <!-- Success Animation -->
        <div class="flex justify-center">
            <img src="https://media.giphy.com/media/111ebonMs90YLu/giphy.gif" alt="Success" class="h-32 rounded-md">
        </div>

        <!-- Confirmation -->
        <h2 class="text-3xl font-bold text-[#23B5D3]">Payment Successful</h2>
        <p class="text-gray-700 text-sm">
            Congratulations! Your payment has been processed securely and your 5-Day Challenge is now unlocked.
        </p>

        <!-- Motivational Quote -->
        <div class="bg-gray-100 text-gray-800 rounded-md p-4 text-sm italic">
            “Every journey starts with a single step. You just took yours. Let’s build the strongest version of you — mind and body.”
        </div>

        <!-- CTA Button -->
        <a href="{{ route('dashboard') }}" class="inline-block bg-[#23B5D3] hover:bg-[#1b9bb6] text-white font-semibold py-2 px-6 rounded-md transition">
            Start Your Challenge
        </a>

        <!-- Footer Note -->
        <p class="text-xs text-gray-500">
            You’ll receive an email with your plan details shortly. Need help? Contact support anytime.
        </p>
    </div>
</div>
</body>
</html>
