export const pricingPlans = [
    {
        id: 'basic',
        name: 'Basic',
        price: 9, 
        description: 'For normal users',
        items: [
            '5 PDF Summaries per month',
            'Standard Processing speed',
            'Email Support'
        ],
        paymentLink: process.env.NODE_ENV === 'development' ? 'https://buy.stripe.com/test_dRmeV6fsU4pNfxbdBe0oM00'
        : 'https://buy.stripe.com/test_dRmeV6fsU4pNfxbdBe0oM00',
        priceId: 'price_1Rdn9P4C9tlrFk90nRbfK5Yj'
    },
    {
        id: 'pro',
        name: 'Pro',
        price: 19,
        description: 'For professionals and teams',
        items: [
            'Unlimited PDF Summaries',
            'Priority Processing',
            '24/7 priority support',
            'Markdown Export'
        ],
        paymentLink: process.env.NODE_ENV === 'development' ? 'https://buy.stripe.com/test_3cI4gsgwY7BZ1GlfJm0oM01': 'https://buy.stripe.com/test_3cI4gsgwY7BZ1GlfJm0oM01',
        priceId:'price_1Rdn9P4C9tlrFk90HP7Kd3wr'
    }
]

export const containerVariants = {
    hidden: {opacity: 0},
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.1,
        }
    }
}

export const itemVariants = {
    hidden: {
        opacity: 0,
        y:20
    },
    visible: {
        opacity: 1, 
        transition: {
            type: "spring" as const,
            damping: 15,
            stiffness: 50,
            duration: 0.8,
        }
    }
}

export const buttonVariants = {
    scale:1.05, 
    transition: {
        type: 'spring' as const,
        stiffness: 300, 
        damping: 10
    }
}

export const listVariant = {
    hidden: {opacity:0, x:-20}, 
    visible: {
        opacity: 1, 
        x:0, 
        transition: {
            type:'spring' as const,
            damping: 20,
            stiffness: 100
        }
    }
}

export const DEMO_SUMMARY = `
# Quick Overview
🌍 The Future is Remote: Work Trends in 2025

# 📄Document Details
• 📘 Type: Research Report
• 🎯 For: Business Leaders, HR Managers, and Remote Professionals

# ✨ Key Highlights
• 💼 68% of global companies now operate with hybrid or fully remote teams.
• 🧠 Remote workers report 22% higher job satisfaction than in-office peers.
• 🛠️ Automation tools and asynchronous workflows are driving efficiency.

# 🌟 Why It Matters
• 🌐 Remote work is redefining where, when, and how people work—giving companies access to global talent, lowering operational costs, and improving employee well-being. Those who adapt will thrive in this flexible-first era.

# 🔍 Main Points
• 📊 The shift to remote is driven by both employee demand and tech innovation
• 🚀 Companies that embrace remote tools report faster project completion rates
• 🏆 Businesses with remote-friendly policies attract and retain top talent

# 💡 Pro Tips
• 🧩 Invest in tools that support asynchronous communication (like Loom or Notion)
• 🧘 Encourage "virtual deep work hours" to boost focus across time zones
• 🌱 Create structured onboarding for remote hires to reduce churn

# 🧠 Key Terms to Know
• 🏠 Hybrid Work: A mix of in-office and remote work that offers flexibility
• ⏳ Async Communication: Messaging and collaboration that doesn’t require real-time response

# ✅ Bottom Line
• 🏠 Remote work is here to stay
• 🧘 Flexibility, autonomy, and digital fluency are the cornerstones of future-ready teams
• 🚀 Companies that adapt will unlock innovation, efficiency, and global reach

`