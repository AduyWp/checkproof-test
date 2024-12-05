interface UserData {
  firstName: string;
  lastName: string;
  age: string;
  phone: string;
  email: string;
  seat: string;
  food: string;
  allergies: string;
}

let currentStep = 0;
const formSteps = ["step-1", "step-2", "step-3", "result"];
let formData: UserData = {
  firstName: "",
  lastName: "",
  age: "",
  phone: "",
  email: "",
  seat: "",
  food: "",
  allergies: "",
};

// the current step
function showStep(stepIndex: number) {
  formSteps.forEach((step, index) => {
    const stepElement = document.getElementById(step);
    if (stepElement) {
      stepElement.classList.toggle("hidden", index !== stepIndex);
    }
  });

  // Toggle "Back" button visibility
  const backButton = document.getElementById("back-button")!;
  backButton.classList.toggle("hidden", stepIndex === 0);

  // Update "Next" button text
  const submitButton = document.getElementById("submit-button")!;
  submitButton.textContent = stepIndex === formSteps.length - 1 ? "Submit" : "Next";
}

// Validate fields for current step
function validateStep(stepIndex: number): boolean {
  const errors: Record<string, string> = {};
  const inputs = document.querySelectorAll(`#step-${stepIndex + 1} input`);

  inputs.forEach((input) => {
    const fieldName = input.getAttribute("data-testid")!;
    const value = (input as HTMLInputElement).value.trim();

    // Check if field is empty
    if (!value) {
      if(fieldName === "firstName"){
        errors[fieldName] = "First name is a required field"
      }
      if(fieldName === "lastName"){
        errors[fieldName] = "Last name is a required field"
      }
      if(fieldName === "age"){
        errors[fieldName] = "Age must be a number"
      }
      if(fieldName === "phone"){
        errors[fieldName] = "Phone number is a required field"
      }
      if(fieldName === "email"){
        errors[fieldName] = "Email is a required field"
      }
      if(fieldName === "seat"){
        errors[fieldName] = "Seat is a required field"
      }
      if(fieldName === "food"){
        errors[fieldName] = "Food is a required field"
      }
      if(fieldName === "allergies"){
        errors[fieldName] = "Allergies is a required field"
      }
    }

    // Specific validations for first name and last name (no numbers allowed)
    if (fieldName === "firstName" && value && /\d/.test(value)) {
      errors[fieldName] = "First name should not contain numbers";
    }

    if (fieldName === "lastName" && value && /\d/.test(value)) {
      errors[fieldName] = "Last name should not contain numbers";
    }

    // Add specific validations
    if (fieldName === "age" && value && Number(value) <= 0) {
      errors[fieldName] = "Age should be positive.";
    }

    if (fieldName === "email" && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      errors[fieldName] = "Email should have correct format.";
    }

    // Display errors
    const errorElement = document.getElementById(`${fieldName}Error`);
    if (errorElement) {
      errorElement.textContent = errors[fieldName] || "";
    }
  });

  return Object.keys(errors).length === 0;
}

// Collect form data from the current step
function collectFormData(stepIndex: number) {
  const inputs = document.querySelectorAll(`#step-${stepIndex + 1} input`);

  inputs.forEach((input) => {
    const fieldName = input.getAttribute("data-testid")!;
    formData[fieldName as keyof UserData] = (input as HTMLInputElement).value.trim();
  });
}

// Display collected data on the results page
function showResults() {
  Object.keys(formData).forEach((key) => {
    const displayElement = document.querySelector(`[data-testid="${key}-display"]`);
    if (displayElement) {
      displayElement.textContent = formData[key as keyof UserData];
    }
  });
}

// Handle button clicks
document.getElementById("submit-button")!.addEventListener("click", () => {
  if (currentStep === formSteps.length - 1) {
    // Submit the form and show results
    showResults();
  } else {
    // Validate the current step
    if (validateStep(currentStep)) {
      collectFormData(currentStep);
      currentStep++;
      showStep(currentStep);
    }
  }
});

document.getElementById("back-button")!.addEventListener("click", () => {
  if (currentStep > 0) {
    currentStep--;
    showStep(currentStep);
  }
});

// Initialize the form
document.addEventListener("DOMContentLoaded", () => {
  showStep(currentStep);
});
