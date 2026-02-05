document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');
    const confirmBtn = document.getElementById('confirm-btn');
    const questionSection = document.getElementById('question-section');
    const errorSection = document.getElementById('error-section');
    const loveSection = document.getElementById('love-section');
    const thankyouSection = document.getElementById('thankyou-section');
    const thankyouMessage = document.getElementById('thankyou-message');
    const selectionConfirm = document.getElementById('selection-confirm');
    const selectedOptionName = document.getElementById('selected-option-name');

    // Selection variables
    let selectedOption = null;
    let selectedCard = null;

    // Google Sheets Configuration
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/library/d/1EJoXlE_8rlCJMAdJ3wz88-y08Ftpa-66tsifZWpKPVx19hSkyoraeDu3/1';

    // Yes Button - Go to Date Options
    yesBtn.addEventListener('click', () => {
        transitionToSection(questionSection, loveSection);
    });

    // No Button - Show Error Page
    noBtn.addEventListener('click', () => {
        transitionToSection(questionSection, errorSection);

        // Return to homepage after 3 seconds
        setTimeout(() => {
            transitionToSection(errorSection, questionSection);
        }, 5000);
    });

    // Option Cards Selection
    const optionCards = document.querySelectorAll('.option-card');

    optionCards.forEach(card => {
        card.addEventListener('click', () => {
            // Remove selected class from all cards
            optionCards.forEach(c => c.classList.remove('selected'));

            // Add selected class to clicked card
            card.classList.add('selected');
            selectedCard = card;
            selectedOption = card.getAttribute('data-option');

            // Update selection text
            const optionTitle = card.querySelector('.option-title').textContent;
            selectedOptionName.textContent = optionTitle;

            // Show confirm button
            selectionConfirm.classList.remove('hidden');
            selectionConfirm.classList.add('active');

            // Scroll to confirm button smoothly
            setTimeout(() => {
                selectionConfirm.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest'
                });
            }, 300);
        });
    });

    // Confirm Button - Save Selection and Show Thank You
    confirmBtn.addEventListener('click', () => {
        if (!selectedOption) {
            alert('Please select a date option first! 💖');
            return;
        }

        // Get selection details
        const optionTitle = selectedCard.querySelector('.option-title').textContent;
        const optionDescription = selectedCard.querySelector('.option-description').textContent;

        // Generate thank you message
        let message = '';
        switch (selectedOption) {
            case 'movies':
                message = "🎬 Our cinematic romance begins! I can already taste the pizza and feel the magic of the silver screen. I'll bring extra napkins for when you cry at the romantic parts! 🍕❤️";
                break;
            case 'jazz':
                message = "🎷 The smooth jazz awaits our love story! I can't wait to hold you close as we sway to the rhythm of love. Let the music write our Valentine's melody! 🎶💕";
                break;
            case 'picnic':
                message = "🧺 Under the stars with you... perfection! I'll pack all your favorites and a blanket big enough for two dreamers. The stars will witness our perfect evening! ✨🌙";
                break;
        }

        thankyouMessage.textContent = message;

        // Transition to thank you page
        transitionToSection(loveSection, thankyouSection);

        // Save to Google Sheets
        saveToGoogleSheets('Sinothando', optionTitle, optionDescription);

        // Show confetti effect
        showConfetti();
    });

    // Transition function between sections
    function transitionToSection(fromSection, toSection) {
        fromSection.classList.remove('active');
        fromSection.classList.add('hidden');

        setTimeout(() => {
            toSection.classList.remove('hidden');
            toSection.classList.add('active');

            // Scroll to top of new section
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 50);
    }

    // Function to save selection to Google Sheets
    function saveToGoogleSheets(name, selection, details) {
        const timestamp = new Date().toLocaleString();

        // Create form data
        const formData = new FormData();
        formData.append('name', name);
        formData.append('selection', selection);
        formData.append('details', details);
        formData.append('timestamp', timestamp);
        formData.append('source', 'ValentineApp');

        // Send data to Google Sheets
        fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            body: formData,
            mode: 'no-cors' // Important for cross-origin requests
        })
            .then(() => {
                console.log('✅ Selection saved to Google Sheets!');
                console.log('Name:', name);
                console.log('Selection:', selection);
                console.log('Details:', details);
                console.log('Timestamp:', timestamp);
            })
            .catch(error => {
                console.error('❌ Error saving to Google Sheets:', error);
                // Still show success to user even if save fails
                console.log('Showing success to user despite save error');
            });
    }

    // Confetti effect
    function showConfetti() {
        const confetti = document.querySelector('.confetti');
        confetti.innerHTML = '';

        // Create multiple confetti pieces
        for (let i = 0; i < 20; i++) {
            const confettiPiece = document.createElement('div');
            confettiPiece.style.position = 'absolute';
            confettiPiece.style.left = Math.random() * 100 + '%';
            confettiPiece.style.fontSize = (Math.random() * 2 + 1.5) + 'rem';
            confettiPiece.style.opacity = '0';
            confettiPiece.textContent = ['🎉', '🎊', '💖', '❤️', '💕', '✨'][Math.floor(Math.random() * 6)];

            confetti.appendChild(confettiPiece);

            // Animate each piece
            setTimeout(() => {
                confettiPiece.style.transition = 'all 3s cubic-bezier(0.1, 0.8, 0.3, 1)';
                confettiPiece.style.opacity = '1';
                confettiPiece.style.transform = `translateY(${window.innerHeight}px) rotate(${Math.random() * 720}deg)`;

                // Remove after animation
                setTimeout(() => {
                    confettiPiece.remove();
                }, 3000);
            }, i * 100);
        }
    }

    // Easter egg: Double-click heart to show secret message
    const heartDecoration = document.querySelector('.heart-decoration');
    if (heartDecoration) {
        heartDecoration.addEventListener('dblclick', () => {
            alert('💝 You found the secret! Sinothando, you have my heart forever! 💘');
        });
    }
});