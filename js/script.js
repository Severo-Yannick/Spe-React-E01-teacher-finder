const app = {
  // SSOT ( Single Source Of Thruth ) = Unique source de vérité
  state: {
    bases: ["PHP", "JavaScript"],
    specialities: ["WordPress", "Data", "Symfony", "React"],
    teachers: [
      {
        name: "Loris",
        base: "PHP",
        speciality: "WordPress",
      },
      {
        name: "Jean",
        base: "JavaScript",
        speciality: "Data",
      },
      {
        name: "Jean-Christophe",
        base: "PHP",
        speciality: "Symfony",
      },
      {
        name: "Jean-Philippe",
        base: "PHP",
        speciality: "Symfony",
      },
      {
        name: "Julien",
        base: "PHP",
        speciality: "React",
      },
      {
        name: "Vincent",
        base: "JavaScript",
        speciality: "React",
      },
      {
        name: "Tony",
        base: "JavaScript",
        speciality: "React",
      },
    ],
  },
  appContainer: null,
  counterCountainer: null,
  init: function () {
    app.appContainer = document.getElementById("app");
    app.createForm();
    app.createCounter();
    app.createList();
  },
  handleBaseChange(event) {
    // La valeur qu'on vient de selectionner
    const baseValue = event.target.value;
    // Tous les éléments profs à filter ou pas
    const teacherElements = document.querySelectorAll(".teacher");

    // Pour chaque prof de la liste
    // On déclare un compteur pour mettre à jour le compteur
    let counter = 0;
    teacherElements.forEach((teacherElement) => {
      // on lit le DOM pour savoir si c'est la valeur qu'on cherche
      const teacherBase = teacherElement.querySelector(".teacher__base");
      // Si oui on décrit comment impacter le dom
      if (teacherBase.textContent === baseValue) {
        // On incrément le compteur à chaque fois qu'on veut afficher un professeur
        counter++;
        // On affiche l'élément
        teacherElement.classList.remove("hidden");
      } else {
        // On cache l'élément
        teacherElement.classList.add("hidden");
      }
    });
    // On ne doit pas oublier de mettre à jour le compteur
    app.counterContainer.textContent = app.getTitle(counter);
  },
  handleSpecialityChange(event) {
    // Valeur qu'on vient de selectionner
    const specialityValue = event.target.value;
    // Les éléments profs à filter ou pas
    const teacherElements = document.querySelectorAll(".teacher");

    let counter = 0;
    teacherElements.forEach((teacherElement) => {
      // Lecture du DOM afin de savoir si la valeur cherchée est la bonne
      const teacherSpeciality = teacherElement.querySelector(
        ".teacher__speciality"
      );
      // Si oui on décrit comment impacter le dom
      if (teacherSpeciality.textContent === specialityValue) {
        // On incrément le compteur à chaque fois qu'on veut afficher un professeur
        counter++;
        // Affichage de l'élément
        teacherElement.classList.remove("hidden");
      } else {
        // Cache de l'élément
        teacherElement.classList.add("hidden");
      }
    });
    // Mise à jour du compteur
    app.counterContainer.textContent = app.getTitle(counter);
  },
  // Création du formulaire
  createForm() {
    const form = app.configureElement("form", app.appContainer, {
      className: "search",
    });

    const selectBase = app.configureElement("select", form, {
      className: "search-choices",
    });
    // Ajout d'une option vide au select
    app.configureElement("option", selectBase, {
      textContent: "Choisir un langage",
      value: "",
    });
    // Ajout des options
    app.state.bases.forEach((base) => {
      // Création d'une option pour chaque bases
      app.configureElement("option", selectBase, {
        textContent: base,
        value: base,
      });
    });

    // Puis on fait pareil pour le select des spécialités
    const selectSpecialities = app.configureElement("select", form, {
      className: "search-choices",
    });
    // Ajout d'une option vide au select
    app.configureElement("option", selectSpecialities, {
      textContent: "Choisir une spécialité",
      value: "",
    });
    // Ajout des options
    app.state.specialities.forEach((speciality) => {
      // Création d'une option pour chaque speciality
      app.configureElement("option", selectSpecialities, {
        textContent: speciality,
        value: speciality,
      });
    });

    selectBase.addEventListener("change", app.handleBaseChange);
    selectSpecialities.addEventListener("change", app.handleSpecialityChange);
  },
  // Création du conteur des profs
  createCounter() {
    const numberOfTeacher = 0;
    app.counterContainer = app.configureElement("p", app.appContainer, {
      className: "counter",
      textContent: app.getTitle(numberOfTeacher),
    });
  },
  getTitle(nbTeacher) {
    if (nbTeacher > 1) {
      return `${nbTeacher} profs trouvés`;
    } else if (nbTeacher === 1) {
      return "1 prof trouvé";
    }
    return "Aucun prof trouvé";
  },
  createList() {
    // Création du conteneur de listes
    const list = app.configureElement("ul", app.appContainer, {
      className: "teacherList",
    });
    // Ajout des éléments à la liste
    app.state.teachers.forEach((teacher) => {
      const li = app.configureElement("li", list, {
        className: "teacher",
      });
      app.configureElement("span", li, {
        className: "teacher__name",
        textContent: teacher.name,
      });
      app.configureElement("span", li, {
        className: "teacher__base",
        textContent: teacher.base,
      });
      app.configureElement("span", li, {
        className: "teacher__speciality",
        textContent: teacher.speciality,
      });
    });

    // Récupération du nombre de profs trouvés
    const nbProfFiltered = list.querySelectorAll(".teacher").length;
    const titleCounter = app.getTitle(nbProfFiltered);
    // Mise à jour du compteur
    app.counterContainer.textContent = titleCounter;
  },

  configureElement(tag, parent, attributes) {
    const element = document.createElement(tag);

    for (const key in attributes) {
      element[key] = attributes[key];
    }
    parent.appendChild(element);
    return element;
  },
};

document.addEventListener("DOMContentLoaded", app.init);
