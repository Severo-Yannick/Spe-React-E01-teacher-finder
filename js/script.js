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
