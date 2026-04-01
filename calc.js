function calculatePoints() {
    // 1. General Success (GPA Sum / 4) * 10
    const gpaPoints = (
        (parseFloat(document.getElementById('avg6').value) || 0) +
        (parseFloat(document.getElementById('avg7').value) || 0) +
        (parseFloat(document.getElementById('avg8').value) || 0) +
        (parseFloat(document.getElementById('avg9').value) || 0)
    ) / 4 * 10;

    // 2. Specific Subjects (Sum of 16 values / 4)
    let subjectSum = 0;
    for (let s = 1; s <= 4; s++) {
        for (let g = 6; g <= 9; g++) {
            subjectSum += parseFloat(document.getElementById(`s${s}_${g}`).value) || 0;
        }
    }
    const subjectPoints = subjectSum / 4;

    // 3. Behavior (Sum / 4)
    const behaviorPoints = (
        (parseFloat(document.getElementById('beh6').value) || 0) +
        (parseFloat(document.getElementById('beh7').value) || 0) +
        (parseFloat(document.getElementById('beh8').value) || 0) +
        (parseFloat(document.getElementById('beh9').value) || 0)
    ) / 4;

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