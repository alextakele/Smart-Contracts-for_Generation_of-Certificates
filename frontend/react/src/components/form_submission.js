import { useState } from "react";
import './form_submission.css';

export default function FormSubmission()  {
  const [selectedOption, setSelectedOption] = useState("option1");
  const [formData, setFormData] = useState({ NFT: "", pubKey: "", confirmKey: "" });
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});

  const handleDropdownChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.NFT.trim()) {
      newErrors.NFT = 'NFT is required';
    }

    if (!formData.pubKey.trim()) {
      newErrors.pubKey = 'Public key is required';
    }

    if (!formData.confirmKey.trim()) {
      newErrors.confirmKey = 'Confirm public key is required';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validateForm()) {
      const formDataToSend = new FormData();
      formDataToSend.append('NFT', formData.NFT);
      formDataToSend.append('pubKey', formData.pubKey);
      formDataToSend.append('confirmKey', formData.confirmKey);

      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
          method: 'POST',
          body: formDataToSend,
        });

        if (response.ok) {
          alert('Submitted successfully!');
        } else {
          alert('Submitted failed. Please try again.');
        }
      } catch (error) {
        console.error('Error uploading file:', error);
        alert('An error occurred while uploading the file.');
      }
    }
  };

  return (
    <div>
      <h1>DAPP</h1>
      <form onSubmit={handleSubmit}>
        {/* Labels and input fields... */}

        {/* Display validation errors */}
        
        <label htmlFor="nft">NFT</label>
        <input type="text" id="NFT" name="NFT" value={formData.NFT} onChange={handleChange} />
        {errors.NFT && <p className="error">{errors.NFT}</p>}
        
        <label htmlFor="pubKey">Public key</label>
        <input type="text" id="pubKey" name="pubKey" value={formData.pubKey} onChange={handleChange} />
        {errors.pubKey && <p className="error">{errors.pubKey}</p>}
    
        <label htmlFor="confirmKey">Confirm public key</label>
        <input type="text" id="confirmKey" name="confirmKey" value={formData.confirmKey} onChange={handleChange} />
        {errors.confirmKey && <p className="error">{errors.confirmKey}</p>}
        {/* Submit button with styles */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
