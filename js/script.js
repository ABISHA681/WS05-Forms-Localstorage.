
const animalForm = document.getElementById("animalForm");
const animalName = document.getElementById("animalName");
const animalSpecies = document.getElementById("animalSpecies");
const careNote = document.getElementById("careNote");
const nameError = document.getElementById("nameError");
const speciesError = document.getElementById("speciesError");
const noteError = document.getElementById("noteError");
const formResult = document.getElementById("formResult");

// Exercise 1 and 3: Validate form and save animal
animalForm.addEventListener("submit", function (event) {
    event.preventDefault();

    nameError.textContent = "";
    speciesError.textContent = "";
    noteError.textContent = "";
    formResult.textContent = "";

    const name = animalName.value.trim();
    const species = animalSpecies.value.trim();
    const note = careNote.value.trim();

    let valid = true;

    if (name === "") {
        nameError.textContent = "Please enter an animal name.";
        valid = false;
    }
    if (species === "") {
        speciesError.textContent = "Please select an animal species.";
        valid = false;
    }
    if (note === "") {
        noteError.textContent = "Please enter a care note.";
        valid = false;
    } else if (note.length > 150) {
        noteError.textContent = "Care note must be 150 characters or less.";
        valid = false;
    }

    if (!valid) return;

    formResult.textContent =
        "Animal: " + name + ", Species: " + species + ", Note: " + note;

    const animal = { name, species, note };
    localStorage.setItem("ws05Animal", JSON.stringify(animal));
});

// Exercise 2: Sponsorship calculator
const sponsorForm = document.getElementById("sponsorForm");
const animalType = document.getElementById("animalType");
const yearsInput = document.getElementById("years");
const cost = document.getElementById("cost");
const discountMessage = document.getElementById("discountMessage");

sponsorForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const annualFee = Number(animalType.value);
    const years = Number(yearsInput.value);

    cost.textContent = "";
    discountMessage.textContent = "";

    if (animalType.value === "" || yearsInput.value.trim() === "" ||
        !Number.isFinite(annualFee) || annualFee <= 0 ||
        !Number.isInteger(years) || years < 1) {
        cost.textContent = "Please enter valid values.";
        return;
    }

    let total = annualFee * years;

    if (years > 2) {
        total *= 0.8;
        discountMessage.textContent = "20% discount applied.";
    }

    if (years >= 5) {
        total -= 5;
        discountMessage.textContent =
            "20% discount and extra €5 discount applied.";
    }

    cost.textContent = "Total cost: €" + total.toFixed(2);
});

// Exercise 4: Load and clear saved animal
const loadButton = document.getElementById("loadAnimal");
const clearButton = document.getElementById("clearAnimal");
const savedAnimal = document.getElementById("savedAnimal");

function loadAnimal() {
    const storedData = localStorage.getItem("ws05Animal");

    if (storedData === null) {
        savedAnimal.textContent = "No saved animal found.";
        return;
    }

    try {
        const animal = JSON.parse(storedData);

        if (!animal || typeof animal.name !== "string" ||
            typeof animal.species !== "string" ||
            typeof animal.note !== "string") {
            throw new Error("Invalid animal data");
        }

        savedAnimal.textContent =
            "Name: " + animal.name +
            ", Species: " + animal.species +
            ", Note: " + animal.note;
    } catch (error) {
        savedAnimal.textContent = "Could not load saved animal.";
    }
}

loadButton.addEventListener("click", loadAnimal);

clearButton.addEventListener("click", function () {
    localStorage.removeItem("ws05Animal");
    savedAnimal.textContent = "Saved animal removed.";
});

loadAnimal();
  
