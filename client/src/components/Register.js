/* eslint-disable */

import React from 'react';
import { useState, useEffect } from 'react';

const Register = () => {

	const [userName, setUserName] = useState('');
	const [email, setEmail] = useState('');

	return (
		<div>
			<form>
				<div className='text_box'>
					<input 
						type='text' 
						placeholder='Email' 
						value={email} 
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<div className='text_box'>
					<input 
						type='text' 
						placeholder='User Name' 
						value={userName} 
						onChange={(e) => setUserName(e.target.value)}
					/>
				</div>
			</form>
		</div>
	);
}

export default Register;