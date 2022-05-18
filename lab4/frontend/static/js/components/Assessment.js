export async function Assessment(){
    let h3_text = ""
    const id = localStorage.getItem("weekId")
    if (id !== null){
        h3_text = `You have chosen week  ${localStorage.getItem("weekId")}`
    }else{
        return ''
    }

    const data = localStorage.getItem('data')

    let innerDiscribeMood = ''
    let text = ''
    if(data === '' || data === null || data === undefined || data === "null")
    {
        innerDiscribeMood = `
        <div class="sign_in pad">
            <select id="mood" class="form-select accesment-mood">
                <option value="0"  disabled>Mood</option>
                <option value="Well">Well</option>
                <option value="Not Bad">Not bad</option>
                <option value="Terrible">Terrible</option>
            </select>
        </div>`
    }else{
        innerDiscribeMood = `
        <span>Mood of the week: ${JSON.parse(data).mood}</span>
        `
        text = JSON.parse(data).text
    }


    return `
    <div class="main-text">
		<a name="assessment"></a>
        <h3 id="currentWeek">${h3_text}</h3>
        ${innerDiscribeMood}
	</div>
    <div class="small-container mt5">
        <span id="weekDiscribe">Here you can describe your week</span>
        <textarea id="textarea" class="accesment-textarea">${text}</textarea>
        <input id="addPictures" type="file" name="file"  multiple="true"  accept=".jpg, .jpeg, .png"/>
        <div class="preview" id="preview">
        </div>
        <div class="photos">
        </div>
        <button id="save-button" type="submit" class="custom-button assessment-button">Save</button>
    </div>
    `
}