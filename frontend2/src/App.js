import React, {useState, useEffect} from 'react';
import './App.css';

function App(){
	const [selectedFile, setSelectedFile] = useState();
	const [isSelected, setIsSelected] = useState(false);
	const [buttonClicked, setButtonClicked] = useState(false);

	const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsSelected(true);
	};

	useEffect(() => {
		if (isSelected) {
		const formData = new FormData();

		let userData = {};
		const inputList = document.querySelectorAll(".input");
		console.log(inputList);

		for (const input of inputList) {
			let name = input.getAttribute('name');
			userData[name] = input.value;
		}

		console.log(userData);

		formData.append('userfile', selectedFile);
		formData.append('userData', JSON.stringify(userData));


		fetch(
			'http://localhost:8000/upload',
			{
				method: 'POST',
				body: formData,
			}
		)
			.then((response) => response.json())
			.then((result) => {
				console.log('Success:', result);
				setIsSelected(false);
				setButtonClicked(false);
			})
			.catch((error) => {
				console.error('Error:', error);
			});
		}
	}, [buttonClicked])

	return(
		
   <div className="App">

			<div className="form">
				<h1>Sign up for  $100 today!</h1>
					<div className="formRow">
						<label htmlFor="name"></label>
						<input type="text" id="name" name="name" className="input" placeholder="Your Name" /> 
						<p id="nameError"></p>
					</div>
					
					<div className="formRow">
						<label htmlFor="email"></label>
						<input type="email" id="email" className="input" name="email" placeholder="email@email.com" />
						<p id="emailError"></p>
					</div>
				
				
				
						<p id="address">Address:</p>
						<div className="formRow">
							<label htmlFor="address"></label>
							<input type="text" id="city" name="city" className="input" placeholder="City" />
							<p id="addressError"></p>
						</div>
						<div className="formRow">
							<label htmlFor="address"></label>
							<input type="text" id="zip" name="zip" className="input" placeholder="ZIP code" />
							<p id="zipError"></p>
						</div>
						<div className="formRow">
							<label htmlFor="address"></label>
							<input type="text" id="street" name="street" className="input" placeholder="Street" />
							<p id="addressError"></p>
						</div>
					

					<div className="formRow">
					<label htmlFor="fileInputText" className="fileUpload" >Select files</label>
						<input type="file" name="file" id="fileInputText" onChange={changeHandler} />
							{isSelected ? (
								<div id="selectedFileInfo">
									<p>Filename: {selectedFile.name}</p>
									<p>Filetype: {selectedFile.type}</p>
									<p>Size in bytes: {selectedFile.size}</p>
									<p>
										lastModifiedDate:{' '}
									{/*	{selectedFile.lastModifiedDate.toLocaleDateString()} */}
									</p>
								</div>
							) : (
								<p id="selectFile">Select a file to show details</p>
							)}
					</div>

					<div>
						<button id="submitBtn" onClick={() => { setButtonClicked(true) }}>Submit</button>
					</div>
			</div>
		</div>
	)
}

export default App;
