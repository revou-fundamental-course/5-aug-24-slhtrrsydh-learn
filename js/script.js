document.getElementById('bmiForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value) / 100; // convert to meters
    const gender = document.getElementById('gender').value;

    if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
        alert('Silakan masukkan nilai yang valid!');
        return;
    }

    const bmi = (weight / (height * height)).toFixed(2);

    let category = '';
    let explanation = '';

    if (bmi < 18.5) {
        category = 'Kurus';
        explanation = 'Anda berada dalam kategori berat badan kurang. Disarankan untuk meningkatkan asupan nutrisi dan berkonsultasi dengan ahli gizi.';
    } else if (bmi >= 18.5 && bmi < 24.9) {
        category = 'Normal';
        explanation = 'Anda berada dalam kategori berat badan normal. Pertahankan pola hidup sehat!';
    } else if (bmi >= 25 && bmi < 29.9) {
        category = 'Gemuk';
        explanation = 'Anda berada dalam kategori kelebihan berat badan. Disarankan untuk menjaga pola makan dan meningkatkan aktivitas fisik.';
    } else {
        category = 'Obesitas';
        explanation = 'Anda berada dalam kategori obesitas. Sangat disarankan untuk berkonsultasi dengan ahli gizi dan menjalani program penurunan berat badan.';
    }

    document.getElementById('bmiValue').textContent = `BMI Anda: ${bmi}`;
    document.getElementById('bmiCategory').textContent = `Kategori: ${category}`;
    document.getElementById('bmiExplanation').textContent = explanation;
    document.getElementById('result').classList.remove('hidden');

    saveToHistory(bmi, category);
    displayHistory();
});

function saveToHistory(bmi, category) {
    const history = JSON.parse(localStorage.getItem('bmiHistory')) || [];
    history.push({ bmi, category, date: new Date().toLocaleString() });
    localStorage.setItem('bmiHistory', JSON.stringify(history));
}

function displayHistory() {
    const history = JSON.parse(localStorage.getItem('bmiHistory')) || [];
    const historyList = document.getElementById('historyList');
    historyList.innerHTML = '';
    history.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.date} - BMI: ${item.bmi} (${item.category})`;
        historyList.appendChild(li);
    });
    document.getElementById('history').classList.remove('hidden');
}

document.addEventListener('DOMContentLoaded', displayHistory);
