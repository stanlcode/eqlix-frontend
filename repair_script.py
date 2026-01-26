import os

file_path = r"c:\Users\STANL\.gemini\antigravity\playground\distant-pulsar\EQX SITE\script.js"

# Read the file
with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
    lines = f.readlines()

# Find the start of corruption (around line 566/567)
clean_lines = []
for line in lines:
    if "STATS COUNTER ANIMATION" in line and "S T A T S" in line: # Detect the spaced out bad line
        break
    clean_lines.append(line)

# The valid code to append
stats_logic = """
// ===== STATS COUNTER ANIMATION =====
function initStatsCounter() {
    const stats = document.querySelectorAll('.stat-number');
    if (!stats.length) return;

    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const statsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000; // 2 seconds
                const stepTime = 20;
                const steps = duration / stepTime;
                const increment = target / steps;
                let current = 0;

                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        counter.textContent = target;
                        clearInterval(timer);
                    } else {
                        counter.textContent = Math.ceil(current);
                    }
                }, stepTime);

                observer.unobserve(counter);
            }
        });
    }, observerOptions);

    stats.forEach(stat => {
        statsObserver.observe(stat);
    });
}

// Add to global init
document.addEventListener('DOMContentLoaded', () => {
    initStatsCounter();
});
"""

# Write the clean content back
with open(file_path, "w", encoding="utf-8") as f:
    f.writelines(clean_lines)
    f.write(stats_logic)

print("script.js repaired and updated successfully.")
