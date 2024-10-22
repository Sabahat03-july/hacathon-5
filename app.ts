// Ensure jsPDF is loaded
document.addEventListener("DOMContentLoaded", () => {
    const { jsPDF } = window.jspdf;
  
    // Function to get input values safely and update the resume preview
    function getInputValues(): { name: string; email: string; phone: string; skills: string[]; gender: string; experience: string } {
      const name = (document.getElementById("name") as HTMLInputElement).value;
      const email = (document.getElementById("email") as HTMLInputElement).value;
      const phone = (document.getElementById("phone") as HTMLInputElement).value;
  
      // Get skills
      const skills: string[] = [];
      if ((document.getElementById("skill-1") as HTMLInputElement).checked) skills.push("JavaScript");
      if ((document.getElementById("skill-2") as HTMLInputElement).checked) skills.push("HTML");
      if ((document.getElementById("skill-3") as HTMLInputElement).checked) skills.push("CSS");
  
      // Get gender
      const genderElement = document.querySelector('input[name="gender"]:checked') as HTMLInputElement;
      const gender = genderElement ? genderElement.nextSibling?.textContent?.trim() || "Not specified" : "Not specified";
  
      // Get experience
      const experience = (document.getElementById("experience") as HTMLInputElement).value;
  
      return { name, email, phone, skills, gender, experience };
    }
  
    // Generate Resume and PDF when button is clicked
    document.getElementById("generate-resume")!.addEventListener("click", () => {
      const { name, email, phone, skills, gender, experience } = getInputValues();
  
      // Display resume in the right-side section
      (document.getElementById("resume-name") as HTMLElement).textContent = "Name: " + name;
      (document.getElementById("resume-email") as HTMLElement).textContent = "Email: " + email;
      (document.getElementById("resume-phone") as HTMLElement).textContent = "Phone: " + phone;
      (document.getElementById("resume-skills") as HTMLElement).textContent = "Skills: " + skills.join(", ");
      (document.getElementById("resume-gender") as HTMLElement).textContent = "Gender: " + gender;
      (document.getElementById("resume-experience") as HTMLElement).textContent = "Experience: " + experience;
  
      // Show the resume output
      document.getElementById("resume-output")!.style.display = "block";
    });
  
    // Download Resume as PDF
    document.getElementById("download-resume")!.addEventListener("click", () => {
      const { name, email, phone, skills, gender, experience } = getInputValues();
  
      const doc = new jsPDF();
  
      // Adding content to PDF
      doc.setFontSize(18);
      doc.text("Resume", 20, 20);
  
      // Name
      doc.setFontSize(14);
      doc.text("Name: " + name, 20, 40);
  
      // Email
      doc.text("Email: " + email, 20, 50);
  
      // Phone
      doc.text("Phone: " + phone, 20, 60);
  
      // Skills
      doc.text("Skills: " + skills.join(", "), 20, 70);
  
      // Gender
      doc.text("Gender: " + gender, 20, 80);
  
      // Experience
      doc.text("Experience: " + experience, 20, 90);
  
      // Save PDF
      doc.save("resume.pdf");
    });
  });
  