function generateTables() {
    const relationships = document.getElementById('relationships').value.split(',').map(item => item.trim());
    const objects = document.getElementById('everydayObjects').value.split(',').map(item => item.trim());
    const container = document.getElementById('tablesContainer');
    container.innerHTML = ''; // Clear previous tables
    
    objects.forEach(obj => {
        const objectTitle = document.createElement('h3');
        objectTitle.textContent = 'Object: ' + obj;
        container.appendChild(objectTitle);

        const table = document.createElement('table');
        const thead = document.createElement('thead');
        const tbody = document.createElement('tbody');
        
        let headerRow = '<tr><th>Relationship</th>';
        for (let i = 1; i <= 5; i++) {
            headerRow += '<th>' + i + '</th>';
        }
        headerRow += '</tr>';
        
        thead.innerHTML = headerRow;
        relationships.forEach(rel => {
            const row = document.createElement('tr');
            row.innerHTML = '<td>' + rel + '</td>' +
                '<td><select name="' + obj + '_' + rel + '_1">' +
                    '<option value="✓">✓: Always</option>' +
                    '<option value="-">-: Sometimes, depending on specific factors</option>' +
                    '<option value="×">×: Never</option>' +
                '</select></td>' +
                '<td><select name="' + obj + '_' + rel + '_2">' +
                    '<option value="✓">✓: Always</option>' +
                    '<option value="-">-: Sometimes, depending on specific factors</option>' +
                    '<option value="×">×: Never</option>' +
                '</select></td>' +
                '<td><select name="' + obj + '_' + rel + '_3">' +
                    '<option value="✓">✓: Always</option>' +
                    '<option value="-">-: Sometimes, depending on specific factors</option>' +
                    '<option value="×">×: Never</option>' +
                '</select></td>' +
                '<td><select name="' + obj + '_' + rel + '_4">' +
                    '<option value="✓">✓: Always</option>' +
                    '<option value="-">-: Sometimes, depending on specific factors</option>' +
                    '<option value="×">×: Never</option>' +
                '</select></td>' +
                '<td><select name="' + obj + '_' + rel + '_5">' +
                    '<option value="✓">✓: Always</option>' +
                    '<option value="-">-: Sometimes, depending on specific factors</option>' +
                    '<option value="×">×: Never</option>' +
                '</select></td>';
            tbody.appendChild(row);
        });
        
        table.appendChild(thead);
        table.appendChild(tbody);
        container.appendChild(table);

        const reasonsDiv = document.createElement('div');
        reasonsDiv.innerHTML = `
            <label for="${obj}_alwaysReason">Reasons for "Always"</label><br>
            <textarea id="${obj}_alwaysReason" name="${obj}_alwaysReason"></textarea><br><br>
            
            <label for="${obj}_specificFactors">What are the specific factors for "Sometimes"? When should they be allowed to use this feature? Please be specific.</label><br>
            <textarea id="${obj}_specificFactors" name="${obj}_specificFactors"></textarea><br><br>
            
            <label for="${obj}_specifiFactorsN">In contrast, when should they not be allowed to use this feature? Please be specific.</label><br>
            <textarea id="${obj}_specifiFactorsN" name="${obj}_specifiFactorsN"></textarea><br><br>
            
            <label for="${obj}_neverReason">Reasons for "Never"</label><br>
            <textarea id="${obj}_neverReason" name="${obj}_neverReason"></textarea><br><br>

            <label for="${obj}_importance">How important is it for this person to have (or not have) access to this capability?</label><br>
            <select id="${obj}_importance" name="${obj}_importance">
                <option value="Not important">Not important</option>
                <option value="Slightly important">Slightly important</option>
                <option value="Moderately important">Moderately important</option>
                <option value="Very important">Very important</option>
                <option value="Extremely important">Extremely important</option>
            </select><br><br>
            
            <label for="${obj}_inconvenience">If this person is denied access when they should have it, how much of an inconvenience would that be?</label><br>
            <select id="${obj}_inconvenience" name="${obj}_inconvenience">
                <option value="Not an inconvenience">Not an inconvenience</option>
                <option value="Minor inconvenience">Minor inconvenience</option>
                <option value="Major inconvenience">Major inconvenience</option>
            </select><br><br>
        `;
        container.appendChild(reasonsDiv);
    });

    document.getElementById('situationalFactors').style.display = 'block';
}

function showResults() {
    const formData = new FormData(document.getElementById('surveyForm'));
    let results = '';

    for (let [key, value] of formData.entries()) {
        results += `${key},${value}\n`;
    }

    const blob = new Blob([results], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'survey_results.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}
