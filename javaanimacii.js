const observerOptions = {
    // Trigger when 10% of the section is visible
    threshold: 0.1 
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        // If the element enters the screen
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            
            // This line tells the browser to STOP watching this element
            // once it has faded in, which saves battery/performance.
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Start watching all elements with the 'reveal' class
document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
});

function calculatePoints() {
    // 1. General Success - Adaptive Division
    const gpaIds = ['avg6', 'avg7', 'avg8', 'avg9'];
    let gpaSum = 0;
    let gpaCount = 0;

    gpaIds.forEach(id => {
        const val = parseFloat(document.getElementById(id).value);
        if (!isNaN(val) && val > 0) {
            gpaSum += val;
            gpaCount++;
        }
    });

    // Divide by count if any are filled, otherwise 0
    const gpaPoints = gpaCount > 0 ? (gpaSum / gpaCount) * 10 : 0;

    // 2. Specific Subjects - Adaptive Division (per year)
    let totalSubjectAvgSum = 0;
    let yearsWithGrades = 0;

    for (let g = 6; g <= 9; g++) {
        let yearSum = 0;
        let subjectsInYear = 0;
        
        for (let s = 1; s <= 4; s++) {
            const val = parseFloat(document.getElementById(`s${s}_${g}`).value);
            if (!isNaN(val) && val > 0) {
                yearSum += val;
                subjectsInYear++;
            }
        }

        // If at least one subject is filled for this year, calculate that year's contribution
        if (subjectsInYear > 0) {
            totalSubjectAvgSum += (yearSum / subjectsInYear);
            yearsWithGrades++;
        }
    }

    // The points are the sum of averages for the 4 years (Max 20)
    // We use yearsWithGrades to ensure we don't divide by 4 if years are missing
    const subjectPoints = yearsWithGrades > 0 ? (totalSubjectAvgSum / yearsWithGrades) * 4 : 0;

    // 3. Behavior - Adaptive Division
    const behIds = ['beh6', 'beh7', 'beh8', 'beh9'];
    let behSum = 0;
    let behCount = 0;

    behIds.forEach(id => {
        const val = parseFloat(document.getElementById(id).value);
        if (!isNaN(val) && val > 0) {
            behSum += val;
            behCount++;
        }
    });

    const behaviorPoints = behCount > 0 ? (behSum / behCount) : 0;

    // 4. Diplomas
    const diplomaPoints = parseFloat(document.getElementById('diplomas').value) || 0;

    // TOTAL
    const total = gpaPoints + subjectPoints + behaviorPoints + diplomaPoints;
    
    document.getElementById('total-points').innerText = total.toFixed(2);
    
    const msg = document.getElementById('calc-message');
    if (total >= 70) msg.innerText = "Одличен успех!";
    else if (total >= 50) msg.innerText = "Добар успех!";
    else msg.innerText = "Продолжете со учење!";
}