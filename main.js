document.addEventListener('DOMContentLoaded', () => {
    const setList = document.getElementById('set-list');
    const questionsContainer = document.getElementById('questions-container');
    const currentSetTitle = document.getElementById('current-set-title');

    // Initialize the sidebar with question sets
    function initSidebar() {
        if (!examData || examData.length === 0) {
            setList.innerHTML = '<li>No sets available</li>';
            return;
        }

        examData.forEach((set, index) => {
            const li = document.createElement('li');
            const button = document.createElement('button');
            button.className = 'set-btn';
            button.textContent = set.title;
            button.dataset.id = set.id;
            
            button.addEventListener('click', () => {
                // Remove active class from all
                document.querySelectorAll('.set-btn').forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked
                button.classList.add('active');
                // Load content
                loadSet(set);
            });

            li.appendChild(button);
            setList.appendChild(li);

            // Load first set by default
            if (index === 0) {
                button.click();
            }
        });
    }

    // Load a specific question set
    function loadSet(set) {
        currentSetTitle.textContent = set.title;
        questionsContainer.innerHTML = ''; // Clear current

        set.questions.forEach((q, index) => {
            const card = document.createElement('div');
            card.className = 'qa-card';
            card.style.animationDelay = `${index * 0.1}s`; // Staggered animation

            card.innerHTML = `
                <span class="question-badge">${q.type}</span>
                <div class="question-text">${q.text}</div>
                <div class="answer-section">
                    <h4>Suggested Answer</h4>
                    <div class="answer-content">
                        ${q.answer}
                    </div>
                </div>
            `;
            
            questionsContainer.appendChild(card);
        });

        // Apply syntax highlighting
        const codeBlocks = questionsContainer.querySelectorAll('pre code');
        codeBlocks.forEach(block => {
            if (!block.className) {
                block.className = 'language-jsx';
            }
        });
        
        if (window.Prism) {
            Prism.highlightAll();
        }
    }

    // Initialize
    initSidebar();
});
