// Auth Logic
function toggleAuth() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    if (loginForm && registerForm) {
        if (loginForm.classList.contains('active')) {
            loginForm.classList.remove('active');
            registerForm.classList.add('active');
        } else {
            registerForm.classList.remove('active');
            loginForm.classList.add('active');
        }
    }
}

function login() {
    const inputs = document.querySelectorAll('#loginForm input');
    if(inputs[0].value !== '' && inputs[1].value !== '') {
        const btn = document.querySelector('#loginForm button');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Authenticating...';
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1000);
    } else {
        alert("Please enter both email and password");
    }
}

function register() {
    const inputs = document.querySelectorAll('#registerForm input');
    let valid = true;
    inputs.forEach(i => { if(i.value === '') valid = false; });
    if(valid) {
        const btn = document.querySelector('#registerForm button');
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Creating Account...';
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1500);
    } else {
        alert("Please fill in all fields");
    }
}

// Dashboard Logic
document.addEventListener('DOMContentLoaded', () => {
    // Render Chart if element exists
    const ctx = document.getElementById('nlpChart');
    if (ctx) {
        Chart.defaults.color = 'rgba(255, 255, 255, 0.7)';
        Chart.defaults.font.family = 'Inter';
        
        new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['Sentiment', 'Credibility', 'Bias', 'Sensationalism', 'Fact-Match', 'Toxicity'],
                datasets: [{
                    label: 'Latest Scan Profile',
                    data: [45, 20, 85, 95, 10, 80],
                    backgroundColor: 'rgba(239, 68, 68, 0.25)',
                    borderColor: '#ef4444',
                    borderWidth: 2,
                    pointBackgroundColor: '#ef4444',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: '#ef4444'
                }]
            },
            options: {
                scales: {
                    r: {
                        angleLines: { color: 'rgba(255, 255, 255, 0.1)' },
                        grid: { color: 'rgba(255, 255, 255, 0.1)' },
                        pointLabels: { color: '#94a3b8', font: { family: 'Inter', size: 12, weight: 500 } },
                        ticks: { display: false, max: 100, min: 0 }
                    }
                },
                plugins: {
                    legend: { display: false }
                },
                maintainAspectRatio: false
            }
        });
    }

    // Tabs functionality
    const tabs = document.querySelectorAll('.tab');
    if(tabs.length > 0) {
        tabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                tabs.forEach(t => t.classList.remove('active'));
                e.target.classList.add('active');
            });
        });
    }

});

// Modal Logic
function analyzeText() {
    const textarea = document.querySelector('textarea');
    if(!textarea || textarea.value.trim() === '') {
        alert('Please enter some text to analyze');
        return;
    }

    const btn = document.querySelector('.analyze-btn');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Analyzing... <div class="btn-glow"></div>';
    
    setTimeout(() => {
        btn.innerHTML = originalText;
        openModal();
    }, 1500);
}

function openModal() {
    const modal = document.getElementById('analysisModal');
    if(modal) {
        modal.classList.add('show');
        
        // Animate circular progress
        setTimeout(() => {
            const circle = document.querySelector('.progress-ring__circle');
            if(circle) {
                const radius = circle.r.baseVal.value;
                const circumference = radius * 2 * Math.PI;
                const percent = 87; // Fake News Score
                const offset = circumference - (percent / 100) * circumference;
                circle.style.strokeDashoffset = offset;
            }
        }, 100);
    }
}

function closeModal() {
    const modal = document.getElementById('analysisModal');
    if(modal) {
        modal.classList.remove('show');
        
        // Reset circle
        setTimeout(() => {
            const circle = document.querySelector('.progress-ring__circle');
            if(circle) circle.style.strokeDashoffset = 326.72; // default 52 radius circumference
        }, 300);
    }
}
