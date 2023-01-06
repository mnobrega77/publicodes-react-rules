//modele-social@1.4.0.js

export default {
  "artiste-auteur": {
    "experimental": "oui",
    "description": "Le régime des artistes-auteurs",
    "icônes": "👩‍🎨"
  },
  "artiste-auteur . revenus": null,
  "artiste-auteur . revenus . traitements et salaires": {
    "titre": "Revenu en traitements et salaires",
    "par défaut": "0 €/an",
    "résumé": "Le montant brut hors TVA de vos droits d'auteur (recettes précomptées)"
  },
  "artiste-auteur . revenus . BNC": {
    "unité": "€/an",
    "formule": {
      "valeur": "recettes",
      "abattement": {
        "variations": [
          {
            "si": "micro-bnc",
            "alors": "charges forfaitaires"
          },
          {
            "sinon": "frais réels"
          }
        ]
      }
    }
  },
  "artiste-auteur . revenus . BNC . micro-bnc": {
    "non applicable si": "contrôle micro-bnc",
    "applicable si": "recettes > 0 €/an",
    "par défaut": "oui",
    "question": "Souhaitez-vous opter pour le régime micro-BNC ?",
    "résumé": "Avec abattement forfaitaire fiscal de 34 % au titre des frais professionnels"
  },
  "artiste-auteur . revenus . BNC . contrôle micro-bnc": {
    "description": "Vos revenus ne vous permettent pas d'opter pour le régime micro-BNC.",
    "formule": {
      "toutes ces conditions": [
        "recettes != 0",
        "recettes > 72600 €/an"
      ]
    }
  },
  "artiste-auteur . revenus . BNC . recettes": {
    "titre": "Revenu en BNC",
    "par défaut": "0 €/an",
    "résumé": "Le montant de vos recettes brutes hors TVA"
  },
  "artiste-auteur . revenus . BNC . frais réels": {
    "par défaut": "0 €/an",
    "question": "Régime des frais réels BNC",
    "résumé": "Montant de vos dépenses (frais professionnels, amortissements…) qui seront imputés à vos recettes afin d’établir vos bénéfices ou déficits",
    "applicable si": "recettes > 0 €/an",
    "non applicable si": "micro-bnc"
  },
  "artiste-auteur . revenus . BNC . charges forfaitaires": {
    "formule": "34% * recettes"
  },
  "artiste-auteur . cotisations": {
    "formule": {
      "somme": [
        "vieillesse",
        "CSG-CRDS",
        "formation professionnelle"
      ],
      "arrondi": "oui"
    },
    "références": {
      "Urssaf.fr": "https://www.urssaf.fr/portail/home/espaces-dedies/artistes-auteurs-diffuseurs-comm/vous-etes-artiste-auteur/vos-cotisations-et-contributions.html"
    }
  },
  "artiste-auteur . cotisations . assiette": {
    "description": "Les revenus des artistes-auteurs peuvent être catégorisés soit comme des traitements et salaires, soit comme des bénéfices non commerciaux. Les cotisations sociales sont payées sur la somme des revenus de ces deux catégories.",
    "formule": {
      "somme": [
        "revenus . traitements et salaires",
        "revenus . BNC * 1.15"
      ]
    }
  },
  "artiste-auteur . cotisations . option surcotisation": {
    "applicable si": {
      "toutes ces conditions": [
        "assiette > 0",
        "assiette < assiette surcotisation"
      ]
    },
    "remplace": {
      "règle": "assiette",
      "dans": "vieillesse",
      "par": "assiette surcotisation"
    },
    "question": "Souhaitez-vous surcotiser pour augmenter vos droits à retraite ?",
    "description": "Vos revenus sont en dessous des seuils vous permettant de valider l'ensemble\nde vos droits sociaux. Vous pouvez choisir de surcotiser sur l'année entière\npour augmenter vos droits.\n\nDans ce cas, vos cotisations vieillesse seront calculées sur la base de 600 Smic\nhoraire dans l’année.\n",
    "par défaut": "non",
    "références": {
      "Urssaf.fr": "https://www.urssaf.fr/portail/home/espaces-dedies/artistes-auteurs-diffuseurs-comm/vous-etes-artiste-auteur/la-surcotisation.html"
    }
  },
  "artiste-auteur . cotisations . assiette surcotisation": {
    "produit": {
      "assiette": "SMIC . horaire . début d'année",
      "facteur": {
        "variations": [
          {
            "si": "date >= 01/01/2019",
            "alors": "600 heures/an"
          },
          {
            "sinon": "900 heures/an"
          }
        ]
      }
    }
  },
  "artiste-auteur . cotisations . avertissement trimestres retraite": {
    "type": "notification",
    "sévérité": "avertissement",
    "formule": {
      "toutes ces conditions": [
        "assiette > 0 €/an",
        "assiette < 600 heures/an * SMIC . horaire . début d'année",
        "option surcotisation = non"
      ]
    },
    "description": "Vos revenus ne vous permettent pas de valider 4 trimestres pour la retraite\nde base. Vous pouvez décider de « surcotiser » pour valider 4 trimestres et\nbénéficier d'indemnités journalières.\n"
  },
  "artiste-auteur . cotisations . vieillesse": {
    "titre": "Retraite de base",
    "formule": {
      "produit": {
        "assiette": "assiette",
        "composantes": [
          {
            "attributs": {
              "nom": "plafonnée"
            },
            "taux": "salarié . cotisations . vieillesse . salarié . plafonnée . taux - 0.75%",
            "plafond": "plafond sécurité sociale"
          },
          {
            "attributs": {
              "nom": "déplafonnée"
            },
            "taux": "salarié . cotisations . vieillesse . salarié . déplafonnée . taux - 0.4%"
          }
        ]
      }
    }
  },
  "artiste-auteur . cotisations . CSG-CRDS": {
    "formule": {
      "somme": [
        "CSG",
        "CRDS"
      ]
    }
  },
  "artiste-auteur . cotisations . CSG-CRDS . assiette": {
    "formule": {
      "somme": [
        "cotisations . assiette",
        "(- CSG-CRDS . abattement)"
      ]
    }
  },
  "artiste-auteur . cotisations . CSG-CRDS . abattement": {
    "formule": {
      "produit": {
        "assiette": "revenus . traitements et salaires",
        "taux": "1.75%",
        "plafond": "4 * plafond sécurité sociale"
      }
    }
  },
  "artiste-auteur . cotisations . CSG-CRDS . CSG": {
    "formule": {
      "produit": {
        "assiette": "CSG-CRDS . assiette",
        "taux": "9.20%"
      }
    }
  },
  "artiste-auteur . cotisations . CSG-CRDS . CRDS": {
    "formule": {
      "produit": {
        "assiette": "CSG-CRDS . assiette",
        "taux": "0.50%"
      }
    }
  },
  "artiste-auteur . cotisations . formation professionnelle": {
    "formule": {
      "produit": {
        "assiette": "assiette",
        "taux": "0.35%"
      }
    }
  },
  "artiste-auteur . cotisations . IRCEC": {
    "titre": "Retraite complémentaire",
    "description": "Si vous êtes artiste-auteur professionnel et que vous êtes rémunéré en\ndroits d’auteur, l’IRCEC est l’organisme de Sécurité sociale qui assure la\ngestion de votre retraite complémentaire obligatoire.\n",
    "formule": {
      "somme": [
        "cotisation RAAP",
        "cotisation RACD",
        "cotisation RACL"
      ]
    },
    "références": {
      "Guide IRCEC 2021": "http://www.ircec.fr/wp-content/uploads/2021/02/guide-ircec-2021.pdf"
    }
  },
  "artiste-auteur . cotisations . IRCEC . cotisation RAAP": {
    "applicable si": "assiette > seuil d'affiliation",
    "description": "Vous pouvez bénéficier d'un taux réduit à votre demande si vos revenus\nn'atteignent pas à seuil minimal pour une année donnée. Ce taux réduit\ns'applique également à vos revenus déjà soumis à cotisation auprès du RACL\nou du RACD.\n",
    "formule": {
      "variations": [
        {
          "si": "taux réduit",
          "alors": {
            "produit": {
              "assiette": "assiette",
              "taux": "4%"
            }
          }
        },
        {
          "sinon": {
            "barème": {
              "assiette": "assiette",
              "tranches": [
                {
                  "taux": "4%",
                  "plafond": {
                    "variations": [
                      {
                        "si": "profession . RACD",
                        "alors": "cotisation RACD . plafond"
                      },
                      {
                        "si": "profession . RACL",
                        "alors": "cotisation RACL . plafond"
                      }
                    ]
                  }
                },
                {
                  "taux": "8%"
                }
              ]
            }
          }
        }
      ],
      "arrondi": "oui"
    }
  },
  "artiste-auteur . cotisations . IRCEC . cotisation RAAP . seuil d'affiliation": "9135 €/an",
  "artiste-auteur . cotisations . IRCEC . cotisation RAAP . taux réduit": {
    "applicable si": "assiette < 3 * seuil d'affiliation",
    "question": "Souhaitez-vous cotiser sur la base d'un taux réduit pour votre retraite complémentaire à l'IRCEC ?",
    "par défaut": "non",
    "description": "Le régime RAAP vous permet d'opter pour un taux réduit de 4% au lieu de 8%\nsi vous en faite la demande.\n\nLes points de retraite complémentaire sont acquis au pro-rata du montant\ncotisé. En réduisant votre cotisation vous réduisez donc le nombre de points\nacquis.\n",
    "références": {
      "Guide IRCEC 2021": "http://www.ircec.fr/wp-content/uploads/2021/02/guide-ircec-2021.pdf#page=5"
    }
  },
  "artiste-auteur . cotisations . IRCEC . profession": {
    "question": "Exercez-vous l'une de professions suivantes ?",
    "description": "Selon  la  nature  de  leur  activité,  les  artistes-auteurs  cotisent  à\nun  ou  plusieurs  régimes  de  retraite  complémentaire  gérés  par\nl’IRCEC :  dans  tous  les  cas  et  si  vous  atteignez  le  seuil\nd’affiliation,  au  RAAP,  puis  selon  votre  activité  artistique  au RACD\net/ou au RACL.\n",
    "formule": {
      "une possibilité": {
        "choix obligatoire": "non",
        "possibilités": [
          "RACD",
          "RACL"
        ]
      }
    },
    "par défaut": "''"
  },
  "artiste-auteur . cotisations . IRCEC . profession . RACD": {
    "icônes": "🎞️",
    "titre": "auteur ou compositeur dramatique, de spectacle vivant, de films",
    "description": "Les professions suivantes cotisent au RACD :\n  - Les auteurs dramatiques exerçant l’une des professions suivantes : scénariste, dialoguiste, adaptateur, réalisateur, auteur de la bible littéraire, auteur graphique d’animation,  créateur  des  personnages  originaux  et  des  décors  s’il  s’agit  d’un  univers original, etc.\n  - Les  auteurs  et  compositeurs  dramatiques  et  du  spectacle  vivant  :  théâtre,  danse, opéra, cirque, arts de la rue, etc.\n",
    "formule": "profession = 'RACD'"
  },
  "artiste-auteur . cotisations . IRCEC . profession . RACL": {
    "icônes": "🎙️",
    "titre": "auteur ou compositeur lyrique, dialoguiste de doublage",
    "description": "Les auteurs et compositeurs d’œuvres musicales et les dialoguistes de doublage cotisent au RACL.",
    "formule": "profession = 'RACL'"
  },
  "artiste-auteur . cotisations . IRCEC . régime RACL": {
    "question": "Cotisez-vous au RACL ?",
    "par défaut": "non"
  },
  "artiste-auteur . cotisations . IRCEC . cotisation RACD": {
    "applicable si": "profession . RACD",
    "formule": {
      "produit": {
        "assiette": "assiette",
        "plafond": {
          "nom": "plafond",
          "valeur": "496250 €/an"
        },
        "taux": "8%"
      },
      "arrondi": "oui"
    }
  },
  "artiste-auteur . cotisations . IRCEC . cotisation RACL": {
    "applicable si": "profession . RACL",
    "formule": {
      "barème": {
        "assiette": "assiette",
        "tranches": [
          {
            "taux": "0%",
            "plafond": "2739 €/an"
          },
          {
            "taux": "6.5%",
            "plafond": {
              "nom": "plafond",
              "valeur": "376665 €/an"
            }
          },
          {
            "taux": {
              "nom": "cotisation de solidarité",
              "valeur": "1.5%"
            }
          }
        ]
      },
      "arrondi": "oui"
    }
  },
  "plafond sécurité sociale": {
    "description": "Le plafond de Sécurité sociale est le montant maximum des rémunérations à prendre en compte pour le calcul de certaines cotisations.",
    "acronyme": "PSS",
    "valeur": "3428 €/mois",
    "références": {
      "Urssaf.fr": "https://www.urssaf.fr/portail/home/taux-et-baremes/plafonds.html",
      "arrêté 2021": "https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000042748904"
    },
    "note": "Le plafond de la Sécurité sociale n'a pas été revalorisé en 2021 par rapport à 2020.",
    "avec": {
      "horaire": {
        "acronyme": "PHSS",
        "valeur": "plafond sécurité sociale / 1607 heures/an",
        "arrondi": "oui",
        "unité": "€/heures",
        "références": {
          "Article D242-19 du code de la sécurité sociale": "https://www.legifrance.gouv.fr/affichCodeArticle.do?idArticle=LEGIARTI000033516173&cidTexte=LEGITEXT000006073189"
        }
      },
      "journalier": {
        "acronyme": "PJSS",
        "valeur": "plafond sécurité sociale / 218 jours/an",
        "arrondi": "oui",
        "unité": "€/jour",
        "références": {
          "Article D242-17 du code de la sécurité sociale": "https://www.legifrance.gouv.fr/affichCodeArticle.do?cidTexte=LEGITEXT000006073189&idArticle=LEGIARTI000006736124"
        }
      }
    }
  },
  "SMIC": {
    "unité": "€/mois",
    "produit": {
      "assiette": "durée légale du travail . mensuelle",
      "facteur": "SMIC . horaire"
    },
    "références": {
      "décret": "https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000042677359?r=s75zUOEVpR"
    }
  },
  "SMIC . net imposable": {
    "titre global": "SMIC net imposable",
    "description": "Montant du SMIC net imposable pour un temps plein.",
    "recalcul": {
      "règle": "salarié . rémunération . net . imposable . sans déductions",
      "avec": {
        "salarié": "oui",
        "salarié . contrat . salaire brut": "SMIC"
      }
    },
    "références": {
      "barème PAS": "https://bofip.impots.gouv.fr/bofip/11255-PGP.html"
    }
  },
  "SMIC . horaire": {
    "titre global": "SMIC horaire",
    "variations": [
      {
        "si": "établissement . commune . département . outre-mer . Mayotte",
        "alors": {
          "variations": [
            {
              "si": "date >= 01/08/2022",
              "alors": "8.35 €/heures"
            },
            {
              "si": "date >= 01/05/2022",
              "alors": "8.19 €/heures"
            },
            {
              "si": "date >= 01/2022",
              "alors": "7.98 €/heures"
            },
            {
              "si": "date >= 01/10/2021",
              "alors": "7.91 €/heures"
            },
            {
              "si": "date >= 01/2021",
              "alors": "7.74 €/heures"
            }
          ]
        }
      },
      {
        "sinon": {
          "variations": [
            {
              "si": "date >= 01/08/2022",
              "alors": "11.07 €/heures"
            },
            {
              "si": "date >= 01/05/2022",
              "alors": "10.85 €/heures"
            },
            {
              "si": "date >= 01/2022",
              "alors": "10.57 €/heures"
            },
            {
              "si": "date >= 01/10/2021",
              "alors": "10.48 €/heures"
            },
            {
              "si": "date >= 01/2021",
              "alors": "10.25 €/heures"
            }
          ]
        }
      }
    ],
    "note": "En principe et sauf « coup de pouce », le SMIC est revalorisé au 1er janvier\nde chaque année. Toutefois une revalorisation doit intervenir en cours\nd'année si l'indice des prix de référence a augmenté de 2% ou plus depuis la\ndernière revalorisation du SMIC.\n",
    "références": {
      "décret": "https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000046113517",
      "service-public.fr": "https://www.service-public.fr/particuliers/vosdroits/F2300"
    },
    "avec": {
      "début d'année": {
        "titre": "en début d'année",
        "recalcul": {
          "règle": "SMIC . horaire",
          "avec": {
            "date": "période . début d'année"
          }
        }
      }
    }
  },
  "durée légale du travail": {
    "valeur": "35 heures/semaine",
    "avec": {
      "mensuelle": "durée légale du travail * période . semaines par mois"
    },
    "références": {
      "Code du travail numérique": "https://code.travail.gouv.fr/fiche-ministere-travail/la-duree-legale-du-travail"
    }
  },
  "bénéficiaire": {
    "experimental": "oui",
    "applicable si": "entreprise . imposition . IS",
    "description": "Un bénéficiaire est un actionnaire dans une SAS ou un associé dans une\nSARL/EURL.\n\nAttention: nous ne prenons en compte ici que le cas de figure de l'associé\n  unique (SASU et EURL).\n",
    "valeur": "non"
  },
  "bénéficiaire . compte courant d'associé": {
    "par défaut": "0€",
    "titre": "Sommes versées en compte courant d'associé",
    "question": "Quelles sont les sommes versées en compte courant par l'associé ?",
    "description": "Cette valeur est nécessaire à calculer le montant maximal imposable au PFU pour un bénéficiaire au régime des travailleurs indépendants.\nLe montant pris en compte est le solde moyen annuel du compte courant. Il est déterminé par la somme des soldes moyens mensuels du compte, divisée par le nombre de mois compris dans l’exercice.\nLe solde moyen mensuel est égal à l’addition des soldes journaliers, divisée par le nombre de jours dans le mois. Le solde moyen mensuel diffère donc du solde mensuel figurant dans les comptes de la société.\nEn cas d’ouverture ou de clôture du compte en cours d’exercice, le nombre de mois au cours de l’exercice sera réduit au nombre de mois de fonctionnement du compte. Un compte est considéré comme « fonctionnant », même s’il n’est pas mouvementé au cours de l’exercice.  La date à laquelle les sommes versées en compte courant doivent être appréciées est le dernier jour de l’exercice précédant le versement des intérêts.\n",
    "références": {
      "Circulaire RSI C2014-001": "https://www.secu-independants.fr/uploads/tx_rsirss/C2014-001.pdf"
    }
  },
  "bénéficiaire . dividendes": {
    "valeur": "oui",
    "applicable si": "entreprise . imposition = 'IS'"
  },
  "bénéficiaire . dividendes . bruts": {
    "unité": "€/an",
    "par défaut": "0 €/an",
    "inversion numérique": {
      "avec": [
        "nets d'impôt"
      ]
    },
    "titre": "Dividendes bruts versés"
  },
  "bénéficiaire . dividendes . nets": {
    "somme": [
      "bruts",
      "(- cotisations et contributions)"
    ],
    "titre": "Dividendes nets"
  },
  "bénéficiaire . dividendes . nets d'impôt": {
    "valeur": {
      "somme": [
        "bruts",
        "(- dividendes . cotisations et contributions)",
        "(- impôt . dividendes . montant en sus des autres revenus imposables)"
      ]
    },
    "titre": "Dividendes nets",
    "résumé": "Après paiements des cotisations et impôts"
  },
  "bénéficiaire . dividendes . cotisations et contributions": {
    "produit": {
      "assiette": "bruts",
      "composantes": [
        {
          "attributs": {
            "nom": "CSG non déductible"
          },
          "taux": {
            "variations": [
              {
                "si": "impôt . méthode de calcul . PFU",
                "alors": "9.2%"
              },
              {
                "sinon": "2.4%"
              }
            ]
          }
        },
        {
          "attributs": {
            "nom": "CSG déductible"
          },
          "taux": {
            "variations": [
              {
                "si": "impôt . méthode de calcul . PFU",
                "alors": "0%"
              },
              {
                "sinon": "6.8%"
              }
            ]
          }
        },
        {
          "attributs": {
            "nom": "CRDS"
          },
          "taux": "0.5%"
        },
        {
          "attributs": {
            "nom": "prélèvement de solidarité"
          },
          "taux": "7.5%"
        }
      ]
    },
    "note": "La CSG sur les revenus soumis au PFU n'est jamais déductible",
    "références": {
      "Fiche impots.gouv.fr": "https://www.impots.gouv.fr/portail/particulier/les-revenus-mobiliers",
      "Fiche service-public.fr": "https://www.service-public.fr/particuliers/vosdroits/F2329",
      "Article L 136-6 du code de la sécurité sociale": "https://www.legifrance.gouv.fr/codes/id/LEGISCTA000006173130/",
      "Article L 136-7 du code de la sécurité sociale": "https://www.legifrance.gouv.fr/codes/id/LEGISCTA000006173129/"
    }
  },
  "bénéficiaire . dividendes . imposables": {
    "somme": [
      {
        "valeur": "bruts",
        "abattement": "40%"
      },
      "(- cotisations et contributions . CSG déductible)"
    ],
    "titre": "Net imposable des dividendes auxquels s'applique le barème de l'impôt sur le revenu",
    "description": "Un abattement de 40% s'applique dans le cas où\n\n- la société distributrice des dividendes relève de l'IS\n- la société distributrice est française ou a son siège en UE ou dans un\n  état ayant conclu des accords en ce sens avec la France\n- les dividendes sont décidés en assemblée générale.\n",
    "références": {
      "Fiche service-public.fr": "https://www.service-public.fr/professionnels-entreprises/vosdroits/F32963",
      "Article 158 du Code général des impôts": "https://www.legifrance.gouv.fr/codes/id/LEGIARTI000038836594/"
    }
  },
  "bénéficiaire . dividendes . cotisations et contributions . assiette forfaitaire": {
    "variations": [
      {
        "si": "dirigeant = 'indépendant'",
        "alors": {
          "valeur": "bruts",
          "plafond": "assiette forfaitaire max indépendant"
        }
      },
      {
        "sinon": "bruts"
      }
    ],
    "unité": "€/an",
    "titre": "Assiette des dividendes soumis aux cotisations et contributions au PFU (ou \"flat tax\")",
    "description": "Ce calcul extrait l'assiette des dividendes qui sont soumis au PFU en termes\nde cotisations et contributions.\n",
    "références": {
      "Article L131-6 du Code de la Sécurité Sociale": "https://www.legifrance.gouv.fr/codes/id/LEGISCTA000033714224/",
      "Fiche BPI Création": "https://bpifrance-creation.fr/encyclopedie/fiscalite-lentreprise/generalites/regime-fiscal-social-dividendes"
    }
  },
  "bénéficiaire . dividendes . cotisations et contributions . assiette forfaitaire max indépendant": {
    "produit": {
      "assiette": {
        "somme": [
          "entreprise . capital social",
          "compte courant d'associé"
        ]
      },
      "taux": "10%"
    },
    "unité": "€/an"
  },
  "bénéficiaire . dividendes . cotisations et contributions . assiette régime indépendant": {
    "valeur": "bruts - assiette forfaitaire",
    "par défaut": "0 €/an",
    "unité": "€/an",
    "titre": "Assiette des dividendes soumis aux cotisations et contributions du régime indépendant",
    "description": "Cette assiette représente la partie des dividendes qui n'est pas soumise au\nprélèvements sociaux forfaitaires mais aux cotisations et contributions du\nrégime du travailleur indépendant.\n",
    "références": {
      "Fiche BPI Création": "https://bpifrance-creation.fr/encyclopedie/fiscalite-lentreprise/generalites/regime-fiscal-social-dividendes"
    }
  },
  "DRI": {
    "experimental": "oui",
    "valeur": "non",
    "remplace": [
      {
        "règle": "entreprise . catégorie juridique . EI . auto-entrepreneur . défaut",
        "par": "non"
      }
    ]
  },
  "DRI . cas exclus": {
    "applicable si": {
      "une de ces conditions": [
        "entreprise . catégorie juridique . EI . auto-entrepreneur",
        "entreprise . catégorie juridique . SAS",
        "entreprise . catégorie juridique . autre",
        {
          "toutes ces conditions": [
            "entreprise . catégorie juridique . SARL",
            "entreprise . catégorie juridique . SARL . unipersonnelle = non"
          ]
        },
        "entreprise . date de création >= 01/2022",
        "entreprise . imposition . IR . type de bénéfices . BA"
      ]
    },
    "variations": [
      {
        "si": "entreprise . imposition . IR . type de bénéfices . BA",
        "alors": {
          "texte": "### Nous ne proposons pas encore d'aide pour les entreprises agricoles\n\n{{ textes . désolé }}"
        }
      },
      {
        "si": "entreprise . catégorie juridique . autre",
        "alors": {
          "texte": "### Nous ne proposons pas encore d'aide pour votre type d'entreprise\n\n{{ textes . désolé }}"
        }
      },
      {
        "si": "entreprise . catégorie juridique . EI . auto-entrepreneur",
        "alors": {
          "texte": "### Nous ne proposons pas encore d'aide pour les auto-entrepreneurs\n\n{{ textes . désolé }}\n\n{{ textes . autres outils }}"
        }
      },
      {
        "si": "entreprise . catégorie juridique . SAS",
        "alors": {
          "texte": "### Nous ne proposons pas encore d'aide pour les dirigeants de SAS(U)\n\n{{ textes . désolé }}\n\n{{ textes . autres outils }}"
        }
      },
      {
        "si": {
          "une de ces conditions": [
            {
              "toutes ces conditions": [
                "entreprise . catégorie juridique . SARL",
                "entreprise . catégorie juridique . SARL . unipersonnelle = non"
              ]
            },
            "entreprise . catégorie juridique . SELARL",
            "entreprise . catégorie juridique . SELAS"
          ]
        },
        "alors": {
          "texte": "### Nous ne proposons pas encore d'aide pour les dirigeant de {{ entreprise . catégorie juridique }}\n\n{{ textes . désolé }}\n\n{{ textes . autres outils }}"
        }
      },
      {
        "si": "entreprise . date de création >= 01/2022",
        "alors": {
          "texte": "### Vous avez créé votre entreprise en 2022\n\nLes revenus de cette entreprise seront à déclarer l'année prochaine.\n\nVous pouvez estimer le montant de votre revenu net après impôt grâce aux\nsimulateurs disponibles sur ce site."
        }
      }
    ]
  },
  "DRI . textes": "oui",
  "DRI . textes . désolé": {
    "texte": "Si vous rencontrez des difficultés à remplir votre déclaration,\nrapprochez-vous de votre expert-comptable. Si vous êtes sans comptable, vous pouvez\n[contacter le service des impôts](https://www.impots.gouv.fr/contacts)."
  },
  "DRI . textes . autres outils": {
    "texte": "Ce site propose d'autres outils qui pourraient vous intéresser (par exemple un\nsimulateur de revenu net après impôt)."
  },
  "DRI . textes . comptable": {
    "texte": "En cas de doutes, **demandez à votre expert-comptable**."
  },
  "DRI . nombre de déclarations": {
    "somme": [
      {
        "valeur": "entreprise . durée d'activité . en fin d'année",
        "unité": "an"
      },
      0.5
    ],
    "plancher": 0,
    "arrondi": "oui",
    "unité": ""
  },
  "DRI . accompagnement imposition par défaut": "nombre de déclarations < 5",
  "DRI . accompagnement imposition": {
    "titre": "Assistant en mode accompagnement",
    "non applicable si": "DRI . cas exclus",
    "valeur": "accompagnement imposition par défaut"
  },
  "DRI . accompagnement imposition . type": {
    "variations": [
      {
        "si": "entreprise . catégorie juridique . EI",
        "alors": {
          "texte": "Votre entreprise est une **entreprise individuelle**. {{ situation }}"
        }
      },
      {
        "si": "entreprise . catégorie juridique . SARL . unipersonnelle",
        "alors": {
          "texte": "Votre entreprise est une **EURL**. {{ situation }}"
        }
      }
    ]
  },
  "DRI . accompagnement imposition . type . situation": {
    "variations": [
      {
        "si": "entreprise . imposition . IS",
        "alors": {
          "texte": "Vous avez choisi l'option pour être imposé à l'**impôt sur les sociétés** (IS)."
        }
      },
      {
        "si": "entreprise . catégorie juridique . EI",
        "alors": {
          "texte": "Par défaut, ce type d'entreprise est imposée à l'**impôt sur le revenu** (IR),\nmais il y a souvent des exceptions."
        }
      },
      {
        "si": "entreprise . catégorie juridique . SARL . unipersonnelle",
        "alors": {
          "texte": "Par défaut, ce type d'entreprise est imposée à l'**impôt sur le revenu** (IR),\nmais il y a souvent des exceptions."
        }
      }
    ]
  },
  "DRI . accompagnement imposition . type . exceptions": {
    "variations": [
      {
        "si": "entreprise . catégorie juridique . EI",
        "alors": {
          "texte": "Par défaut les entreprises individuelles sont imposées à l'impôt sur le revenu. Cependant,\nvotre entreprise peut être imposée à l'**impôt sur les société** si :\n- c'est une **entreprise individuelle à responsabilité limitée** (EIRL),\n- une demande a été faite aux impôts pour choisir **l'option pour l'impôt sur les société**\n\nCette option a pu être choisie pour vous permettre de vous verser des dividendes par exemple.\n\n{{ textes . comptable }}\n\n[En savoir plus](https://entreprendre.service-public.fr/vosdroits/F36380)"
        }
      },
      {
        "si": "entreprise . catégorie juridique . SARL . unipersonnelle",
        "alors": {
          "texte": "Par défaut les EURL sont imposées à l'impôt sur le revenu.\n\nVotre entreprise est imposée à l'**impôt sur les sociétés** (IS) si **une demande a été envoyée aux impôts**\npour choisir l'impôt sur les sociétés. Cette demande a pu avoir lieu lors de la création ou après.\n\n> Il est assez fréquent que les EURL choisissent l'option de l'impôt sur les sociétés. Ce choix permet\nde se verser des dividendes par exemple.\n\n{{ textes . comptable }}"
        }
      }
    ]
  },
  "DRI . accompagnement imposition . bénéfice": {
    "texte": "L'activité principale de votre entreprise est\n« **{{ entreprise . activité }}** ».\n{{situation}}"
  },
  "DRI . accompagnement imposition . bénéfice . situation": {
    "variations": [
      {
        "si": {
          "toutes ces conditions": [
            "entreprise . imposition . IR . type de bénéfices . BIC et BNC possibles",
            "entreprise . imposition . IR . type de bénéfices . BNC"
          ]
        },
        "alors": {
          "texte": "En général les **bénéfices** de cette activité sont de type **non commerciaux** (BNC), mais il peut y avoir des exceptions."
        }
      },
      {
        "si": {
          "toutes ces conditions": [
            "entreprise . imposition . IR . type de bénéfices . BIC et BNC possibles",
            "entreprise . imposition . IR . type de bénéfices . BIC"
          ]
        },
        "alors": {
          "texte": "Dans le cas de votre entreprise, les bénéfices sont de type **industriel et commerciaux** (BIC)."
        }
      },
      {
        "si": "entreprise . imposition . IR . type de bénéfices . BIC",
        "alors": {
          "texte": "Les **bénéfices** de ce type d'activité sont de type **industriel et commerciaux** (BIC)"
        }
      },
      {
        "si": "entreprise . imposition . IR . type de bénéfices . BNC",
        "alors": {
          "texte": "Les **bénéfices** de cette activité sont de type **non commerciaux** (BNC)"
        }
      }
    ]
  },
  "DRI . accompagnement imposition . bénéfice . explications": {
    "texte": "La déclaration de revenus contient **trois sections principales** pour déclarer les\nbénéfices de votre activité :\n\n- les bénéfices de type **industriels et commerciaux** (BIC)\n- les bénéfices de type **non commerciaux** (BNC)\n- les bénéfices de type **agricoles** (BA)\n\nDans votre cas, vous **remplirez la section {{ entreprise . imposition . IR . type de bénéfices}}**\npour déclarer les bénéfices (ou déficits) de votre entreprise.\n\nÀ noter : le type de bénéfice peut changer la façon dont l'expert-comptable gére l'entreprise et le type de formulaire à remplir pour faire la déclaration de résultats de l'entreprise."
  },
  "DRI . accompagnement imposition . bénéfice . exceptions": {
    "applicable si": "entreprise . imposition . IR . type de bénéfices . BIC et BNC possibles",
    "texte": "Les bénéfices de votre activité peuvent être de type **industriels et commerciaux** (BIC) si :\n- la majeure partie de votre activité consiste en la **vente de bien**,\n- ou vous créez dans le but de **reproduire et vendre** votre création (par exemple, un photographe d'illustration qui prend des photos pour le compte de clients).\n\n{{ textes . comptable }}"
  },
  "DRI . accompagnement imposition . régime memento fiscal": {
    "question": "Dans la section « **vos obligations fiscales** »,\nquel est le « **régime d'imposition** » inscrit sur la première ligne ?",
    "une possibilité": {
      "choix obligatoire": "oui",
      "possibilités": [
        "RSI",
        "RN",
        "DECC",
        "SPECIAL",
        "MICROE"
      ]
    }
  },
  "DRI . accompagnement imposition . régime memento fiscal . RSI": {
    "non applicable si": "entreprise . imposition . IR . type de bénéfices . BNC",
    "titre": "RSI - Réel simplifié d'imposition",
    "valeur": "régime memento fiscal = 'RSI'",
    "remplace": {
      "règle": "entreprise . imposition . régime",
      "par": "'réel simplifié'"
    }
  },
  "DRI . accompagnement imposition . régime memento fiscal . RN": {
    "non applicable si": "entreprise . imposition . IR . type de bénéfices . BNC",
    "titre": "RN - Réel normal",
    "valeur": "régime memento fiscal = 'RN'",
    "remplace": {
      "règle": "entreprise . imposition . régime",
      "par": "'réel normal'"
    }
  },
  "DRI . accompagnement imposition . régime memento fiscal . DECC": {
    "applicable si": "entreprise . imposition . IR . type de bénéfices . BNC",
    "titre": "DECC - Régime de la déclaration contrôlée",
    "valeur": "régime memento fiscal = 'DECC'",
    "remplace": {
      "règle": "entreprise . imposition . régime",
      "par": "'déclaration contrôlée'"
    }
  },
  "DRI . accompagnement imposition . régime memento fiscal . SPECIAL": {
    "applicable si": "entreprise . imposition . IR . type de bénéfices . BNC",
    "titre": "SPECIAL - Régime spécial des bénéfices non commerciaux",
    "description": "Le régime spécial correspond au **régime de la micro-entreprise** pour les bénéfices de type non commerciaux (BNC)",
    "valeur": "régime memento fiscal = 'SPECIAL'",
    "remplace": {
      "règle": "entreprise . imposition . régime",
      "par": "'micro-entreprise'"
    }
  },
  "DRI . accompagnement imposition . régime memento fiscal . MICROE": {
    "non applicable si": "entreprise . imposition . IR . type de bénéfices . BNC",
    "titre": "MICROE - Régime des micro-entreprises",
    "valeur": "régime memento fiscal = 'MICROE'",
    "remplace": {
      "règle": "entreprise . imposition . régime",
      "par": "'micro-entreprise'"
    }
  },
  "DRI . accompagnement imposition . régime": {
    "applicable si": {
      "une de ces conditions": [
        "entreprise . imposition . régime . réel normal",
        "entreprise . imposition . régime . réel simplifié",
        "entreprise . imposition . régime . déclaration contrôlée",
        "entreprise . imposition . régime . micro-entreprise"
      ]
    },
    "variations": [
      {
        "si": "entreprise . imposition . régime . réel normal",
        "alors": {
          "texte": "Votre entreprise est imposée au **régime réel normal** (RN)."
        }
      },
      {
        "si": "entreprise . imposition . régime . réel simplifié",
        "alors": {
          "texte": "Votre entreprise est imposée au **régime réel simplifié** (RSI)."
        }
      },
      {
        "si": "entreprise . imposition . régime . déclaration contrôlée",
        "alors": {
          "texte": "Votre entreprise est imposée au **régime de la déclaration contrôlée**."
        }
      },
      {
        "si": "entreprise . imposition . régime . micro-entreprise",
        "alors": {
          "texte": "Votre entreprise est imposée au régime de la **micro-entreprise**."
        }
      }
    ]
  },
  "DRI . accompagnement imposition . explications": {
    "texte": "Votre régime d'imposition change le niveau de détail demandé lors du remplissage des obligations\ncomptables.\n\n{{ situation }}"
  },
  "DRI . accompagnement imposition . explications . situation": {
    "variations": [
      {
        "si": "entreprise . imposition . régime . micro-entreprise",
        "alors": {
          "texte": "Avec le régime de la micro-entreprise, vous n'avez pas à détailler les dépenses de votre entreprise. Le bénéfice imposable est calculé en prenant un **pourcentage du chiffre d'affaires**.\nC'est ce qu'on appelle l'**abattement forfaitaire**."
        }
      },
      {
        "si": "entreprise . imposition . régime . réel normal",
        "alors": {
          "texte": "Avec le régime réel normal, vous aurez à fournir un bilan comptable complet, qu'il vous faudra déclarer avec un logiciel comptable spécifique (vous ne pourrez pas déclarer le résultat de l'entreprise directement sur impot.gouv.fr)\n\nIl est donc très fortement conseillé d'faire appel à un expert-comptable."
        }
      },
      {
        "si": "entreprise . imposition . régime . réel simplifié",
        "alors": {
          "texte": "Avec le régime réel simplifié, vous devez déposer un bilan comptable simplifié. Il est donc conseillé d'faire appel à un expert-comptable."
        }
      },
      {
        "si": "entreprise . imposition . régime . déclaration contrôlée",
        "alors": {
          "texte": "Avec le régime de la déclaration contrôlée, vous devez tenir une comptabilité complète, et établir les comptes annuels en fin d'année. Il est donc conseillé d'faire appel à un expert-comptable."
        }
      }
    ]
  },
  "DRI . imposition cas exclus": {
    "applicable si": {
      "une de ces conditions": [
        "entreprise . imposition . régime . réel normal",
        "entreprise . imposition . régime . micro-entreprise"
      ]
    },
    "texte": "#### Nous ne proposons pas encore d'aide à la déclaration de revenu pour le régime {{ entreprise . imposition . régime }}\n\n{{ textes . désolé }}"
  },
  "DRI . liasse": {
    "applicable si": {
      "une de ces conditions": [
        "réel simplifié",
        "réel normal",
        "déclaration contrôlée"
      ]
    }
  },
  "DRI . liasse . réel simplifié": {
    "valeur": "entreprise . imposition . régime . réel simplifié",
    "title": "Liasse fiscale du régime réel simplifié",
    "meta": {
      "formulaire": "Formulaire 2033-SD"
    }
  },
  "DRI . liasse . réel simplifié . Déductions": {
    "applicable si": "entreprise . imposition . IR",
    "meta": {
      "section": "oui"
    }
  },
  "DRI . liasse . réel simplifié . c342": {
    "unité": "€",
    "applicable si": "entreprise . imposition . IR",
    "titre": "342",
    "résumé": "Déductions"
  },
  "DRI . liasse . réel simplifié . résultat": {
    "applicable si": "entreprise . imposition . IR",
    "titre": "Résultat fiscal après imputation des déficits",
    "meta": {
      "section": "oui"
    }
  },
  "DRI . liasse . réel simplifié . bénéfice ou déficit": {
    "applicable si": "entreprise . imposition . IR",
    "question": "Votre entreprise est-elle en bénéfice (case 370) ou en déficit (case 372) ?",
    "par défaut": "'bénéfice'",
    "une possibilité": {
      "choix obligatoire": "oui",
      "possibilités": [
        "bénéfice",
        "déficit"
      ]
    },
    "meta": {
      "affichage": "toggle"
    }
  },
  "DRI . liasse . réel simplifié . bénéfice ou déficit . bénéfice": {
    "valeur": "bénéfice ou déficit = 'bénéfice'",
    "meta": {
      "affichage": "non"
    }
  },
  "DRI . liasse . réel simplifié . bénéfice ou déficit . déficit": {
    "valeur": "bénéfice ou déficit = 'déficit'",
    "meta": {
      "affichage": "non"
    }
  },
  "DRI . liasse . réel simplifié . c370": {
    "unité": "€",
    "titre": "370",
    "résumé": "Bénéfice",
    "applicable si": "DRI . liasse . réel simplifié . bénéfice ou déficit . bénéfice",
    "meta": {
      "requis": "oui"
    }
  },
  "DRI . liasse . réel simplifié . c372": {
    "unité": "€",
    "titre": "372",
    "résumé": "Déficit",
    "applicable si": "DRI . liasse . réel simplifié . bénéfice ou déficit . déficit",
    "meta": {
      "requis": "oui"
    }
  },
  "DRI . liasse . réel simplifié . Divers": {
    "meta": {
      "section": "oui"
    }
  },
  "DRI . liasse . réel simplifié . c381": {
    "unité": "€",
    "titre": "381",
    "résumé": "Primes et cotisations complémentaires facultatives"
  },
  "DRI . liasse . réel simplifié . c326": {
    "titre": "326",
    "unité": "€",
    "résumé": "dont montant déductible des cotisations sociales obligatoires",
    "meta": {
      "requis": "oui"
    }
  },
  "DRI . liasse . réel simplifié . plus-values et moins-values": {
    "applicable si": "entreprise . imposition . IR",
    "meta": {
      "section": "oui"
    }
  },
  "DRI . liasse . réel simplifié . c596": {
    "applicable si": "entreprise . imposition . IR",
    "titre": "596",
    "unité": "€",
    "par défaut": "0€",
    "résumé": "Court terme"
  },
  "DRI . liasse . réel normal": {
    "valeur": "entreprise . imposition . régime . réel normal",
    "title": "Liasse fiscale du régime réel normal",
    "meta": {
      "formulaire": "Formulaire 2052-SD et 2053-SD"
    }
  },
  "DRI . liasse . déclaration contrôlée": {
    "valeur": "entreprise . imposition . régime . déclaration contrôlée",
    "title": "Déclaration contrôlée",
    "meta": {
      "formulaire": "Formulaire 2035-SD"
    }
  },
  "DRI . liasse . déclaration contrôlée . impôts et taxe": {
    "meta": {
      "section": "oui"
    }
  },
  "DRI . liasse . déclaration contrôlée . charges sociales personnelles": {
    "meta": {
      "section": "oui"
    }
  },
  "DRI . liasse . déclaration contrôlée . BT": {
    "résumé": "dont obligatoires",
    "unité": "€",
    "meta": {
      "requis": "oui"
    }
  },
  "DRI . liasse . déclaration contrôlée . BZ": {
    "résumé": "dont cotisations facultatives Madelin",
    "unité": "€"
  },
  "DRI . liasse . déclaration contrôlée . BU": {
    "résumé": "dont facultatives aux nouveaux plans d'épargne retraite",
    "unité": "€"
  },
  "DRI . liasse . déclaration contrôlée . excedents": {
    "meta": {
      "section": "oui"
    }
  },
  "DRI . liasse . déclaration contrôlée . CB": {
    "résumé": "Plus-value à court terme",
    "unité": "€"
  },
  "DRI . liasse . déclaration contrôlée . CE": {
    "résumé": "Total",
    "unité": "€",
    "meta": {
      "requis": "oui"
    }
  },
  "DRI . liasse . déclaration contrôlée . insuffisance": {
    "meta": {
      "section": "oui"
    }
  },
  "DRI . liasse . déclaration contrôlée . CK": {
    "résumé": "Moins-value à court terme",
    "unité": "€"
  },
  "DRI . liasse . déclaration contrôlée . divers à déduire": {
    "meta": {
      "section": "oui"
    }
  },
  "DRI . liasse . déclaration contrôlée . CS": {
    "résumé": "dont exonération sur le bénéfice « zone franche urbaine entrepreneur »",
    "unité": "€"
  },
  "DRI . liasse . déclaration contrôlée . CT": {
    "résumé": "dont l'abondement sur l'épargne salariale",
    "unité": "€"
  },
  "DRI . liasse . déclaration contrôlée . AW": {
    "unité": "€",
    "résumé": "dont exonération sur le bénéfice « entreprise nouvelle »"
  },
  "DRI . liasse . déclaration contrôlée . CO": {
    "unité": "€",
    "résumé": "dont exonération sur le bénéfice « jeunes artistes »"
  },
  "DRI . liasse . déclaration contrôlée . CU": {
    "résumé": "dont exonération sur le bénéfice « jeunes entreprise innovantes »",
    "unité": "€"
  },
  "DRI . liasse . déclaration contrôlée . CQ": {
    "résumé": "dont déduction « médecin conventionnés de secteur 1 »",
    "unité": "€"
  },
  "DRI . liasse . déclaration contrôlée . CI": {
    "résumé": "dont exonération médecin « zones déficitaires en offre de soin »",
    "unité": "€"
  },
  "DRI . liasse . déclaration contrôlée . CJ": {
    "résumé": "dont aides Fonds de solidarité Covid",
    "unité": "€"
  },
  "DRI . liasse . déclaration contrôlée . CN": {
    "unité": "€",
    "résumé": "Total",
    "meta": {
      "requis": "oui"
    }
  },
  "DRI . informations complémentaires": "oui",
  "DRI . informations complémentaires . OGA": {
    "titre": "Adhérent OGA",
    "applicable si": "entreprise . imposition . IR",
    "question": "Êtes-vous adhérant à un Organisme de Gestion Agrée (OGA) ?",
    "par défaut": "oui",
    "description": "Un organisme de gestion agréé a pour mission d’apporter une assistance à ses adhérents en matière de gestion, comptabilité et fiscalité.\n\nSi vous faites le choix d’adhérer à un organisme de gestion agréé, vous pourrez bénéficier d’aides et de conseils dans l’accomplissement de vos obligations administratives, notamment fiscales.\n\nAdhérer à un organisme de gestion agréé permet de bénéficier d'une **absence de majoration** des bénéfices pour le calcul de l'impôt sur le revenu.",
    "références": {
      "economie.gouv.fr": "https://www.economie.gouv.fr/entreprises/organisme-gestion-agree"
    }
  },
  "DRI . informations complémentaires . rémunération dirigeant": {
    "applicable si": "entreprise . imposition . IS",
    "question": {
      "texte": "Quelle a été votre **rémunération** en tant que dirigeant de l'entreprise **{{ entreprise . nom }}** en 2021 ?"
    },
    "description": "Cela correspond à la rémunération totale qui a été versée sur votre compte bancaire personnel pour cette activité. Elle sera à reporter dans la section « Traitement et salaire » de votre déclaration de revenu.\n\nSi vous ne la connaissez pas, vous pouvez vous renseigner auprès de votre expert-comptable.",
    "unité": "€"
  },
  "DRI . déclaration revenus manuelle": {
    "par défaut": "non",
    "meta": {
      "affichage": "non"
    }
  },
  "DRI . déclarant": {
    "non applicable si": "DRI . déclaration revenus manuelle",
    "question": "Quelle est la personne concernée ?",
    "une possibilité": {
      "choix obligatoire": "oui",
      "possibilités": [
        "déclarant 1",
        "déclarant 2"
      ]
    },
    "par défaut": "'déclarant 1'",
    "meta": {
      "section": "oui",
      "affichage": "toggle"
    }
  },
  "DRI . déclarant . déclarant 1": {
    "valeur": "déclarant = 'déclarant 1'"
  },
  "DRI . déclarant . déclarant 2": {
    "valeur": "déclarant = 'déclarant 2'"
  },
  "DRI . déclaration revenus": {
    "meta": {
      "affichage": "non"
    }
  },
  "DRI . déclaration revenus . traitements et salaire": {
    "applicable si": "entreprise . imposition . IS",
    "meta": {
      "section": "oui"
    }
  },
  "DRI . déclaration revenus . traitements et salaire . revenus des associés et gérants": {
    "meta": {
      "cases": [
        "1GB",
        "1HB"
      ],
      "requis": "oui"
    },
    "unité": "",
    "valeur": "informations complémentaires . rémunération dirigeant"
  },
  "DRI . déclaration revenus . BNC": {
    "applicable si": "entreprise . imposition . IR . type de bénéfices . BNC",
    "titre": "Revenus non commerciaux professionnels",
    "meta": {
      "section": "oui"
    }
  },
  "DRI . déclaration revenus . BNC . durée de l'exercice": {
    "applicable si": "entreprise . durée d'activité . en fin d'année < 1 an",
    "meta": {
      "cases": [
        "5XI",
        "5YI"
      ]
    },
    "valeur": {
      "valeur": "entreprise . durée d'activité . en fin d'année",
      "unité": "mois",
      "arrondi": "oui"
    },
    "unité": ""
  },
  "DRI . déclaration revenus . BNC . régime de la déclaration contrôlée": {
    "applicable si": "entreprise . imposition . régime . déclaration contrôlée",
    "meta": {
      "section": "oui"
    }
  },
  "DRI . déclaration revenus . BNC . revenus exonérés": {
    "note": "régimes zonés article 1417, IV, b du code général des impôts",
    "meta": {
      "requis": "oui",
      "cases": {
        "défaut": [
          "5QB",
          "5RB"
        ],
        "sans OGA": [
          "5QH",
          "5RH"
        ]
      }
    },
    "applicable si": {
      "une de ces conditions": [
        "déclaration revenus manuelle",
        "valeur > 0"
      ]
    },
    "valeur": {
      "nom": "valeur",
      "meta": {
        "affichage": "non"
      },
      "somme": [
        {
          "valeur": "liasse . déclaration contrôlée . CS",
          "par défaut": 0
        },
        {
          "valeur": "liasse . déclaration contrôlée . AW",
          "par défaut": 0
        },
        {
          "valeur": "liasse . déclaration contrôlée . CU",
          "par défaut": 0
        },
        {
          "valeur": "liasse . déclaration contrôlée . CI",
          "par défaut": 0
        },
        {
          "valeur": "liasse . déclaration contrôlée . CT",
          "par défaut": 0
        },
        {
          "valeur": "liasse . déclaration contrôlée . CO",
          "par défaut": 0
        },
        {
          "valeur": "liasse . déclaration contrôlée . CQ",
          "par défaut": 0
        },
        {
          "valeur": "liasse . déclaration contrôlée . CJ",
          "par défaut": 0
        }
      ],
      "unité": ""
    }
  },
  "DRI . déclaration revenus . BNC . revenus imposables": {
    "note": "cas général",
    "meta": {
      "requis": "oui",
      "cases": {
        "défaut": [
          "5QC",
          "5RC"
        ],
        "sans OGA": [
          "5QI",
          "5RI"
        ]
      }
    },
    "valeur": "liasse . déclaration contrôlée . CE",
    "abattement": "liasse . déclaration contrôlée . CN",
    "unité": ""
  },
  "DRI . déclaration revenus . BNC . plus-values": {
    "titre": " ",
    "note": "dont plus-values à court terme, subventions d’équipement, indemnités d’assurance pour perte d’élément d’actif",
    "meta": {
      "cases": {
        "défaut": [
          "5XP",
          "5YP"
        ],
        "sans OGA": [
          "5XQ",
          "5YQ"
        ]
      },
      "requis": "oui"
    },
    "valeur": "DRI . liasse . déclaration contrôlée . CB",
    "unité": ""
  },
  "DRI . déclaration revenus . BNC . moins-values": {
    "titre": "",
    "note": "dont moins-values à court terme",
    "meta": {
      "cases": {
        "défaut": [
          "5XH",
          "5YH"
        ],
        "sans OGA": [
          "5XL",
          "5YL"
        ]
      },
      "requis": "oui"
    },
    "valeur": "DRI . liasse . déclaration contrôlée . CK",
    "unité": ""
  },
  "DRI . déclaration revenus . BNC . déficits": {
    "applicable si": {
      "une de ces conditions": [
        "déclaration revenus manuelle",
        "liasse . déclaration contrôlée . CE < liasse . déclaration contrôlée . CN"
      ]
    },
    "note": "y compris inventeurs non professionnels",
    "meta": {
      "cases": {
        "défaut": [
          "5QE",
          "5RE"
        ],
        "sans OGA": [
          "5QK",
          "5RK"
        ]
      },
      "requis": "oui"
    },
    "valeur": {
      "valeur": "liasse . déclaration contrôlée . CN",
      "par défaut": 0,
      "abattement": "liasse . déclaration contrôlée . CE"
    },
    "unité": ""
  },
  "DRI . déclaration revenus . BNC . jeunes créateurs": {
    "titre": "Jeunes créateurs : abattement de 50 %",
    "valeur": "DRI . liasse . déclaration contrôlée . CO",
    "unité": "",
    "meta": {
      "cases": [
        "5QL",
        "5RL"
      ]
    }
  },
  "DRI . déclaration revenus . BIC": {
    "applicable si": "entreprise . imposition . IR . type de bénéfices . BIC",
    "titre": "Revenus industriels et commerciaux professionnels",
    "résumé": "Y compris locations meublées professionnelles",
    "meta": {
      "section": "oui"
    }
  },
  "DRI . déclaration revenus . BIC . durée de l'exercice": {
    "applicable si": "entreprise . durée d'activité . en fin d'année < 1 an",
    "meta": {
      "cases": [
        "5DB",
        "5EB"
      ]
    },
    "valeur": {
      "valeur": "entreprise . durée d'activité . en fin d'année",
      "unité": "mois",
      "arrondi": "oui"
    },
    "unité": ""
  },
  "DRI . déclaration revenus . BIC . Régime du bénéfice réel": {
    "non applicable si": "entreprise . imposition . régime . micro-entreprise",
    "meta": {
      "section": "oui",
      "requis": "oui"
    }
  },
  "DRI . déclaration revenus . BIC . revenus exonérés": {
    "note": "régimes zonés article 1417, IV, b du code général des impôts",
    "meta": {
      "requis": "oui",
      "cases": {
        "défaut": [
          "5KB",
          "5LB"
        ],
        "sans OGA": [
          "5KH",
          "5LH"
        ]
      }
    },
    "applicable si": {
      "une de ces conditions": [
        "déclaration revenus manuelle",
        "valeur > 0"
      ]
    },
    "valeur": {
      "nom": "valeur",
      "meta": {
        "affichage": "non",
        "requis": "oui"
      },
      "valeur": "liasse . réel simplifié . c342",
      "unité": ""
    }
  },
  "DRI . déclaration revenus . BIC . revenus imposables": {
    "note": "cas général",
    "meta": {
      "requis": "oui",
      "cases": {
        "défaut": [
          "5KC",
          "5LC"
        ],
        "sans OGA": [
          "5KI",
          "5LI"
        ]
      }
    },
    "valeur": "liasse . réel simplifié . c370",
    "unité": ""
  },
  "DRI . déclaration revenus . BIC . plus-values": {
    "applicable si": {
      "une de ces conditions": [
        "déclaration revenus manuelle",
        "liasse . réel simplifié . c596 >= 0"
      ]
    },
    "titre": " ",
    "note": "dont plus-values à court terme, subventions d’équipement, indemnités d’assurance pour perte d’élément d’actif",
    "meta": {
      "requis": "oui",
      "cases": {
        "défaut": [
          "5DK",
          "5EK"
        ],
        "sans OGA": [
          "5DL",
          "5EL"
        ]
      }
    },
    "valeur": "liasse . réel simplifié . c596",
    "unité": ""
  },
  "DRI . déclaration revenus . BIC . moins-values": {
    "applicable si": {
      "une de ces conditions": [
        "déclaration revenus manuelle",
        "liasse . réel simplifié . c596 < 0"
      ]
    },
    "titre": "",
    "note": "dont moins-values à court terme",
    "meta": {
      "requis": "oui",
      "cases": {
        "défaut": [
          "5DM",
          "5EM"
        ],
        "sans OGA": [
          "5DN",
          "5EN"
        ]
      }
    },
    "valeur": "liasse . réel simplifié . c596",
    "unité": ""
  },
  "DRI . déclaration revenus . BIC . déficits": {
    "meta": {
      "requis": "oui",
      "cases": {
        "défaut": [
          "5KF",
          "5LF"
        ],
        "sans OGA": [
          "5KL",
          "5LL"
        ]
      }
    },
    "valeur": "liasse . réel simplifié . c372",
    "unité": ""
  },
  "DRI . déclaration revenus . indépendant": {
    "titre": "Données complémentaires de la déclaration de revenu des indépendants",
    "meta": {
      "section": "oui"
    }
  },
  "DRI . déclaration revenus . indépendant . cotisations sociales": {
    "unité": "",
    "meta": {
      "requis": "oui",
      "cases": [
        "DSCA",
        "DSCB"
      ]
    },
    "somme": [
      "DRI . liasse . déclaration contrôlée . BT",
      "DRI . liasse . réel simplifié . c326"
    ]
  },
  "DRI . déclaration revenus . indépendant . cotisations facultatives": {
    "meta": {
      "requis": "oui",
      "cases": [
        "DSEA",
        "DSEB"
      ]
    },
    "applicable si": {
      "une de ces conditions": [
        "déclaration revenus manuelle",
        "valeur > 0"
      ]
    },
    "valeur": {
      "meta": {
        "affichage": "non"
      },
      "nom": "valeur",
      "unité": "",
      "somme": [
        {
          "valeur": "DRI . liasse . déclaration contrôlée . BZ",
          "par défaut": 0
        },
        {
          "valeur": "DRI . liasse . déclaration contrôlée . BU",
          "par défaut": 0
        },
        {
          "valeur": "DRI . liasse . réel simplifié . c381",
          "par défaut": 0
        }
      ]
    }
  },
  "DRI . cotisations": {
    "valeur": "dirigeant . indépendant . cotisations et contributions + cotisations . régularisation",
    "unité": "€"
  },
  "DRI . cotisations . assiette des cotisations": {
    "unité": "€/an",
    "rend non applicable": [
      "entreprise . résultat fiscal"
    ],
    "remplace": "dirigeant . indépendant . assiette des cotisations",
    "somme": [
      "déclaration revenus . BNC . revenus imposables",
      {
        "valeur": "déclaration revenus . BNC . plus-values",
        "par défaut": 0
      },
      {
        "valeur": "déclaration revenus . BNC . revenus exonérés",
        "par défaut": 0
      },
      "déclaration revenus . BIC . revenus imposables",
      {
        "valeur": "déclaration revenus . BIC . plus-values",
        "par défaut": 0
      },
      {
        "valeur": "déclaration revenus . BIC . revenus exonérés",
        "par défaut": 0
      },
      "informations complémentaires . rémunération dirigeant",
      {
        "valeur": "déclaration revenus . indépendant . cotisations facultatives",
        "par défaut": 0
      }
    ],
    "abattement": {
      "somme": [
        {
          "valeur": "déclaration revenus . BNC . moins-values",
          "par défaut": 0
        },
        {
          "valeur": "déclaration revenus . BNC . déficits",
          "par défaut": 0
        }
      ]
    }
  },
  "DRI . cotisations . assiette CSG": {
    "remplace": "dirigeant . indépendant . cotisations et contributions . CSG-CRDS . assiette",
    "somme": [
      "assiette des cotisations",
      "déclaration revenus . indépendant . cotisations sociales"
    ]
  },
  "DRI . cotisations . provisionnelles": {
    "titre": "Vos cotisations provisionnelles estimées",
    "description": "En 2022, vous allez payer chaque mois une **avance sur le montant des cotisations** à payer. C'est ce que l'on appelle les **cotisations provisionnelles**. Elles sont calculées à partir de votre revenu de 2021 (déclaré en 2022).\n\nCes cotisations seront **régularisées en 2023**, une fois que l'Urssaf connaîtra votre revenu réel de 2022.\n\n[En savoir plus](https://www.urssaf.fr/portail/home/independant/mes-cotisations/les-etapes-de-calcul/le-mode-de-calcul/les-cotisations-provisionnelles.html)"
  },
  "DRI . cotisations . régularisation": {
    "titre": "Votre régularisation estimée",
    "valeur": "cotisations . dûes en 2021\n- cotisations . appelées en 2021",
    "description": "C'est la différence entre les cotisations provisionnelles payées\nen 2021 et le montant que vous deviez effectivement payer.\n\nCe dernier est calculé à partir de votre revenu de 2021 (déclaré\nen 2022).\n\n[En savoir plus](https://www.urssaf.fr/portail/home/independant/mes-cotisations/les-etapes-de-calcul/le-mode-de-calcul/lajustement-et-la-regularisation.html)"
  },
  "DRI . cotisations . dûes en 2021": {
    "titre": "Cotisations dûes en 2021",
    "unité": "€",
    "recalcul": {
      "règle": "dirigeant . indépendant . cotisations et contributions",
      "avec": {
        "dirigeant . indépendant . cotisations facultatives . montant": 0,
        "date": "01/01/2021"
      }
    }
  },
  "DRI . cotisations . appelées en 2021": {
    "titre": "Cotisations appelées en 2021",
    "description": "Vous pouvez retrouver le montant total des cotisations appelées en 2021 depuis votre espace personnel Urssaf. Voici la marche à suivre :\n\n1. Connectez-vous sur [votre espace personnel urssaf.fr](https://www.urssaf.fr/portail/home/connectez-vous.html)\n2. Dans le menu « Mes services en ligne », cliquez sur **« Mes cotisations »**\n3. Dans le menu de navigation de gauche, cliquez sur **« Cotisations annuelles »**\n4. Selectionnez **l'année 2021**\n5. Le montant total des cotisations appelées sur l'année 2021 est affichée sur la dernière ligne **« Total »**",
    "question": "Quel est le montant des cotisations provisionnelles appelées en 2021 ?",
    "unité": "€"
  },
  "déclaration charge sociales": {
    "experimental": "oui",
    "description": "Ces règles calculent les montants des charges sociales à reporter dans la déclaration de revenu des indépendants et dans les déclaration de résultats.",
    "formule": "non",
    "remplace": [
      {
        "règle": "dirigeant . exonérations . ACRE",
        "par": "ACRE"
      },
      {
        "règle": "entreprise . activité . mixte",
        "par": "oui"
      }
    ]
  },
  "déclaration charge sociales . comptabilité": {
    "titre": "régime de la déclaration contrôlée",
    "non applicable si": "entreprise . imposition . IS",
    "question": "Quelle méthode de gestion de la comptabilité est utilisée pour l'entreprise ?",
    "une possibilité": {
      "choix obligatoire": "oui",
      "possibilités": [
        "engagement",
        "trésorerie"
      ]
    }
  },
  "déclaration charge sociales . comptabilité . trésorerie": {
    "valeur": "comptabilité = 'trésorerie'",
    "titre": "comptabilité de trésorerie"
  },
  "déclaration charge sociales . comptabilité . engagement": {
    "valeur": "comptabilité = 'engagement'",
    "titre": "comptabilité d'engagement"
  },
  "déclaration charge sociales . cotisations payées": {
    "applicable si": {
      "une de ces conditions": [
        "comptabilité . trésorerie",
        "entreprise . imposition . IS"
      ]
    },
    "valeur": "oui",
    "remplace": [
      {
        "règle": "résultat . cotisations obligatoires",
        "par": "cotisations payées . cotisations sociales"
      },
      {
        "règle": "résultat . total charges sociales déductible",
        "par": {
          "somme": [
            "cotisations payées . cotisations sociales",
            "cotisations payées . CSG déductible et CFP"
          ]
        }
      }
    ]
  },
  "déclaration charge sociales . cotisations payées . CSG déductible et CFP": {
    "question": "Quel est le montant total de CSG déductible et CFP payées cette année ?",
    "unité": "€/an",
    "plancher": "0 €/an",
    "description": "Indiquez le montant de la part de CSG déductible et de CFP que vous avez payé en 2021 (peu importe l’année à laquelle ces contributions se rapportent).\n"
  },
  "déclaration charge sociales . cotisations payées . cotisations sociales": {
    "question": "Quel est le montant de vos cotisations sociales payées cette année ?",
    "plancher": "0 €/an",
    "unité": "€/an",
    "description": "Indiquez le montant des cotisations sociales aux régimes obligatoires (maladie-maternité, vieillesse, invalidité-décès, famille) que vous avez payées en 2021 (peu importe l’année à laquelle ces cotisations se rapportent).\n"
  },
  "déclaration charge sociales . nature de l'activité": {
    "remplace": [
      "entreprise . activité . nature",
      {
        "règle": "entreprise . activité . nature . libérale",
        "par": "libérale"
      },
      {
        "règle": "entreprise . activité . nature . artisanale",
        "par": "artisanale"
      },
      {
        "règle": "entreprise . activité . nature . commerciale",
        "par": "commerciale"
      }
    ],
    "question": "Quelle est la nature de votre activité ?",
    "par défaut": "'artisanale'",
    "valeur": {
      "une possibilité": {
        "choix obligatoire": "oui",
        "possibilités": [
          "artisanale",
          "commerciale",
          "libérale"
        ]
      }
    },
    "références": {
      "Vérifier la nature de son activité": "https://bpifrance-creation.fr/encyclopedie/trouver-proteger-tester-son-idee/verifiertester-son-idee/verifier-nature-son-activite",
      "Comment déterminer la nature de l'activité d'une entreprise ?": "https://www.service-public.fr/professionnels-entreprises/vosdroits/F32887"
    }
  },
  "déclaration charge sociales . ACRE": {
    "description": "L'aide à la création ou à la reprise d'une entreprise (Acre) consiste en une exonération partielle de charges sociales, dite exonération de début d'activité pendant 12 mois.\n\nElle est automatique pour les sociétés et les entreprises individuelles (sous certaines conditions, comme par exemple ne pas en avoir bénéficié les trois dernières années).\n\nDe plus, pour les travailleurs indépendants classique il est nécessaire de respecter la condition d’être considéré comme créateur au sens de [l’article R131-3 du Code de Sécurité Sociale](https://www.legifrance.gouv.fr/affichCodeArticle.do?idArticle=LEGIARTI000034727582&cidTexte=LEGITEXT000006073189&dateTexte=20170511).\n\n### Détails\n\nCette exonération porte sur l’ensemble des cotisations à l’exception de la cotisation retraite complémentaire et les contributions CSG/CRDS et CFP.\n\nCette exonération peut être totale, partielle ou nulle en fonction des revenus déclarés :\n\n- Si le revenu est inférieur à 75% du PASS l’exonération est totale.\n- Si le revenu est compris entre 75% et 100% du PASS l’exonération est dégressive.\n- Si le revenu est supérieur à 100% du PASS l’exonération est nulle.",
    "question": "Votre entreprise bénéficie-t-elle de l'ACRE ?",
    "applicable si": "entreprise . durée d'activité . en début d'année <= 1 an",
    "par défaut": "non"
  },
  "déclaration charge sociales . nature de l'activité . libérale": {
    "rend non applicable": "dirigeant . indépendant . PL . CIPAV",
    "formule": "nature de l'activité = 'libérale'",
    "titre": "Libérale rattachée au régime général",
    "description": "Ce sont les professions \"intellectuelles\", qui ne sont rattachée à aucune\ncaisse spécifique de retraite.\n\nC'est le cas de toutes les professions libérale non réglementées depuis le\n1er janvier 2021.\n",
    "références": {
      "fiche Wikipedia": "https://fr.wikipedia.org/wiki/Profession_lib%C3%A9rale"
    }
  },
  "déclaration charge sociales . nature de l'activité . commerciale": {
    "formule": "nature de l'activité = 'commerciale'",
    "description": "- Achats de biens pour leur revente en l'état (commerce en gros ou de détail)\n- Vente de prestations de services commerciales (location de matériel, transport, agence immobilière, hôtellerie-restauration, entreprise de spectacles, activité de sécurité privée, location, etc.)\n- Activité de production ou de transformation grâce à l'utilisation d'outils industriels, extraction, industries minières, manutention, magasinage et stockage\n"
  },
  "déclaration charge sociales . nature de l'activité . artisanale": {
    "formule": "nature de l'activité = 'artisanale'",
    "description": "C'est une activité de service, de production, de transformation, ou de réparation exercée par un professionnel qualifié, et qui nécessite des compétences et un savoir-faire spécifiques.\n\n>  Par exemple : les travaux, les activités liées au bâtiment, la réparation de produits fournis par le client, les coiffeurs...\n\n- L'entreprise ne doit pas employer plus de 10 salariés (l'activité devient commerciale au-delà)\n- Les activités artisanales sont répertoriées par un décret\n",
    "références": {
      "liste des activités artisanales": "https://bpifrance-creation.fr/encyclopedie/trouver-proteger-tester-son-idee/verifiertester-son-idee/activites-artisanales-0"
    }
  },
  "déclaration charge sociales . cotisations obligatoires déductibles": {
    "description": "Cotisations obligatoires déductibles, utile pour calculer l'assiette de la CSG/CRDS",
    "somme": [
      "dirigeant . indépendant . cotisations et contributions . cotisations",
      "dirigeant . indépendant . conjoint collaborateur . cotisations"
    ]
  },
  "déclaration charge sociales . rémunération déductible": {
    "variations": [
      {
        "si": "entreprise . imposition . IS",
        "alors": "dirigeant . rémunération . net"
      },
      {
        "sinon": "0€"
      }
    ]
  },
  "déclaration charge sociales . résultat . revenu net fiscal": {
    "non applicable si": "entreprise . imposition . régime . micro-entreprise",
    "titre": "revenu net fiscal",
    "résumé": "[A]",
    "description": "Résultat avant déduction des charges sociales et exonérations fiscales",
    "valeur": "dirigeant . rémunération . totale"
  },
  "déclaration charge sociales . résultat . cotisations obligatoires": {
    "titre": "Cotisations sociales obligatoires déductibles",
    "résumé": "[C]",
    "description": "À reporter dans :\n- **la case DSCA/DSCB** dans le formulaire de donnée complémentaire à la déclaration de revenus des indépendant (formulaire 2042)\n- **régime réel simplifié :** la rubrique 326 du formulaire 2033-D-SD\n- **régime réel normal :** la rubrique A5 du formulaire 2053-SD\n- **déclaration contrôlée :** la rubrique BT du formulaire 2035-A-SD\n- **régime micro fiscal :** pas de liasse professionnelle fiscale à souscrire\n",
    "unité": "€/an",
    "somme": [
      "dirigeant . indépendant . cotisations et contributions . cotisations",
      "dirigeant . indépendant . conjoint collaborateur . cotisations"
    ],
    "références": {
      "Notice impots.gouv.fr": "https://www.impots.gouv.fr/portail/www2/fichiers/documentation/brochure/ir_2021/pdf_som/11-bis-decla_fusion_fisc_185a195.pdf"
    }
  },
  "déclaration charge sociales . résultat": "oui",
  "déclaration charge sociales . résultat . CSG déductible": {
    "non applicable si": "entreprise . imposition . régime . micro-entreprise",
    "titre": "CSG déductible",
    "résumé": "[B]",
    "description": "Montant de la CSG déductible à l'impôt sur le revenu",
    "valeur": "dirigeant . indépendant . cotisations et contributions . CSG-CRDS . déductible"
  },
  "déclaration charge sociales . résultat . CFP": {
    "non applicable si": "entreprise . imposition . régime . micro-entreprise",
    "résumé": "[D]",
    "description": "Contribution à la formation professionnelle",
    "valeur": "dirigeant . indépendant . cotisations et contributions . formation professionnelle"
  },
  "déclaration charge sociales . résultat . total charges sociales déductible": {
    "non applicable si": "entreprise . imposition . régime . micro-entreprise",
    "titre": "charges sociales obligatoires déductibles fiscalement",
    "résumé": "[B + C + D]",
    "somme": [
      "CSG déductible",
      "cotisations obligatoires",
      "CFP"
    ],
    "description": "À reporter dans :\n- **régime réel simplifié :** la rubrique 252 du formulaire 2033-B-SD\n- **régime réel normal :** la rubrique FZ du formulaire 2052-SD\n- **déclaration contrôlée :** la rubrique BK du formulaire 2035-A-SD\n- **régime micro fiscal :** pas de liasse professionnelle fiscale à souscrire\n"
  },
  "déclaration charge sociales . résultat . assiette sociale": {
    "non applicable si": "entreprise . imposition . régime . micro-entreprise",
    "résumé": "[A - (B + C + D)]",
    "description": "Assiette utilisée pour le calcul des cotisations sociales",
    "valeur": "dirigeant . indépendant . assiette des cotisations"
  },
  "dirigeant": "oui",
  "dirigeant . gérant minoritaire": {
    "experimental": "oui",
    "titre": "Gérant minoritaire ou égalitaire",
    "question": "Êtes-vous gérant minoritaire ou égalitaire de votre entreprise ?",
    "non applicable si": {
      "une de ces conditions": [
        "entreprise . catégorie juridique . EI",
        "entreprise . catégorie juridique . SARL . unipersonnelle",
        "entreprise . catégorie juridique . SAS . unipersonnelle"
      ]
    },
    "par défaut": "non"
  },
  "dirigeant . régime social": {
    "experimental": "oui",
    "non applicable si": {
      "une de ces conditions": [
        "entreprise . catégorie juridique . SELARL",
        "entreprise . catégorie juridique . SELAS",
        "entreprise . catégorie juridique . autre"
      ]
    },
    "par défaut": "non",
    "variations": [
      {
        "si": "entreprise . catégorie juridique . EI . auto-entrepreneur",
        "alors": "'auto-entrepreneur'"
      },
      {
        "si": {
          "une de ces conditions": [
            "entreprise . catégorie juridique . SAS",
            {
              "toutes ces conditions": [
                "entreprise . catégorie juridique . SARL",
                "gérant minoritaire"
              ]
            }
          ]
        },
        "alors": "'assimilé salarié'"
      },
      {
        "si": {
          "non applicable si": "gérant minoritaire",
          "une de ces conditions": [
            "entreprise . catégorie juridique . EI",
            "entreprise . catégorie juridique . SARL"
          ]
        },
        "alors": "'indépendant'"
      }
    ]
  },
  "dirigeant . rémunération": "oui",
  "dirigeant . rémunération . totale": {
    "titre": "Rémunération totale",
    "question": "Quel montant total pensez-vous dégager pour votre rémunération ?",
    "description": "C'est ce que l'entreprise dépense en tout pour la rémunération du dirigeant. Cette rémunération \"super-brute\" inclut toutes les cotisations sociales à payer. On peut aussi considérer que c'est la valeur monétaire du travail du dirigeant.\n",
    "titre global": "Rémunération totale dirigeant",
    "unité": "€/an",
    "résumé": "Incluant les cotisations et contributions",
    "variations": [
      {
        "si": "assimilé salarié",
        "alors": {
          "valeur": "salarié . coût total employeur",
          "abattement": "assimilé salarié . réduction ACRE . montant"
        }
      },
      {
        "si": "entreprise . imposition . IS",
        "alors": {
          "somme": [
            "net . après impôt",
            "impôt . montant",
            "cotisations"
          ],
          "par défaut": "entreprise . chiffre d'affaires - entreprise . charges",
          "plancher": "cotisations"
        }
      },
      {
        "sinon": "entreprise . chiffre d'affaires - entreprise . charges"
      }
    ]
  },
  "dirigeant . rémunération . net": {
    "unité": "€/an",
    "titre": "Rémunération nette",
    "question": "Quelle est votre rémunération nette ?",
    "résumé": "Après déduction des cotisations, contributions et charges",
    "somme": [
      "rémunération . totale",
      "(- cotisations)"
    ]
  },
  "dirigeant . rémunération . cotisations": {
    "variations": [
      {
        "si": "assimilé salarié",
        "alors": "assimilé salarié . cotisations"
      },
      {
        "si": "indépendant",
        "alors": "indépendant . cotisations et contributions"
      },
      {
        "si": "auto-entrepreneur",
        "alors": "auto-entrepreneur . cotisations et contributions"
      }
    ]
  },
  "dirigeant . rémunération . net . imposable": {
    "titre": "revenu imposable",
    "variations": [
      {
        "si": "assimilé salarié",
        "alors": "salarié . rémunération . net . imposable"
      },
      {
        "si": "indépendant",
        "alors": "indépendant . revenu professionnel"
      },
      {
        "si": "auto-entrepreneur",
        "alors": "auto-entrepreneur . impôt . revenu imposable"
      },
      {
        "sinon": "0 €/an"
      }
    ]
  },
  "dirigeant . rémunération . impôt": {
    "titre": "impôt sur le revenu",
    "somme": [
      {
        "produit": {
          "assiette": "net . imposable",
          "taux": "impôt . taux d'imposition"
        }
      },
      "auto-entrepreneur . impôt . versement libératoire . montant"
    ]
  },
  "dirigeant . rémunération . net . après impôt": {
    "titre": "Revenu après impôt",
    "question": "Quel est le revenu net après impôt souhaité ?",
    "description": "Le revenu net après déduction de l'impôt sur le revenu et des cotisations sociales.",
    "valeur": "rémunération . net - impôt . montant",
    "résumé": "Ce que vous rapporte cette activité"
  },
  "dirigeant . exonérations": null,
  "dirigeant . exonérations . ACRE": {
    "description": "L'aide à la création ou à la reprise d'une entreprise (Acre) consiste en une exonération partielle de charges sociales, dite exonération de début d'activité pendant 12 mois.\n\nElle est **automatique** pour les **sociétés et les entreprises individuelles** (sous certaines conditions, comme par exemple ne pas en avoir bénéficié les trois dernières années).\n\nPour les **auto-entrepreneurs** en revanche, elle doit être demandée et est réservée aux bénéficiaires suivants:\n- Les demandeurs d'emplois (indemnisés ou non indemnisés mais ayant au moins 6 mois d’inscription à Pôle Emploi au cours des 18 derniers mois).\n- Les bénéficiaires d'aides sociales (RSA, ASS, ATA)\n- Les jeunes entre 18 et 25 ans (jusqu'à 29 ans pour les personnes reconnues en situation de handicap)\n- Les personnes créant une micro-entreprise dans un quartier prioritaire de la ville (QPPV)\n\n> *Historique*:\n- Pour les auto-entreprise créées à partir du 1er janvier 2020, l'exonération est de nouveau soumise à condition.\n- Pour les entreprises créées entre le 1er janvier 2019 et le 31 décembre 2019, la réduction est généralisée à tous les créateurs, sauf si vous avez déjà obtenu l'ACCRE dans les trois années précédentes\n- Pour les entreprises créées avant le 1er janvier 2019, la l'exonération de cotisation s'appelait ACCRE était soumise à conditions et n'était pas automatique : il fallait en faire la demande.",
    "question": "Bénéficiez-vous de l'ACRE ?",
    "applicable si": {
      "une de ces conditions": [
        {
          "toutes ces conditions": [
            "auto-entrepreneur",
            "entreprise . durée d'activité < 3 ans",
            "entreprise . date de création < 04/2020"
          ]
        },
        "entreprise . durée d'activité . en début d'année < 1 an"
      ]
    },
    "par défaut": "ACRE par défaut",
    "avec": {
      "ACRE par défaut": {
        "privé": "oui",
        "toutes ces conditions": [
          "auto-entrepreneur",
          {
            "une de ces conditions": [
              "entreprise . date de création < 01/01/2019",
              "entreprise . date de création > 31/12/2019"
            ]
          }
        ]
      }
    },
    "références": {
      "Aide à la création ou à la reprise d'une entreprise": "https://www.service-public.fr/particuliers/vosdroits/F11677",
      "Indépendants : qui peut bénéficier de l'ACRE ?": "https://www.urssaf.fr/portail/home/independant/je-beneficie-dexonerations/accre/qui-peut-en-beneficier.html"
    }
  },
  "dirigeant . assimilé salarié": {
    "description": "Certains dirigeants d'entreprise (c'est notamment le cas pour les SASU) sont considérés par la sécurité sociale comme assimilés aux salariés. Ils sont alors au régime général de la sécurité sociale, avec quelques contraintes cependant. Par exemple, ils ne cotisent pas au chômage, et n'y ont donc pas droit.\n",
    "applicable si": "régime social = 'assimilé salarié'",
    "valeur": "oui",
    "remplace": [
      {
        "règle": "salarié",
        "par": "oui"
      },
      {
        "règle": "salarié . contrat",
        "par": "'CDI'"
      },
      {
        "règle": "salarié . contrat . statut cadre",
        "par": "oui"
      }
    ],
    "rend non applicable": [
      "salarié . rémunération . primes",
      "salarié . rémunération . frais professionnels",
      "salarié . rémunération . assiette de vérification du SMIC . contrôle",
      "salarié . activité partielle",
      "salarié . contrat . temps de travail . temps partiel",
      "salarié . temps de travail . heures supplémentaires",
      "salarié . cotisations . chômage",
      "salarié . cotisations . exonérations . lodeom",
      "salarié . cotisations . exonérations . réduction générale",
      "salarié . cotisations . AGS",
      "salarié . cotisations . APEC",
      "salarié . cotisations . contribution au dialogue social",
      "salarié . cotisations . allocations familiales . taux réduit",
      "salarié . cotisations . maladie . employeur . taux réduit",
      "salarié . convention collective",
      "salarié . régimes spécifiques . DFS",
      "salarié . régimes spécifiques . impatriés",
      "entreprise . association non lucrative"
    ],
    "références": {
      "Le régime des dirigeants": "https://www.urssaf.fr/portail/home/employeur/creer/choisir-une-forme-juridique/le-statut-du-dirigeant/les-dirigeants-assimiles-salarie.html"
    },
    "note": "Nous ne gérons pas le cas des SAS(U) à l'IR pour l'instant"
  },
  "dirigeant . assimilé salarié . cotisations": {
    "valeur": "salarié . cotisations",
    "abattement": "réduction ACRE . montant"
  },
  "dirigeant . assimilé salarié . réduction ACRE": {
    "experimental": "oui",
    "applicable si": "dirigeant . exonérations . ACRE",
    "non applicable si": "salarié . cotisations . assiette > 100% * plafond sécurité sociale",
    "avec": {
      "notification taux annuel": {
        "type": "notification",
        "description": "Le taux ACRE utilisé est une moyenne annuelle. Le\nsimulateur ne prend pas encore en compte le calcul de l'ACRE mois par mois.\n"
      }
    }
  },
  "dirigeant . assimilé salarié . réduction ACRE . montant": {
    "arrondi": "oui",
    "variations": [
      {
        "si": "salarié . cotisations . assiette <= 75% * plafond sécurité sociale",
        "alors": "cotisations exonérées"
      },
      {
        "sinon": {
          "produit": {
            "assiette": {
              "recalcul": {
                "règle": "cotisations exonérées",
                "avec": {
                  "dirigeant . exonérations . ACRE": "non",
                  "salarié . cotisations . assiette": "75% * plafond sécurité sociale"
                }
              }
            },
            "taux": "(plafond sécurité sociale - salarié . cotisations . assiette) / (25% * plafond sécurité sociale)"
          }
        }
      }
    ],
    "références": {
      "Comment calculer l'exonération ACRE ?": "https://www.urssaf.fr/portail/home/employeur/beneficier-dune-exoneration/exonerations-generales/laccre/quelles-exonerations-pour-2022.html",
      "Article D131-6-1 du code de la sécurité sociale": "https://www.legifrance.gouv.fr/codes/id/LEGIARTI000036475110/2018-01-01/#LEGIARTI000036475110"
    },
    "avec": {
      "cotisations exonérées": {
        "unité": "€/an",
        "privé": "oui",
        "somme": [
          "salarié . cotisations . maladie",
          "salarié . cotisations . allocations familiales",
          "salarié . cotisations . vieillesse"
        ],
        "arrondi": "oui"
      }
    }
  },
  "dirigeant . auto-entrepreneur": {
    "applicable si": "régime social = 'auto-entrepreneur'",
    "valeur": "oui",
    "icônes": "🚶",
    "description": "L'auto-entreprise est une entreprise individuelle simplifiée. À l'origine connu sous l'appellation « auto-entrepreneur », le régime de « micro-entrepreneur » est un régime de travailleur indépendant créé pour simplifier la gestion administrative, notamment en remplaçant toutes les cotisations sociales par un prélèvement unique mensuel.\n"
  },
  "dirigeant . auto-entrepreneur . revenu net": {
    "arrondi": "oui",
    "unité": "€/an",
    "identifiant court": "auto-entrepreneur-net",
    "résumé": "Avant impôt",
    "question": "Quel revenu avant impôt voulez-vous toucher ?",
    "description": "Il s'agit du revenu après déductions des cotisations, avant le paiement de l'impôt sur le revenu.",
    "valeur": "entreprise . chiffre d'affaires - cotisations et contributions"
  },
  "dirigeant . auto-entrepreneur . cotisations et contributions": {
    "unité": "€/mois",
    "somme": [
      "cotisations",
      "TFC",
      "CFP"
    ],
    "références": {
      "Imposition du micro-entrepreneur (régime micro-fiscal et social)": "https://www.service-public.fr/professionnels-entreprises/vosdroits/F23267",
      "Les cotisations et contributions sociales": "https://www.autoentrepreneur.urssaf.fr/portail/accueil/sinformer-sur-le-statut/lessentiel-du-statut.html#cout-durant-vie-auto-entreprise"
    }
  },
  "dirigeant . auto-entrepreneur . cotisations et contributions . TFC": {
    "titre": "Taxes pour frais de chambre",
    "unité": "€/mois",
    "note": "Nous n'avons pas intégré les exceptions suivantes :\n- Artisans en double immatriculation CCI-CMA\n",
    "références": {
      "Fiche service-public.fr": "https://www.service-public.fr/professionnels-entreprises/vosdroits/F32847"
    },
    "somme": [
      "commerce",
      "métiers"
    ]
  },
  "dirigeant . auto-entrepreneur . cotisations et contributions . TFC . commerce": {
    "applicable si": "entreprise . activité . nature = 'commerciale'",
    "produit": {
      "composantes": [
        {
          "assiette": "entreprise . chiffre d'affaires . service BIC",
          "taux": "0.044%",
          "attributs": {
            "unité": "€/mois",
            "arrondi": "oui"
          }
        },
        {
          "assiette": "entreprise . chiffre d'affaires . vente restauration hébergement",
          "taux": "0.015%",
          "attributs": {
            "unité": "€/mois",
            "arrondi": "oui"
          }
        }
      ]
    },
    "références": {
      "service-public.fr": "https://www.service-public.fr/professionnels-entreprises/vosdroits/F32847"
    }
  },
  "dirigeant . auto-entrepreneur . cotisations et contributions . TFC . métiers": {
    "unité": "€/mois",
    "applicable si": "entreprise . activité . nature = 'artisanale'",
    "produit": {
      "composantes": [
        {
          "assiette": "entreprise . chiffre d'affaires . service BIC",
          "taux": {
            "nom": "taux service",
            "valeur": "0.48%"
          },
          "attributs": {
            "unité": "€/mois",
            "arrondi": "oui"
          }
        },
        {
          "assiette": "entreprise . chiffre d'affaires . vente restauration hébergement",
          "taux": {
            "nom": "taux vente",
            "valeur": "0.22%"
          },
          "attributs": {
            "unité": "€/mois",
            "arrondi": "oui"
          }
        }
      ]
    },
    "références": {
      "service-public.fr": "https://www.service-public.fr/professionnels-entreprises/vosdroits/F32847"
    }
  },
  "dirigeant . auto-entrepreneur . cotisations et contributions . TFC . métiers . taux Alsace": {
    "remplace": [
      {
        "règle": "taux service",
        "par": "0.65%"
      },
      {
        "règle": "taux vente",
        "par": "0.29%"
      }
    ],
    "par défaut": "non",
    "une de ces conditions": [
      "établissement . commune . département = 'Bas-Rhin'",
      "établissement . commune . département = 'Haut-Rhin'"
    ],
    "références": {
      "service-public.fr": "https://www.service-public.fr/professionnels-entreprises/vosdroits/F32847"
    }
  },
  "dirigeant . auto-entrepreneur . cotisations et contributions . TFC . métiers . taux Moselle": {
    "remplace": [
      {
        "règle": "taux service",
        "par": "0.83%"
      },
      {
        "règle": "taux vente",
        "par": "0.37%"
      }
    ],
    "par défaut": "non",
    "valeur": "établissement . commune . département = 'Moselle'",
    "références": {
      "service-public.fr": "https://www.service-public.fr/professionnels-entreprises/vosdroits/F32847"
    }
  },
  "dirigeant . auto-entrepreneur . affiliation CIPAV": {
    "une de ces conditions": [
      "entreprise . activité . nature . libérale . réglementée",
      {
        "toutes ces conditions": [
          "entreprise . activité . nature = 'libérale'",
          "entreprise . date de création < 01/2018"
        ]
      }
    ]
  },
  "dirigeant . auto-entrepreneur . cotisations et contributions . CFP": {
    "titre": "Contribution à la formation professionnelle",
    "description": "En plus des charges sociales, les auto-entrepreneurs sont redevables d’une\ncontribution à la formation professionnelle leur permettant de bénéficier du\ndroit à la formation professionnelle (à condition d’avoir déclaré un chiffre\nd’affaires positif au cours des 12 derniers mois).\n",
    "acronyme": "CFP",
    "unité": "€/mois",
    "références": {
      "Article L6331-48 du code du travail": "https://www.legifrance.gouv.fr/affichCodeArticle.do?cidTexte=LEGITEXT000006072050&idArticle=LEGIARTI000006904325",
      "autoentrepreneur.urssaf.fr": "https://www.autoentrepreneur.urssaf.fr/portail/accueil/sinformer-sur-le-statut/lessentiel-du-statut.html#cout-durant-vie-auto-entreprise",
      "Fiche service-public.fr": "https://www.service-public.fr/professionnels-entreprises/vosdroits/F23459",
      "shine.fr": "https://www.shine.fr/blog/formation-professionnelle-auto-entrepreneur/"
    },
    "note": "Les taux implémentés sont ceux prélevés par l'Urssaf.\n",
    "produit": {
      "composantes": [
        {
          "assiette": "entreprise . chiffre d'affaires . BIC",
          "taux": {
            "variations": [
              {
                "si": "entreprise . activité . nature = 'artisanale'",
                "alors": "0.3%"
              },
              {
                "sinon": "0.1%"
              }
            ]
          }
        },
        {
          "assiette": "entreprise . chiffre d'affaires . service BNC",
          "taux": {
            "variations": [
              {
                "si": "affiliation CIPAV",
                "alors": "0.2%"
              },
              {
                "sinon": "0.1%"
              }
            ]
          }
        }
      ]
    },
    "avec": {
      "revenus BIC": {
        "valeur": "entreprise . chiffre d'affaires . BIC",
        "déprécié": "oui"
      },
      "revenus BNC": {
        "valeur": "entreprise . chiffre d'affaires . service BNC",
        "déprécié": "oui"
      }
    }
  },
  "dirigeant . auto-entrepreneur . cotisations et contributions . cotisations": {
    "description": "Les cotisations sociales donnent à l'auto-entrepreneur accès à une\nprotection sociale minimale : une retraite, des soins de santé, des\nallocations familiales, etc.\n\nL'auto-entreprise est un régime simplifié : plutôt qu'une fiche de paie\ncomplexe, toutes les cotisations sont regroupées dans un *forfait* dont le\ntaux dépend de la catégorie d'activité.\n",
    "produit": {
      "composantes": [
        {
          "assiette": "entreprise . chiffre d'affaires . vente restauration hébergement",
          "taux": {
            "nom": "taux vente restauration hébergement",
            "variations": [
              {
                "si": "date >= 10/2022",
                "alors": "12.3%"
              },
              {
                "sinon": "12.8%"
              }
            ]
          }
        },
        {
          "assiette": "entreprise . chiffre d'affaires . service BIC",
          "taux": {
            "nom": "taux service BIC",
            "variations": [
              {
                "si": "date >= 10/2022",
                "alors": "21.2%"
              },
              {
                "sinon": "22%"
              }
            ]
          }
        },
        {
          "assiette": "entreprise . chiffre d'affaires . service BNC",
          "taux": {
            "nom": "taux service BNC",
            "variations": [
              {
                "si": "date >= 10/2022",
                "alors": "21.1%"
              },
              {
                "sinon": "22%"
              }
            ]
          }
        }
      ]
    },
    "références": {
      "Les cotisations et contributions sociales": "https://www.autoentrepreneur.urssaf.fr/portail/accueil/sinformer-sur-le-statut/lessentiel-du-statut.html#cout-durant-vie-auto-entreprise",
      "Cotisations et contributions sociales : montant et déclaration": "https://entreprendre.service-public.fr/vosdroits/F36232#fiche-item-aria-2",
      "Auto-entrepreneur: ce qu’il faut savoir (PDF)": "https://www.autoentrepreneur.urssaf.fr/portail/files/Guides/Metropole/UrssafAutoEntrepreneurMetro.pdf"
    },
    "avec": {
      "cotisations CIPAV": {
        "remplace": "cotisations",
        "description": "Pour les professions libérales relevant de la CIPAV, le taux est le même quelle que soit la catégorie d’imposition/activité (BIC ou BNC, service ou vente).\n",
        "applicable si": "affiliation CIPAV",
        "rend non applicable": "entreprise . activité . mixte",
        "produit": {
          "assiette": "entreprise . chiffre d'affaires",
          "taux": {
            "nom": "taux",
            "valeur": "21.2%"
          }
        }
      },
      "taux prestation de service": {
        "déprécié": "oui",
        "note": "Il y a maintenant un taux différent pour les prestations de service BIC ou BNC.",
        "valeur": "taux service BIC"
      }
    }
  },
  "dirigeant . auto-entrepreneur . cotisations et contributions . cotisations . taux ACRE": {
    "privé": "oui",
    "applicable si": "dirigeant . exonérations . ACRE",
    "description": "Ce taux correspond à la réduction de cotisations qui s'applique pour\nl'auto-entrepreneur bénéficiant de l'Acre. Un taux de 75% signifie que\nl'auto-entrepreneur doit s'acquitter de 75% du montant d'origine des\ncotisations.\n",
    "unité": "%",
    "variations": [
      {
        "si": "entreprise . date de création < 01/04/2019",
        "alors": {
          "grille": {
            "assiette": "entreprise . durée d'activité",
            "tranches": [
              {
                "montant": "25%",
                "plafond": "1 an"
              },
              {
                "montant": "50%",
                "plafond": "2 ans"
              },
              {
                "montant": "90%",
                "plafond": "3 ans"
              }
            ]
          }
        }
      },
      {
        "si": "entreprise . date de création < 01/04/2020",
        "alors": {
          "grille": {
            "assiette": "entreprise . durée d'activité",
            "tranches": [
              {
                "montant": "25%",
                "plafond": "1 an"
              },
              {
                "montant": "75%",
                "plafond": "2 ans"
              },
              {
                "montant": "90%",
                "plafond": "3 ans"
              }
            ]
          }
        }
      },
      {
        "si": "entreprise . durée d'activité < 1 an",
        "alors": "50%"
      }
    ],
    "références": {
      "FAQ Urssaf depuis 04/2020": "https://www.autoentrepreneur.urssaf.fr/portail/accueil/une-question/questions-frequentes.html#jai-cree-mon-auto-entreprise-en",
      "FAQ Urssaf avant 04/2020": "https://www.autoentrepreneur.urssaf.fr/portail/accueil/une-question/questions-frequentes.html#quest-ce-qui-change-pour-moi-si",
      "service-public.fr": "https://www.service-public.fr/professionnels-entreprises/vosdroits/F32318"
    },
    "avec": {
      "CIPAV": {
        "remplace": "cotisations CIPAV . taux",
        "titre": null,
        "variations": [
          {
            "si": "entreprise . date de création >= 01/04/2020",
            "alors": "12.10%"
          },
          {
            "sinon": "cotisations CIPAV . taux * taux ACRE"
          }
        ]
      },
      "références": {
        "urssaf.fr": "https://www.autoentrepreneur.urssaf.fr/portail/files/Guides/Metropole/UrssafAutoEntrepreneurMetro.pdf"
      },
      "vente restauration hébergement": {
        "remplace": "taux vente restauration hébergement",
        "valeur": "taux ACRE * taux vente restauration hébergement",
        "arrondi": "1 décimale"
      },
      "service BIC": {
        "remplace": "taux service BIC",
        "valeur": "taux ACRE * taux service BIC",
        "arrondi": "1 décimale"
      },
      "service BNC": {
        "remplace": "taux service BNC",
        "valeur": "taux ACRE * taux service BNC",
        "arrondi": "1 décimale"
      },
      "prestation de service": {
        "déprécié": "oui",
        "note": "Il y a maintenant des taux différents pour les prestations de service BIC et BNC",
        "valeur": "service BIC"
      }
    }
  },
  "dirigeant . auto-entrepreneur . cotisations et contributions . cotisations . taux ACRE . notification calcul ACRE annuel": {
    "experimental": "oui",
    "formule": "dirigeant . exonérations . ACRE",
    "type": "notification",
    "description": "Le taux ACRE utilisé est celui correspondant au mois courant. Le\nsimulateur ne prend pas encore en compte le chevauchement de deux périodes\nd'acre sur une meme année.\n"
  },
  "dirigeant . auto-entrepreneur . impôt": "oui",
  "dirigeant . auto-entrepreneur . impôt . revenu imposable": "entreprise . imposition . régime . micro-entreprise . revenu abattu",
  "dirigeant . auto-entrepreneur . impôt . versement libératoire": {
    "rend non applicable": "revenu imposable",
    "description": "Avec l'option pour le versement libératoire, l’impôt sur le revenu est payé en même temps que vos cotisations (par mois ou par trimestre) avec application d’un taux spécifique en fonction de votre activité. Pour en bénéficier, votre revenu fiscal de référence ne doit pas excéder 27 086 € en 2018\n",
    "question": "Bénéficiez-vous du versement libératoire de l'impôt sur le revenu ?",
    "par défaut": "non"
  },
  "dirigeant . auto-entrepreneur . impôt . versement libératoire . seuil dépassé": {
    "type": "notification",
    "valeur": "impôt . foyer fiscal . revenu fiscal de référence > 27519 €/an",
    "description": "Le versement libératoire n'est pas disponible si le revenu fiscal de\nréférence de votre ménage est supérieur à 27 519 € par part en 2018\n"
  },
  "dirigeant . auto-entrepreneur . impôt . versement libératoire . montant": {
    "titre": "versement libératoire auto-entrepreneur",
    "description": "Si vous avez opté pour le versement libératoire, l’impôt sur le revenu est\npayé en même temps que vos cotisations (par mois ou par trimestre) avec\napplication d’un taux spécifique en fonction de votre activité\n",
    "produit": {
      "composantes": [
        {
          "assiette": "entreprise . chiffre d'affaires . vente restauration hébergement",
          "taux": "1%"
        },
        {
          "assiette": "entreprise . chiffre d'affaires . service BIC",
          "taux": "1.7%"
        },
        {
          "assiette": "entreprise . chiffre d'affaires . service BNC",
          "taux": "2.2%"
        }
      ]
    }
  },
  "dirigeant . auto-entrepreneur . revenu net . après impôt": {
    "identifiant court": "auto-entrepreneur-net-apres-impot",
    "résumé": "Avant déduction des dépenses liées à l'activité",
    "unité": "€/an",
    "arrondi": "oui",
    "question": "Quel est le revenu net après impôt souhaité ?",
    "description": "Le revenu net de l'auto-entrepreneur après déduction de l'impôt sur le revenu et des cotisations sociales.\n\n**Attention :** Pour bien évaluer la rentabilité de l'entreprise, il ne faut pas oublier de retrancher à ce montant les dépenses engagées dans le cadre de l'activité. Cela peut inclure par exemple :\n- L'achat des matière premières\n- L'achat des outils / materiel\n- L'abonnement à des services payants\n- La location d'un local\n- etc...",
    "valeur": "revenu net - rémunération . impôt"
  },
  "dirigeant . auto-entrepreneur . chiffre d'affaires": {
    "question": "Quel est votre chiffre d'affaires ?",
    "résumé": "Montant total des recettes (hors taxe)",
    "inversion numérique": {
      "avec": [
        "revenu net",
        "revenu net . après impôt"
      ]
    }
  },
  "dirigeant . indépendant": {
    "applicable si": "régime social = 'indépendant'",
    "valeur": "oui"
  },
  "dirigeant . indépendant . revenu professionnel": {
    "description": "rémunération du dirigeant au régime des indépendant",
    "unité": "€/an",
    "résoudre la référence circulaire": "oui",
    "variations": [
      {
        "si": "entreprise . imposition = 'IS'",
        "alors": {
          "somme": [
            "rémunération . net",
            "cotisations et contributions . non déductibles"
          ]
        }
      },
      {
        "sinon": "entreprise . résultat fiscal"
      }
    ]
  },
  "dirigeant . indépendant . assiette des cotisations": {
    "unité": "€/an",
    "description": "Il s'agit de l'assiette des cotisations sociales, nombre forcément positif",
    "valeur": {
      "nom": "sans plancher",
      "somme": [
        "revenu professionnel",
        "cotisations facultatives . déductibles"
      ]
    },
    "plancher": 0
  },
  "dirigeant . indépendant . cotisations et contributions . non déductibles": {
    "titre": "Part non déductibles fiscalement",
    "somme": [
      "CSG-CRDS . non déductible",
      "cotisations facultatives . non déductibles"
    ]
  },
  "dirigeant . indépendant . cotisations et contributions . exonérations . ACRE": {
    "applicable si": "dirigeant . exonérations . ACRE",
    "formule": {
      "produit": {
        "assiette": {
          "somme": [
            "maladie",
            "retraite de base",
            "indemnités journalières maladie",
            "invalidité et décès",
            "allocations familiales"
          ]
        },
        "taux": "taux",
        "facteur": "prorata sur l'année"
      },
      "arrondi": "oui"
    },
    "références": {
      "Fiche secu-independants.fr": "https://www.secu-independants.fr/cotisations/calcul-cotisations/acre/"
    }
  },
  "dirigeant . indépendant . cotisations et contributions . PSS proratisé": {
    "titre": "plafond de la sécurité sociale proratisé",
    "description": "Le plafond de la sécurité sociale, proratisé par la durée d'activité pendant l'année (dans le cas d'activité crée ou cessée en cours d'année).\n\nUtile pour calculer les cotisations forfaitaires de début d'activité ou le montant de l'ACRE\n",
    "unité": "€/an",
    "produit": {
      "assiette": "plafond sécurité sociale",
      "taux": {
        "valeur": "entreprise . durée d'activité . en fin d'année / 1 an",
        "plafond": "100%"
      }
    },
    "arrondi": "oui"
  },
  "dirigeant . indépendant . cotisations et contributions . exonérations . ACRE . prorata sur l'année": {
    "description": "Comme le calcul des cotisations indépendants s'effectue sur l'année entière,\nl'exonération est proratisée en fonction de la durée effective de l'ACRE sur l'année courante.\n\nPar exemple, pour une entreprise crée le 1 fevrier 2018, le calcul du prorata pour les\ncotisations 2019 sera le suivant :\n\n`31 jours d'acre restant en 2019 / 365 jours = 8,5%`\n",
    "formule": "(1 an - entreprise . durée d'activité . en début d'année) / 1 an"
  },
  "dirigeant . indépendant . cotisations et contributions . exonérations . ACRE . taux": {
    "formule": {
      "taux progressif": {
        "assiette": "assiette des cotisations",
        "multiplicateur": "PSS proratisé",
        "tranches": [
          {
            "taux": "100%",
            "plafond": "75%"
          },
          {
            "taux": "0%",
            "plafond": "100%"
          }
        ]
      }
    }
  },
  "dirigeant . indépendant . conjoint collaborateur": {
    "question": "Avez-vous un conjoint collaborateur ?",
    "description": "En tant que collaborateur, le conjoint d'un indépendant verse des cotisations en matière de retraite et d'invalidité-décès et bénéficie en contrepartie de droits propres. Il s'acquitte aussi d'une cotisation indemnités journalières et peut être indemnisé en cas d'arrêt de travail.\n\n### Conjoint collaborateur : pour qui ?\n\nPour que le conjoint puisse choisir le statut de conjoint collaborateur, le chef d'entreprise doit exercer en entreprise individuelle, être le gérant majoritaire ou appartenir à un collège de gérance majoritaire, d'une entreprise en SARL ou EURL sans limitation de l'effectif salarié.\n\nLe conjoint doit :\n- participer de manière régulière à l'activité de l'entreprise ;\n- ne pas être rémunéré pour cette activité ;\n- doit être marié ou lié par un pacte civil de solidarité (Pacs) au chef d'entreprise, ou être le concubin.\n\n> #### Avantages du statut conjoint collaborateur\n> Ce statut du conjoint collaborateur est souple, simple (peu de formalités administratives) et d’un faible coût pour l’entreprise pour une protection sociale complète. Il peut être choisi même si le conjoint exerce une activité hors de l’entreprise.\n",
    "par défaut": "non",
    "références": {
      "urssaf.fr": "https://www.urssaf.fr/portail/home/artisan-commercant/conjoint-du-chef-dentreprise/conjoint-collaborateur.html",
      "secu-independants.fr": "https://www.secu-independants.fr/cotisations/conjoint/conjoint-collaborateur/?reg=lorraine&pro=artisan&act=retraite&ae=non#c46535",
      "service-public.fr": "https://www.service-public.fr/professionnels-entreprises/vosdroits/F33429"
    }
  },
  "dirigeant . indépendant . conjoint collaborateur . assiette": {
    "titre": "Choix assiette",
    "question": "Sur quelle base le conjoint cotise-t'il ?",
    "description": "Le conjoint collaborateur dispose de trois choix d’assiette pour le calcul de ces cotisations :\n- Le conjoint cotise sur un revenu forfaitaire\n- Le conjoint cotise sur un pourcentage du revenu du professionnel sans qu’il y ait partage de ce revenu.\n- Le conjoint cotise sur une fraction du revenu du professionnel. Le revenu est partagé entre les deux conjoints.\n",
    "par défaut": "'forfaitaire'",
    "formule": {
      "une possibilité": {
        "choix obligatoire": "oui",
        "possibilités": [
          "forfaitaire",
          "revenu sans partage",
          "revenu avec partage"
        ]
      }
    }
  },
  "dirigeant . indépendant . conjoint collaborateur . assiette . forfaitaire": {
    "description": "Le conjoint collaborateur paiera des cotisations équivalentes à un revenu\nprofessionnel forfaitaire, fixé à 1/3 du plafond de la sécurité sociale,\nà l’exception de la cotisation indemnités journalières qui est calculée sur\nune assiette équivalente à 40% du PASS.\n",
    "formule": "assiette = 'forfaitaire'"
  },
  "dirigeant . indépendant . conjoint collaborateur . assiette . revenu avec partage": {
    "description": "Le conjoint collaborateur et le gérant paieront des cotisations sociales chacun sur une part du revenu professionnel.\n**Cette option baisse le montant des cotisations à payer pour le gérant, mais elle diminue également ses contreparties sociales (pension de retraite, indemnité décès, etc)**\n",
    "formule": "assiette = 'revenu avec partage'"
  },
  "dirigeant . indépendant . conjoint collaborateur . assiette . revenu avec partage . assiette gérant": {
    "valeur": "assiette des cotisations - cotisations . assiette",
    "remplace": {
      "règle": "assiette des cotisations",
      "dans": [
        "cotisations et contributions . retraite de base",
        "cotisations et contributions . retraite complémentaire",
        "cotisations et contributions . invalidité et décès",
        "dirigeant . indépendant . PL . CNAVPL . retraite"
      ]
    }
  },
  "dirigeant . indépendant . conjoint collaborateur . assiette . revenu sans partage": {
    "description": "Le conjoint collaborateur paiera des cotisations sociales calculées sur une base d'un pourcentage du assiette des cotisations du gérant de l'entreprise.",
    "formule": "assiette = 'revenu sans partage'"
  },
  "dirigeant . indépendant . conjoint collaborateur . assiette . pourcentage": {
    "titre": "Proportion revenu",
    "question": "À quelle proportion du revenu le conjoint cotise-t'il ?",
    "par défaut": "'tiers'",
    "formule": {
      "une possibilité": {
        "choix obligatoire": "oui",
        "possibilités": [
          "tiers",
          "moitié"
        ]
      }
    }
  },
  "dirigeant . indépendant . conjoint collaborateur . assiette . pourcentage . tiers": {
    "formule": "pourcentage = 'tiers'",
    "titre": "1/3"
  },
  "dirigeant . indépendant . conjoint collaborateur . assiette . pourcentage . moitié": {
    "formule": "pourcentage = 'moitié'",
    "titre": "1/2"
  },
  "dirigeant . indépendant . conjoint collaborateur . cotisations . assiette": {
    "unité": "€/an",
    "produit": {
      "assiette": "assiette des cotisations",
      "taux": "1 / 3",
      "variations": [
        {
          "si": "assiette . forfaitaire",
          "alors": {
            "assiette": "plafond sécurité sociale"
          }
        },
        {
          "si": "assiette . pourcentage . moitié",
          "alors": {
            "taux": "50%"
          }
        },
        {
          "sinon": {}
        }
      ]
    }
  },
  "dirigeant . indépendant . conjoint collaborateur . cotisations": {
    "formule": {
      "somme": [
        "retraite de base",
        "retraite complémentaire",
        "invalidité et décès",
        "indemnités journalières maladie"
      ]
    }
  },
  "dirigeant . indépendant . conjoint collaborateur . cotisations . assiette retraite": {
    "le maximum de": [
      "cotisations . assiette",
      "5.25% * plafond sécurité sociale",
      "200 heures/an * SMIC . horaire"
    ],
    "unité": "€/an",
    "arrondi": "oui"
  },
  "dirigeant . indépendant . conjoint collaborateur . cotisations . retraite de base": {
    "unité": "€/an",
    "barème": {
      "assiette": "assiette retraite",
      "multiplicateur": "plafond sécurité sociale",
      "tranches": [
        {
          "taux": "17.75%",
          "plafond": 1
        },
        {
          "taux": "0.6%"
        }
      ]
    },
    "arrondi": "oui"
  },
  "dirigeant . indépendant . conjoint collaborateur . cotisations . retraite complémentaire": {
    "unité": "€/an",
    "barème": {
      "assiette": "retraite complémentaire . assiette",
      "tranches": [
        {
          "taux": "7%",
          "plafond": "cotisations et contributions . retraite complémentaire . plafond"
        },
        {
          "taux": "8%",
          "plafond": "4 * plafond sécurité sociale"
        }
      ]
    },
    "arrondi": "oui"
  },
  "dirigeant . indépendant . conjoint collaborateur . cotisations . retraite complémentaire . assiette": {
    "unité": "€/an",
    "valeur": "assiette retraite",
    "plafond": {
      "variations": [
        {
          "si": "entreprise . activité . nature = 'artisanale'",
          "alors": "4 * plafond sécurité sociale"
        },
        {
          "sinon": "3 * plafond sécurité sociale"
        }
      ]
    }
  },
  "dirigeant . indépendant . conjoint collaborateur . cotisations . invalidité et décès": {
    "produit": {
      "assiette": {
        "unité": "€/an",
        "valeur": "cotisations . assiette",
        "plancher": "20% * plafond sécurité sociale",
        "plafond": "plafond sécurité sociale"
      },
      "taux": "1.3%"
    },
    "arrondi": "oui"
  },
  "dirigeant . indépendant . conjoint collaborateur . cotisations . indemnités journalières maladie": {
    "produit": {
      "assiette": {
        "unité": "€/an",
        "valeur": "40% * plafond sécurité sociale"
      },
      "taux": {
        "variations": [
          {
            "si": "date >= 01/2022",
            "alors": "0.50%"
          },
          {
            "sinon": "cotisations et contributions . indemnités journalières maladie . taux"
          }
        ]
      }
    },
    "arrondi": "oui"
  },
  "dirigeant . indépendant . cotisations et contributions . cotisations": {
    "références": {
      "assiettes et taux": "https://www.secu-independants.fr/baremes/cotisations-et-contributions"
    },
    "formule": {
      "somme": [
        "maladie",
        "retraite de base",
        "retraite complémentaire",
        "indemnités journalières maladie",
        "invalidité et décès",
        "allocations familiales",
        "PCV",
        "(- exonérations)"
      ]
    }
  },
  "dirigeant . indépendant . cotisations et contributions": {
    "description": "C'est le montant total dû par l'indépendant au titre des cotisations et\ncontributions obligatoires ainsi qu'au titre de ses cotisations facultatives\ntelles que les contrats Madelin.\n",
    "somme": [
      "cotisations et contributions . cotisations",
      "conjoint collaborateur . cotisations",
      "cotisations facultatives . montant",
      "CSG-CRDS",
      "contributions spéciales",
      "formation professionnelle"
    ],
    "note": "À la différence des cotisations, les contributions ne sont pas réintroduites\npour le calcul de la CSG/CRDS. Elles ne bénéficient pas non plus de la\nréduction ACRE.\n"
  },
  "dirigeant . indépendant . assiette minimale": {
    "non applicable si": "situation personnelle . RSA",
    "valeur": "oui",
    "description": "Si le revenu du chef d'entreprise est déficitaire ou inférieur aux bases de calcul, certaines cotisations seront portées à un montant minimum.\nLes cotisations pour les indemnités journalières, retraite de base, invalidité-décès et pour la formation ne sont plus calculées selon le revenu du chef d'entreprise mais selon une \"assiette\" (montant retenu qui sert de base au calcul d'un impôt ou d'une taxe).\n\nLes cotisations minimales ne s'appliquent pas si vous bénéficiez du RSA ou de la prime d’activité.\n",
    "références": {
      "cotisations minimales": "https://www.secu-independants.fr/cotisations/calcul-cotisations/cotisations-minimales/"
    }
  },
  "dirigeant . indépendant . assiette minimale . maladie": {
    "description": "Si le revenu du chef d'entreprise est déficitaire ou inférieur aux bases de calcul, certaines cotisations seront portées à un montant minimum.\n",
    "produit": {
      "assiette": "plafond sécurité sociale",
      "taux": "40%"
    },
    "unité": "€/an",
    "arrondi": "oui",
    "références": {
      "cotisations minimales": "https://www.secu-independants.fr/cotisations/calcul-cotisations/cotisations-minimales/"
    }
  },
  "dirigeant . indépendant . assiette minimale . retraite": {
    "description": "La cotisation minimale de retraite de base permet de valider 3 trimestres de retraite, quel que soit le revenu.",
    "produit": {
      "assiette": "plafond sécurité sociale",
      "taux": "11.5%"
    },
    "unité": "€/an",
    "arrondi": "oui",
    "références": {
      "cotisations minimales": "https://www.secu-independants.fr/cotisations/calcul-cotisations/cotisations-minimales/"
    }
  },
  "dirigeant . indépendant . assiette minimale . retraite . en 2022": {
    "description": "L’assiette minimale de 11,50% n’était pas suffisante pour valider 3 trimestres. Par conséquent cette assiette minimale a été révisée en cours d’année et sera appliquée de manière rétroactive à compté du 1er janvier 2022.\n\nL’assiette minimale est de 4 758 €  pour 2022 uniquement. Pour 2023, on repasse à une assiette minimale de 11,5% du PASS.\n",
    "remplace": "assiette minimale . retraite",
    "applicable si": {
      "toutes ces conditions": [
        "date >= 01/2022",
        "date < 01/2023"
      ]
    },
    "valeur": "4758 €/an"
  },
  "dirigeant . indépendant . cotisations et contributions . contributions spéciales": {
    "description": "Certains régimes spéciaux peuvent ajouter des contributions additionnelles\n(par exemple, la CURPS pour les CPAM)\n",
    "formule": "non"
  },
  "dirigeant . indépendant . cotisations et contributions . PCV": {
    "titre": "Prestations complémentaires vieillesse",
    "acronyme": "PCV",
    "formule": "non",
    "description": "Certaines catégories professionnelles bénéficient de\nprestations complémentaires vieillesse (PCV), auparavant nommées « avantage\nsocial vieillesse » (ASV). Cela concerne les médecins généralistes, les\nchirurgiens-dentistes, les sages-femmes, les auxiliaires médicaux et les\ndirecteurs de laboratoires. Ce régime résulte de la prise en charge\npartielle par l’Assurance maladie de leurs cotisations d’assurance\nvieillesse sous réserve qu’ils aient exercé leur activité dans le cadre\nconventionnel.\n"
  },
  "dirigeant . indépendant . cotisations et contributions . déduction tabac": {
    "applicable si": "entreprise . activité . débit de tabac",
    "question": "Quel est le montant des revenus issus de la vente de tabac que vous souhaitez exonérer de cotisation vieillesse ?",
    "description": "Si vous exercez une activité de débit de tabac simultanément à une activité commerciale, vous avez la possibilité d’opter pour le calcul de votre cotisation d’assurance vieillesse sur le seul revenu tiré de votre activité commerciale (en effet, les remises pour débit de tabac sont soumises par ailleurs à un prélèvement vieillesse particulier). Nous attirons cependant votre attention sur le fait qu’en cotisant sur une base moins importante, excluant les revenus de débit de tabac, vos droits à retraite pour l’assurance vieillesse des commerçants en seront diminués.\n",
    "par défaut": "0 €/an"
  },
  "dirigeant . indépendant . cotisations et contributions . déduction tabac . revenus déduits": {
    "titre": "assiette des cotisations (avec déduction tabac)",
    "applicable si": "déduction tabac",
    "remplace": {
      "règle": "assiette des cotisations",
      "dans": [
        "retraite de base",
        "retraite complémentaire",
        "invalidité et décès",
        "conjoint collaborateur"
      ]
    },
    "valeur": "assiette des cotisations",
    "abattement": "déduction tabac"
  },
  "dirigeant . indépendant . cotisations facultatives": {
    "question": "Avez-vous souscrit à des contrats de prévoyance et / ou de retraite complémentaire privés (contrats Madelin, plans d'épargne retraite) ?",
    "description": "Il est possible pour l'indépendant de souscrire à des contrats privés pour la prévoyance santé, ou un plan d'épargne retraite.\nLes versements à ces contrats sont désigné par l'appellation \"cotisations facultative\" par l'administration fiscale.\n\nIls sont déductible d'impôts (dans la limite d'un plafond), mais non déductible pour l'assiette des cotisations et contributions sociales.\n",
    "par défaut": "non",
    "références": {
      "Contrats Madelin": "https://www.economie.gouv.fr/particuliers/reduction-impot-revenu-investissements-entreprise-pme-madelin",
      "PER": "https://www.economie.gouv.fr/PER-epargne-retraite"
    }
  },
  "dirigeant . indépendant . cotisations facultatives . montant": {
    "somme": [
      "contrats madelin",
      "PER"
    ]
  },
  "dirigeant . indépendant . cotisations facultatives . déductibles": {
    "titre": "Part déductible fiscalement",
    "formule": {
      "somme": [
        {
          "valeur": "contrats madelin . prévoyance",
          "plafond": "plafond prévoyance"
        },
        {
          "somme": [
            "PER",
            "contrats madelin . retraite"
          ],
          "plafond": "plafond retraite complémentaire"
        }
      ]
    }
  },
  "dirigeant . indépendant . cotisations facultatives . non déductibles": {
    "titre": "Part non déductible fiscalement",
    "formule": "montant - déductibles"
  },
  "dirigeant . indépendant . cotisations facultatives . PER": {
    "description": "Le PER individuel est ouvert à tous. Vous pouvez le souscrire auprès d'un établissement financier ou d'un organisme d'assurance. Ce nouveau plan succède au PERP et au contrat Madelin, qui ne seront plus proposés à partir du 1er octobre 2020. Votre épargne accumulée sur le Perp et le Madelin peut être à votre demande transférée sur le PER individuel. Ce contrat donne droit à des avantages fiscaux et vos droits sont transférables vers les autres PER. Il y a des cas de déblocage anticipé.",
    "titre": "Plan d'épargne retraite",
    "unité": "€/an",
    "question": "Quel est le montant des cotisations que vous versez dans le cadre d'un PER (nouveau plan épargne retraite, depuis le 1er octobre 2019) ?",
    "par défaut": "0 €/mois",
    "références": {
      "Fiche service-public.fr": "https://www.service-public.fr/particuliers/vosdroits/F34982",
      "Fiche economie.gouv.fr": "https://www.economie.gouv.fr/PER-epargne-retraite"
    }
  },
  "dirigeant . indépendant . cotisations facultatives . contrats madelin": {
    "titre": "contrats Madelin",
    "somme": [
      "prévoyance",
      "retraite"
    ]
  },
  "dirigeant . indépendant . cotisations facultatives . contrats madelin . prévoyance": {
    "titre": "Prévoyance complémentaire",
    "question": "Quel est le montant que vous versez pour vos contrats Madelin de prévoyance complémentaire (santé, perte d'emploi subie) ?",
    "unité": "€/an",
    "description": "Si vous cotisez au titre d'un contrat de prévoyance complémentaire (santé, perte d'emploi subie)\nde type loi Madelin, vous pouvez déduire ces cotisations des bénéfices\nimposables que vous déclarez pour votre activité non salariée.\n",
    "références": {
      "Fiche impôts": "https://www.impots.gouv.fr/portail/particulier/questions/je-cotise-un-contrat-madelin-quel-est-mon-avantage-fiscal",
      "Bofip (contrats d'assurance de groupe)": "https://bofip.impots.gouv.fr/bofip/4639-PGP.html",
      "Article de loi": "https://www.legifrance.gouv.fr/affichCodeArticle.do?idArticle=LEGIARTI000029042287&cidTexte=LEGITEXT000006069577&dateTexte=20140530&fastReqId=1900907951&nbResultRech=1"
    },
    "par défaut": "50 €/mois"
  },
  "dirigeant . indépendant . cotisations facultatives . plafond prévoyance": {
    "unité": "€/an",
    "formule": {
      "somme": [
        {
          "produit": {
            "assiette": "revenu professionnel",
            "taux": "3.75%"
          }
        },
        {
          "produit": {
            "assiette": "plafond sécurité sociale",
            "taux": "7%"
          }
        }
      ],
      "plafond": {
        "produit": {
          "assiette": "8 * plafond sécurité sociale",
          "taux": "3%"
        }
      }
    },
    "références": {
      "Code général des impôts": "https://www.legifrance.gouv.fr/affichCodeArticle.do?idArticle=LEGIARTI000029042287&cidTexte=LEGITEXT000006069577&dateTexte=20140530",
      "Réassurez-moi": "https://reassurez-moi.fr/guide/pro/tns/plafond#le_plafond_de_deduction_madelin_pour_une_mutuelle_santenbsp"
    },
    "note": "Normalement c'est le résultat fiscal qui devrait être utilisé pour l'assiette du plafond, mais on utilise le revenu professionnel pour éviter un cycle.\n"
  },
  "dirigeant . indépendant . cotisations facultatives . contrats madelin . retraite": {
    "question": "Quel est le montant que vous versez pour votre contrat Madelin retraite complémentaire ?",
    "description": "Si vous cotisez au titre d'un contrat retraite de type loi Madelin,\nvous pouvez déduire une partie de ces cotisations des bénéfices\nimposables que vous déclarez pour votre activité non salariée.\n",
    "références": {
      "Fiche impôts": "https://www.impots.gouv.fr/portail/particulier/questions/je-cotise-un-contrat-madelin-quel-est-mon-avantage-fiscal",
      "Bofip (contrats d'assurance de groupe)": "https://bofip.impots.gouv.fr/bofip/4639-PGP.html",
      "Article de loi": "https://www.legifrance.gouv.fr/affichCodeArticle.do?idArticle=LEGIARTI000029042287&cidTexte=LEGITEXT000006069577&dateTexte=20140530&fastReqId=1900907951&nbResultRech=1"
    },
    "par défaut": "0 €/an"
  },
  "dirigeant . indépendant . cotisations facultatives . plafond retraite complémentaire": {
    "unité": "€/an",
    "formule": {
      "le maximum de": [
        {
          "barème": {
            "assiette": "revenu professionnel",
            "multiplicateur": "plafond sécurité sociale",
            "tranches": [
              {
                "taux": "10%",
                "plafond": 1
              },
              {
                "taux": "25%",
                "plafond": 8
              }
            ]
          }
        },
        {
          "produit": {
            "assiette": "plafond sécurité sociale",
            "taux": "10%"
          }
        }
      ]
    },
    "références": {
      "Bofip": "https://bofip.impots.gouv.fr/bofip/1124-PGP.html",
      "LegiFiscal": "https://www.legifiscal.fr/impots-personnels/impot-revenu/deduction-des-contrats-madelin-retraite.html"
    },
    "note": "Normalement c'est le résultat fiscal qui devrait être utilisé pour l'assiette du plafond, mais on utilise le revenu professionnel pour éviter un cycle.\n"
  },
  "dirigeant . indépendant . cotisations et contributions . début activité": {
    "titre": "Cotisations forfaitaires de début d'activité",
    "description": "Lorsque vous commencez votre activité, vos **revenus professionnels**\nn’étant pas connus**, les cotisations et contributions des deux premières\nannées sont calculées sur une **base forfaitaire**.\n\n\nCes cotisations seront ajustées et régularisées en fonction de vos revenus réels de\nl’année d’exercice. Si votre revenu est supérieur à la base forfaitaire prise en compte\npour le calcul des cotisations provisionnelles alors vous serez redevable d’un\n**complément de cotisations**.\n\n\nCe simulateur calcule les cotisations dites définitives sur la base des revenus réels de votre\nactivité. Il vous permet donc de pouvoir anticiper le montant de cette régularisation et de\n**planifier votre trésorerie** en conséquence.\n",
    "note": "La base forfaitaire s’élève à **19 % du plafond annuel de la Sécurité sociale** au titre de la première et de la deuxième année d’activité (à l’exception de la cotisation Maladie et indemnités journalières pour lesquelles l’assiette forfaitaire est égale à 40% du plafond annuel de la Sécurité sociale).",
    "applicable si": "entreprise . date de création >= période . début d'année",
    "unité": "€/an",
    "recalcul": {
      "règle": "cotisations et contributions",
      "avec": {
        "assiette des cotisations": "assiette forfaitaire",
        "CSG-CRDS . assiette": "assiette forfaitaire",
        "dirigeant . indépendant . cotisations facultatives": "non",
        "maladie . taux progressif . assiette": "assiette forfaitaire maladie"
      }
    },
    "avec": {
      "assiette forfaitaire": {
        "produit": {
          "assiette": "PSS proratisé",
          "taux": "19%"
        },
        "arrondi": "oui",
        "unité": "€/an",
        "références": {
          "Fiche Urssaf": "https://www.urssaf.fr/portail/home/independant/mes-cotisations/les-etapes-de-calcul/le-mode-de-calcul/les-cotisations-provisionnelles/debut-dactivite.html"
        }
      },
      "assiette forfaitaire maladie": {
        "valeur": "40% * plafond sécurité sociale",
        "unité": "€/an",
        "arrondi": "oui"
      }
    },
    "références": {
      "Fiche Urssaf": "https://www.urssaf.fr/portail/home/independant/mes-cotisations/les-etapes-de-calcul/le-mode-de-calcul/lajustement-et-la-regularisation.html"
    }
  },
  "dirigeant . indépendant . cotisations et contributions . régularisation": {
    "titre": "Comment fonctionne la régularisation des cotisations provisionnelles",
    "description": "Les cotisations et contributions sont calculées à titre provisionnel\nsur la base du dernier revenu déclaré\n(ou du montat forfaitaire, si aucun revenu n'est encore déclaré).\nUne fois l'année écoulée et le revenu professionnel connu,\nles cotisations et contributions sont régularisées.\n\n\nCe simulateur calcule les cotisations **après régularisation**.\nIl vous permet donc d'anticiper le montant de cette régularisation et de planifier votre\ntrésorerie en conséquence.\n\n\nSi vos revenus d'activité changent beaucoup par rapport à l'année précédente,\nvous avez la possibilité de communiquer à l'URSSAF un\n**montant prévisionnel pour l'année en cours, qui sera pris comme base de calcul**\n(attention cependant, vous serez tenus de faire une estimation précise).\n",
    "références": {
      "Fiche Urssaf": "https://www.urssaf.fr/portail/cms/render/live/fr/sites/urssaf/home/independant/mes-cotisations/les-etapes-de-calcul/le-mode-de-calcul/les-cotisations-provisionnelles/demande-de-modulation.html",
      "Article L131-6-2 du Code de la sécurité sociale": "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000037062224/",
      "Article D131-3 du Code de la sécurité sociale": "https://www.legifrance.gouv.fr/codes/id/LEGIARTI000038786941/2021-03-01/?isSuggest=true"
    }
  },
  "dirigeant . indépendant . cotisations et contributions . indemnités journalières maladie": {
    "synonymes": [
      "maladie 2"
    ],
    "description": "Cotisations pour les indemnités journalières des indépendants. Si l'état de\nsanté des artisans, commerçants, industriels et conjoints collaborateurs\nnécessite un arrêt de travail, une part de leur ancien revenu leur sera\nversé.\n",
    "produit": {
      "assiette": {
        "nom": "assiette",
        "valeur": "assiette des cotisations",
        "plancher": "assiette minimale . maladie",
        "plafond": "5 * plafond sécurité sociale"
      },
      "taux": {
        "nom": "taux",
        "valeur": "0.85%"
      }
    },
    "arrondi": "oui",
    "unité": "€/an",
    "références": {
      "Cotisation minimale": "https://www.secu-independants.fr/cotisations/calcul-des-cotisations/cotisations-minimales/",
      "Taux de cotisations": "https://www.secu-independants.fr/cotisations/calcul-cotisations/taux-de-cotisations/"
    }
  },
  "dirigeant . indépendant . cotisations et contributions . maladie": {
    "barème": {
      "assiette": {
        "valeur": "assiette des cotisations",
        "plancher": "assiette minimale . maladie"
      },
      "multiplicateur": "plafond sécurité sociale",
      "tranches": [
        {
          "taux": {
            "valeur": "taux progressif",
            "arrondi": "2 décimales"
          },
          "plafond": "110%"
        },
        {
          "taux": "6.35%",
          "plafond": 5
        },
        {
          "taux": "6.5%"
        }
      ]
    },
    "arrondi": "oui",
    "unité": "€/an",
    "références": {
      "Articles D621-1 à D621-6 du Code de la sécurité sociale": "https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006073189/LEGISCTA000028171649/#LEGISCTA000036475251",
      "taux de cotisations": "https://www.secu-independants.fr/cotisations/calcul-cotisations/taux-de-cotisations/",
      "décret formule de calcul": "https://www.legifrance.gouv.fr/affichTexte.do?cidTexte=JORFTEXT000036342439&categorieLien=id"
    },
    "note": "On retrouve dans le décret ci-dessous la phrase suivante :\n\n> I.-Par dérogation au premier alinéa, le taux de la cotisation est fixé à 6,5 % lorsque le revenu d'activité est supérieur à cinq fois la valeur annuelle du plafond de la sécurité sociale déterminée conformément à l'article D. 613-2.\n\nLe terme \"lorsque\" laisse entendre qu'en cas de dépassement du seuil 5xPSS, tout le revenu est soumis à 6.5%. Il semblerait qu'une interprétation inverse soit à privilégier : seule la part supérieure à ce seuil est soumise à ce taux, et c'est cette implémentation que nous avons retenue.\n"
  },
  "dirigeant . indépendant . cotisations et contributions . maladie . taux progressif . réduction supplémentaire": {
    "description": "La réduction supplémentaire du taux maladie pour les revenu inférieurs à 40% du plafond de la sécurité sociale\n",
    "non applicable si": "situation personnelle . RSA",
    "remplace": {
      "règle": "taux progressif",
      "par": "taux progressif - réduction supplémentaire"
    },
    "taux progressif": {
      "assiette": "assiette",
      "multiplicateur": "plafond sécurité sociale",
      "tranches": [
        {
          "plafond": "0%",
          "taux": "1.35%"
        },
        {
          "plafond": "40%",
          "taux": "0%"
        }
      ]
    },
    "références": {
      "Taux de cotisations": "https://www.secu-independants.fr/cotisations/calcul-cotisations/taux-de-cotisations/",
      "décret formule de calcul": "https://www.legifrance.gouv.fr/affichTexte.do?cidTexte=JORFTEXT000036342439&categorieLien=id"
    }
  },
  "dirigeant . indépendant . cotisations et contributions . maladie . taux progressif": {
    "taux progressif": {
      "assiette": {
        "nom": "assiette",
        "valeur": "assiette des cotisations"
      },
      "multiplicateur": "plafond sécurité sociale",
      "tranches": [
        {
          "plafond": "0%",
          "taux": "1.35%"
        },
        {
          "plafond": "110%",
          "taux": "6.35%"
        }
      ]
    },
    "références": {
      "Taux de cotisations": "https://www.secu-independants.fr/cotisations/calcul-cotisations/taux-de-cotisations/",
      "décret formule de calcul": "https://www.legifrance.gouv.fr/affichTexte.do?cidTexte=JORFTEXT000036342439&categorieLien=id"
    }
  },
  "dirigeant . indépendant . cotisations et contributions . retraite de base": {
    "barème": {
      "assiette": {
        "valeur": "assiette des cotisations",
        "plancher": "assiette minimale . retraite"
      },
      "tranches": [
        {
          "taux": {
            "nom": "taux",
            "valeur": "17.75%"
          },
          "plafond": "plafond sécurité sociale"
        },
        {
          "taux": "0.6%"
        }
      ]
    },
    "arrondi": "oui",
    "références": {
      "Cotisation minimale": "https://www.secu-independants.fr/cotisations/calcul-des-cotisations/cotisations-minimales/"
    }
  },
  "dirigeant . indépendant . cotisations et contributions . retraite complémentaire": {
    "barème": {
      "assiette": "assiette des cotisations",
      "tranches": [
        {
          "taux": "7%",
          "plafond": {
            "nom": "plafond",
            "acronyme": "PRCI",
            "titre global": "plafond retraite complémentaire des indépendants",
            "valeur": {
              "variations": [
                {
                  "si": "date >= 01/2022",
                  "alors": "38916 €/an"
                },
                {
                  "si": "date >= 01/2021",
                  "alors": "38493 €/an"
                }
              ]
            }
          }
        },
        {
          "taux": "8%",
          "plafond": "4 * plafond sécurité sociale"
        }
      ]
    },
    "arrondi": "oui",
    "unité": "€/an",
    "références": {
      "Fiche Urssaf": "https://www.urssaf.fr/portail/home/taux-et-baremes/taux-de-cotisations/artisans-commercants-et-professi/bases-de-calcul-et-taux-des-coti.html"
    }
  },
  "dirigeant . indépendant . cotisations et contributions . invalidité et décès": {
    "produit": {
      "assiette": {
        "valeur": "assiette des cotisations",
        "plancher": "assiette minimale . retraite",
        "plafond": "plafond sécurité sociale"
      },
      "taux": "1.3%"
    },
    "unité": "€/an",
    "arrondi": "oui",
    "références": {
      "Cotisation minimale": "https://www.secu-independants.fr/cotisations/calcul-des-cotisations/cotisations-minimales/"
    }
  },
  "dirigeant . indépendant . cotisations et contributions . CSG-CRDS": {
    "formule": {
      "produit": {
        "assiette": "assiette",
        "composantes": [
          {
            "attributs": {
              "nom": "non déductible",
              "arrondi": "oui",
              "unité": "€/an"
            },
            "composantes": [
              {
                "taux": {
                  "nom": "taux",
                  "valeur": "2.9%"
                }
              },
              {
                "attributs": {
                  "nom": "revenus de remplacement"
                },
                "assiette": "dirigeant . indépendant . IJSS . montant",
                "taux": "non déductible . taux"
              }
            ]
          },
          {
            "attributs": {
              "nom": "déductible",
              "arrondi": "oui",
              "unité": "€/an"
            },
            "composantes": [
              {
                "taux": {
                  "nom": "taux",
                  "valeur": "6.8%"
                }
              },
              {
                "attributs": {
                  "nom": "revenus de remplacement"
                },
                "assiette": "dirigeant . indépendant . IJSS . montant",
                "taux": "3.8%"
              }
            ]
          }
        ]
      }
    },
    "références": {
      "fiche Urssaf": "https://www.urssaf.fr/portail/home/independant/mes-cotisations/quelles-cotisations/les-contributions-csg-crds/taux-de-la-csg-crds.html",
      "IJSS (amelie.fr)": "https://www.ameli.fr/assure/remboursements/indemnites-journalieres/arret-maladie",
      "IJSS (service-public.fr)": "https://www.service-public.fr/particuliers/vosdroits/F2971",
      "Article 154 quiquies du Code Général des Impôts": "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000038836652/"
    }
  },
  "dirigeant . indépendant . revenus étrangers": {
    "question": "Avez-vous perçu des revenus au titre de l’exercice d’une activité non salariée à l’étranger ?",
    "description": "Si vous exercez une activité non salariée hors de France, dans un État de l’Union Européenne (UE)\\*, de l’Espace Économique Européen (EEE)\\** ou en Suisse\nou dans un Etat hors UE/EEE/Suisse, avec lequel des dispositions de coordination des régimes de protection sociale s’appliquent,\net que l’exercice de votre activité non salariée hors de France a donné lieu à affiliation au régime général des travailleurs indépendants :\nindiquez le montant de votre revenu établi hors de France.\n\nEn effet, les revenus provenant d’une activité exercée hors de France sont uniquement soumis à cotisations sociales. Ces revenus ne sont pas soumis à la CSG-CRDS.\n\n\\* États de l’UE : Allemagne, Autriche, Belgique, Bulgarie, Chypre, Croatie, Danemark, Espagne, Estonie, Finlande, Grèce, Hongrie, Irlande,\nItalie, Lettonie, Lituanie, Luxembourg, Malte, Pays-Bas, Pologne, Portugal, République Tchèque, Roumanie, Slovaquie, Slovénie, Suède.\n\n\\** États l’EEE : Islande, Liechtenstein, Norvège.\n",
    "par défaut": "non"
  },
  "dirigeant . indépendant . revenus étrangers . montant": {
    "titre": "revenus perçu à l'étranger",
    "question": "Quel est leur montant ?",
    "par défaut": "0 €/an"
  },
  "dirigeant . indépendant . cotisations et contributions . CSG-CRDS . assiette": {
    "note": "Seule la partie imposable des IJSS est retranchée de l'assiette de la CSG, puisque la partie non imposable a déjà été retranchée du revenu net fiscal fourni",
    "valeur": {
      "somme": [
        "assiette des cotisations . sans plancher",
        "cotisations",
        "conjoint collaborateur . cotisations"
      ]
    },
    "abattement": {
      "somme": [
        "revenus étrangers . montant",
        "dirigeant . indépendant . IJSS . imposable"
      ]
    },
    "plancher": "0 €/mois"
  },
  "dirigeant . indépendant . cotisations et contributions . formation professionnelle": {
    "acronyme": "CFP",
    "produit": {
      "assiette": "plafond sécurité sociale",
      "taux": {
        "variations": [
          {
            "si": "entreprise . activité . nature = 'artisanale'",
            "alors": "0.29%"
          },
          {
            "si": "conjoint collaborateur",
            "alors": "0.34%"
          },
          {
            "sinon": "0.25%"
          }
        ]
      }
    },
    "unité": "€/an",
    "arrondi": "oui",
    "note": "Le taux n'est pas majoré pour les artisans avec conjoint collaborateur",
    "références": {
      "fiche service-public.fr": "https://www.service-public.fr/professionnels-entreprises/vosdroits/F23459",
      "fiche Urssaf": "https://www.urssaf.fr/portail/home/independant/mes-cotisations/quelles-cotisations/les-contributions-csg-crds/taux-de-la-csg-crds.html"
    }
  },
  "dirigeant . indépendant . cotisations et contributions . allocations familiales": {
    "produit": {
      "assiette": "assiette des cotisations",
      "taux": {
        "nom": "taux",
        "taux progressif": {
          "assiette": "assiette des cotisations",
          "multiplicateur": "plafond sécurité sociale",
          "tranches": [
            {
              "plafond": "110%",
              "taux": "0%"
            },
            {
              "plafond": "140%",
              "taux": "3.1%"
            }
          ]
        }
      }
    },
    "arrondi": "oui",
    "unité": "€/an"
  },
  "dirigeant . indépendant . cotisations et contributions . exonérations": {
    "formule": {
      "somme": [
        "ZFU",
        "ACRE"
      ]
    }
  },
  "dirigeant . indépendant . cotisations et contributions . exonérations . ZFU": {
    "applicable si": "établissement . ZFU",
    "produit": {
      "assiette": "maladie",
      "taux": "taux",
      "plafond": {
        "recalcul": {
          "avec": {
            "revenu professionnel": "3042 heures/an * SMIC . horaire"
          }
        }
      }
    },
    "arrondi": "oui",
    "unité": "€/an"
  },
  "dirigeant . indépendant . cotisations et contributions . exonérations . âge": {
    "question": "Bénéficiez-vous du dispositif d’exonération « âge pour la retraite » de la cotisation invalidité-décès ?",
    "description": "Ce dispositif a été arrêté en 2015, mais est toujours actif pour les personnes qui en bénéficiaient avant son abbrogation.",
    "par défaut": "non",
    "applicable si": "entreprise . date de création < 01/2016",
    "rend non applicable": "invalidité et décès"
  },
  "dirigeant . indépendant . cotisations et contributions . exonérations . pension invalidité": {
    "acronyme": "PI",
    "question": {
      "variations": [
        {
          "si": "dirigeant . indépendant . PL . PAMC",
          "alors": {
            "texte": "Êtes-vous titulaire d’une pension d’invalidité versée par votre caisse retraite ?"
          }
        },
        {
          "sinon": {
            "texte": "Êtes-vous titulaire d’une pension d’invalidité à titre de travailleur indépendant ?"
          }
        }
      ]
    },
    "description": "Si vous êtes titulaire d’une pension d’invalidité versée par un régime des travailleurs non-salariés\nnon agricoles, vous bénécifiez d’une exonération totale des cotisations de retraite complémentaire et\ndes cotisations maladie.\n\nPour que vous puissiez continuer à accumuler des points de retraite complémentaire comme les autres travailleurs,\nil vous est attribué des \"points gratuits\".\n\nEn règle générale, le nombre de points reçu correspond à la moyenne mensuelle des points cotisés\npendant la période d'activité indépendante avant versement de la pension.\n\n> Par exemple, si vous avez cotisé pendant 6 ans et 11 mois pour un total de 588 points,\n> le nombre de points gratuits reçu chaque mois sera de : `588 / (6 * 12 + 11) = 7,08`",
    "type": "notification",
    "niveau": "info",
    "par défaut": "non",
    "rend non applicable": [
      "exonérations . ZFU",
      "retraite complémentaire",
      "maladie",
      "indemnités journalières maladie"
    ],
    "référence": {
      "Notice RSI (PDF)": "https://www.secu-independants.fr/fileadmin/mediatheque/Espace_telechargement/Protection_sociale/Depliant_assur_invalidite.pdf#page=8",
      "Article D635-2 du code de la sécurité sociale": "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000041966510",
      "Article D621-4 du code de la sécurité sociale": "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000043656758",
      "Circulaire RSI 2013/004 du 17/01/2013": "https://www.legislation.cnav.fr/Documents/circulaire_rsi_2013_004_17012013.pdf#page=24"
    }
  },
  "dirigeant . indépendant . cotisations et contributions . exonérations . ZFU . taux": {
    "taux progressif": {
      "assiette": "entreprise . durée d'activité . en fin d'année",
      "retourne seulement le taux": "oui",
      "variations": [
        {
          "si": "entreprise . salariés . effectif < 5",
          "alors": {
            "tranches": [
              {
                "plafond": "5 ans",
                "taux": "100%"
              },
              {
                "plafond": "6 ans",
                "taux": "60%"
              },
              {
                "plafond": "10 ans",
                "taux": "60%"
              },
              {
                "plafond": "11 ans",
                "taux": "40%"
              },
              {
                "plafond": "12 ans",
                "taux": "40%"
              },
              {
                "plafond": "13 ans",
                "taux": "20%"
              },
              {
                "plafond": "14 ans",
                "taux": "20%"
              },
              {
                "plafond": "15 ans",
                "taux": "0%"
              }
            ]
          }
        },
        {
          "sinon": {
            "tranches": [
              {
                "plafond": "5 ans",
                "taux": "100%"
              },
              {
                "plafond": "6 ans",
                "taux": "60%"
              },
              {
                "plafond": "7 ans",
                "taux": "40%"
              },
              {
                "plafond": "8 ans",
                "taux": "20%"
              },
              {
                "plafond": "9 ans",
                "taux": "0%"
              }
            ]
          }
        }
      ]
    }
  },
  "dirigeant . indépendant . cotisations et contributions . exonérations . covid": {
    "applicable si": {
      "toutes ces conditions": [
        "date >= 01/2020",
        "date <= 31/12/2021"
      ]
    },
    "titre": "Réduction de cotisation Covid",
    "remplace": [
      {
        "règle": "cotisations",
        "par": {
          "valeur": "cotisations",
          "abattement": "exonérations . covid . part cotisations"
        }
      },
      {
        "règle": "CSG-CRDS . non déductible",
        "par": {
          "valeur": "CSG-CRDS . non déductible",
          "abattement": "exonérations . covid . part CSG . non déductible"
        }
      },
      {
        "règle": "CSG-CRDS . déductible",
        "par": {
          "valeur": "CSG-CRDS . déductible",
          "abattement": "exonérations . covid . part CSG . déductible"
        }
      }
    ],
    "question": "Remplissez-vous les conditions pour bénéficier de la réduction des cotisations et contributions sociales 2021 liées à la crise du Covid-19 ?",
    "description": "Dans le cadre de la crise sanitaire, le Gouvernement a mis en œuvre plusieurs mesures exceptionnelles concernant les cotisations et contributions sociales des travailleurs indépendants affectés par la crise du coronavirus.\n\nPour les cotisations et contributions sociales 2021, deux dispositifs de réduction sont applicables :\n- le dispositif de réduction prévu par la loi de financement de la sécurité sociale (LFSS) 2021(1) dans le cadre de la seconde période d’état d’urgence sanitaire débutant à l’automne 2020,\n- le dispositif complémentaire prévu par la 1ère loi de finance rectificative (LFR1) 2021(2) pour les périodes à compter de juin 2021,\n\n(1) Décret 2021-75 du 27 janvier 2021 pris en application de l’article 9 de la loi n° 2020-1576 du 14 décembre 2020 de financement de la sécurité sociale pour 2021.\nDécrets relatifs à la prolongation de ces mesures : Décret 2021-1410 du 29 octobre 2021 - Décret 2021-1956 du 31 décembre 2021 – Décret 2022-170 du 11 février 2022\n\n(2) Décret 2021-1094 du 19 août 2021 pris en application de l'article 25 de la loi n° 2021-953 du 19 juillet 2021 de finances rectificative pour 2021.\n\n**Ces mesures s’adressent aux travailleurs indépendants dont l’activité principale relève d’un des secteurs suivants et sous certaines autres conditions d’éligibilité :**\n- secteur dit S1 : secteurs du tourisme, de l’hôtellerie, de la restauration, du sport, de la culture, du transport aérien et de l’événementiel\n- secteur dit S1 bis : secteurs dont l’activité dépend de celle des secteurs 1\n- secteur dit S2 : autres secteurs d’activité qui ont fait l’objet d’une interdiction affectant de manière prépondérante la poursuite de leur activité\n\n[Voir la liste détaillée des activités des différents secteurs](https://www.urssaf.fr/portail/files/live/sites/urssaf/files/documents/liste-secteurs-pour-infographie.pdf)\n\n**Bon à savoir :** \tLes activités de livraison, de retrait de commande ou de vente à emporter ne sont pas prises en compte pour apprécier le respect de la condition d’interdiction d’accueil du public.\nLe couvre-feu n’est pas considéré comme une mesure d’interdiction d’accueil du public.\n\n### Conditions d’éligibilité et montant de la réduction :\nLa réduction s’applique aux cotisations et contributions sociales personnelles définitives 2021 dues à l’Urssaf.\n\nLes conditions d’éligibilité s’évaluent mois par mois, le montant de la réduction également.\n\nPour plus d’information, et connaitre le montant de l’exonération dont vous pouvez bénéficier, vous pouvez utiliser le [simulateur d’exonération COVID](/simulateurs/exonération-covid \"Nouvelle fenêtre\").",
    "par défaut": "non"
  },
  "dirigeant . indépendant . cotisations et contributions . exonérations . covid . montant": {
    "question": "Quel est le montant de l’exonération sociale liée à la crise sanitaire pour les cotisations de l’année 2021 ?",
    "description": "Pour connaître le montant de l'exonération, vous pouvez utiliser le simulateur d'exonération COVID.\n\n[Accéder au simulateur](/simulateurs/exonération-covid \"Nouvelle fenêtre\")",
    "par défaut": "0 €/an"
  },
  "dirigeant . indépendant . cotisations et contributions . exonérations . covid . conjoint collaborateur": {
    "applicable si": "conjoint collaborateur",
    "remplace": {
      "règle": "conjoint collaborateur . cotisations",
      "par": {
        "valeur": "conjoint collaborateur . cotisations",
        "abattement": "exonérations . covid . conjoint collaborateur"
      }
    },
    "valeur": "montant"
  },
  "dirigeant . indépendant . cotisations et contributions . exonérations . covid . total": {
    "description": "Intégrée dans le montant des cotisations affiché ci-dessus",
    "somme": [
      "montant",
      "conjoint collaborateur"
    ]
  },
  "dirigeant . indépendant . cotisations et contributions . exonérations . covid . part cotisations": {
    "titre": "Part réduction Covid sur cotisations (hors CSG/CRDS)",
    "arrondi": "oui",
    "unité": "€/an",
    "résoudre la référence circulaire": "oui",
    "produit": {
      "assiette": "montant",
      "taux": "pourcentage cotisations"
    }
  },
  "dirigeant . indépendant . cotisations et contributions . exonérations . covid . pourcentage cotisations": {
    "unité": "%",
    "valeur": "cotisations / (cotisations + CSG-CRDS)"
  },
  "dirigeant . indépendant . cotisations et contributions . exonérations . covid . part CSG": {
    "titre": "Part réduction Covid sur CSG",
    "valeur": "montant - part cotisations"
  },
  "dirigeant . indépendant . cotisations et contributions . exonérations . covid . part CSG . déductible": {
    "titre": "Part réduction Covid sur CSG/CRDS déductible",
    "produit": {
      "assiette": "part CSG",
      "taux": "CSG-CRDS . déductible . taux / taux CSG"
    },
    "arrondi": "oui",
    "unité": "€/an"
  },
  "dirigeant . indépendant . cotisations et contributions . exonérations . covid . part CSG . non déductible": {
    "titre": "Part réduction Covid sur CSG/CRDS non déductible",
    "valeur": "part CSG - part CSG . déductible"
  },
  "dirigeant . indépendant . cotisations et contributions . exonérations . covid . taux CSG": {
    "unité": "%",
    "somme": [
      "CSG-CRDS . non déductible . taux",
      "CSG-CRDS . déductible . taux"
    ]
  },
  "dirigeant . indépendant . cotisations et contributions . maladie domiciliation fiscale étranger": {
    "applicable si": "situation personnelle . domiciliation fiscale à l'étranger",
    "titre": "Maladie (domiciliation fiscale à l'étranger)",
    "description": "En contrepartie de l'exonération de CSG, les cotisants ont un taux maladie plus elevé. Contrairement aux autres assurés commerçants/artisans ils ne bénéficient pas de la réduction du taux de la cotisation maladie en fonction du revenu déclaré.",
    "remplace": "maladie",
    "produit": {
      "assiette": "assiette des cotisations",
      "taux": "14.5%"
    },
    "unité": "€/an",
    "arrondi": "oui"
  },
  "dirigeant . indépendant . IJSS": {
    "titre": "Allocations et indemnités journalières de sécurité sociale",
    "description": "Il s’agit des allocations et indemnités journalières versées par votre caisse primaire d’assurance maladie en cas de maladie, maternité, paternité ou adoption, arrêt de travail ou garde d’enfant en lien avec l’épidémie de Covid-19.\n\nCes revenus de remplacement sont demandés spécifiquement car ils bénéficient d’un taux réduit de CSG-CRDS.\n\nLes indemnités complémentaires versées dans le cadre de contrats de prévoyance privés (y compris contrat Madelin) ne sont pas concernées.\n\nLes prestations d’invalidité versées par les régimes d’invalidité-décès ne sont pas concernées.\n",
    "question": "Avez-vous perçu des indemnités journalières ou allocations de sécurité sociale au titre de votre activité indépendante (maladie, maternité, paternité, adoption) ?",
    "par défaut": "non"
  },
  "dirigeant . indépendant . IJSS . montant": {
    "titre": "Montant total",
    "question": "Quel est le montant brut total de vos allocations et indemnités journalières de sécurité sociale ?",
    "description": "Indiquez le montant total brut de vos allocations et indemnités journalières perçues, imposables et non imposables, qui figure sur le relevé de prestations fourni par votre caisse primaire d’assurance maladie.\n\nCes revenus de remplacement sont soumis au taux réduit de CSG-CRDS.\n\n<p><u>Les allocations et indemnités journalières concernées sont :</u></p>\n- indemnité journalière maladie\n- allocation forfaitaire de repos maternel\n- indemnité journalière forfaitaire d’interruption d’activité (maternité)\n- indemnité de remplacement pour maternité, paternité ou adoption\n",
    "par défaut": "0 €/an"
  },
  "dirigeant . indépendant . IJSS . imposable": {
    "titre": "part imposable",
    "résumé": "Uniquement si vous ne relevez pas du régime micro-fiscal",
    "question": "Quel est le montant brut imposable de vos allocations et indemnités journalières de sécurité sociale ?",
    "description": "Indiquez uniquement le montant des allocations et indemnités journalières imposables perçues, c’est-à-dire l’ensemble des allocations et indemnités, à l’exception de celles en lien avec une affection de longue durée.\n\nCes indemnités seront déduites de vos revenus d’activité, afin d’être soumises au taux réduit de la CSG-CRDS.\n\n<p><u>Les revenus de remplacement concernés sont :</u></p>\n- indemnité journalière maladie\n- allocation forfaitaire de repos maternel\n- indemnité journalière forfaitaire d’interruption d’activité (maternité)\n- indemnité de remplacement pour maternité, paternité ou adoption\n",
    "par défaut": "0 €/an"
  },
  "entreprise . activité": {
    "titre": "activité principale",
    "type": "texte",
    "références": {
      "Activité de votre entreprise : code APE, code NAF, qu'est-ce que c'est ?": "https://www.economie.gouv.fr/entreprises/activite-entreprise-code-ape-code-naf",
      "À quoi correspond le code APE (code NAF) ?": "https://entreprendre.service-public.fr/vosdroits/F33050"
    }
  },
  "entreprise . activité . nature": {
    "titre": "nature de l'activité",
    "question": "Quelle est la nature de votre activité principale ?",
    "description": "Votre type d'activité va déterminer une grande partie des calculs de cotisations, contributions et impôt.",
    "par défaut": "'commerciale'",
    "formule": {
      "une possibilité": {
        "choix obligatoire": "oui",
        "possibilités": [
          "artisanale",
          "commerciale",
          "libérale"
        ]
      }
    },
    "références": {
      "Vérifier la nature de son activité": "https://bpifrance-creation.fr/encyclopedie/trouver-proteger-tester-son-idee/verifiertester-son-idee/verifier-nature-son-activite",
      "Comment déterminer la nature de l'activité d'une entreprise ?": "https://entreprendre.service-public.fr/vosdroits/F32887/personnalisation/resultat",
      "Spécifiquement pour les auto-entrepreneurs": "https://www.shine.fr/blog/categorie-activite-auto-entrepreneur"
    }
  },
  "entreprise . activité . nature . libérale": {
    "question": "Votre activité est-elle une profession libérale ?",
    "valeur": "activité . nature = 'libérale'",
    "description": "Une activité libérale consiste en des prestations de services de nature principalement intellectuelles.\n\nVous rendez un service payant.\n\nVous devez avoir un diplôme ou une qualification professionnelle dans le domaine.\n",
    "références": {
      "Comment savoir si votre entreprise est libérale ?": "https://entreprendre.service-public.fr/vosdroits/F32887/personnalisation/resultat?lang=&quest0=1&quest=#fiche-item-aria-3situation1",
      "fiche Wikipedia": "https://fr.wikipedia.org/wiki/Profession_lib%C3%A9rale",
      "liste des professions libérales": "https://bpifrance-creation.fr/encyclopedie/trouver-proteger-tester-son-idee/verifiertester-son-idee/liste-professions-liberales"
    }
  },
  "entreprise . activité . nature . commerciale": {
    "valeur": "activité . nature = 'commerciale'",
    "description": "Votre activité est commerciale si vous êtes dans l'un des cas suivants :\n\n- Vous achetez des biens ou des marchandises pour les revendre dans un but lucratif : Qui rapporte de l'argent, du profit, des bénéfices\n- Vous vendez des services dans les domaines de l'hôtellerie, la restauration, les transports, les spectacles, la sécurité, l'informatique, le design, etc.\n- Vous avez une activité de location de biens, de marchandises ou de services\n",
    "références": {
      "Comment savoir si votre activité est commerciale": "https://entreprendre.service-public.fr/vosdroits/F32887/personnalisation/resultat?lang=&quest0=1&quest=#fiche-item-aria-1situation1"
    }
  },
  "entreprise . activité . nature . artisanale": {
    "valeur": "activité . nature = 'artisanale'",
    "description": "Pour être artisan, vous devez répondre aux 3 critères suivants :\n\n- Votre activité doit faire partie de la liste officielle des métiers de l'artisanat ou de la liste officielle des métiers d'artisanat d'art\n- Votre entreprise doit compter moins de 11 salariés à sa création\n- Vous devez détenir un savoir-faire spécifique et le prouver par un diplôme (CAP, BEP, etc.) ou une qualification professionnelle\n",
    "références": {
      "Comment savoir si votre activité est artisanale ?": "https://entreprendre.service-public.fr/vosdroits/F32887/personnalisation/resultat?lang=&quest0=1&quest=#fiche-item-aria-2situation1",
      "liste des activités artisanales": "https://bpifrance-creation.fr/encyclopedie/trouver-proteger-tester-son-idee/verifiertester-son-idee/activites-artisanales-0"
    }
  },
  "entreprise . activité . service ou vente": {
    "experimental": "oui",
    "non applicable si": "mixte",
    "applicable si": {
      "une de ces conditions": [
        "activité . nature = 'artisanale'",
        "activité . nature = 'commerciale'"
      ]
    },
    "question": "Quelle est le type d'activité de l'entreprise ?",
    "formule": {
      "une possibilité": {
        "choix obligatoire": "oui",
        "possibilités": [
          "vente",
          "service"
        ]
      }
    },
    "par défaut": "'vente'"
  },
  "entreprise . activité . service ou vente . vente": {
    "titre": "vente de biens, restauration ou hébergement",
    "description": "Il s’agit de toute opération comportant transfert de propriété d'un bien\ncorporel (c'est-à-dire un bien ayant une existence matérielle), ainsi que\ntoutes les activités de restauration et d'hébergement.\n",
    "références": {
      "page impots.gouv.fr": "https://www.impots.gouv.fr/portail/professionnel/achatvente-de-biens"
    }
  },
  "entreprise . activité . service ou vente . service": {
    "titre": "prestation de service",
    "description": "Il s’agit de toute opération ne comportant pas de transfert de propriété de\nbiens corporels (c'est-à-dire ayant une existence matérielle).\n",
    "références": {
      "page impots.gouv.fr": "https://www.impots.gouv.fr/portail/professionnel/prestations-entre-assujettis"
    }
  },
  "entreprise . activité . mixte": {
    "experimental": "oui",
    "titre": "Activités mixtes",
    "applicable si": "imposition . régime . micro-entreprise",
    "question": "Votre entreprise a-t-elle plusieurs types d'activités ?",
    "par défaut": "non",
    "description": "Il est possible d'avoir plusieurs activités avec des types de revenus\ndifférents pour une même entreprise.\n\nPar exemple, une entreprise de plomberie qui facture l'achat et la pose d'un\nrobinet a une partie de son chiffre d'affaires en vente de materiel (le robinet)\net une partie en prestation de service (la pose).\n\nIl existe trois catégories avec des taux d’abattement forfaitaire pour frais différents :\n\n- [Ventes de biens, restauration et hébergement (BIC)](/documentation/entreprise/chiffre-d'affaires/vente-restauration-hébergement) (abattement de 71%)\n- [Prestation de service commerciale ou artisanale (BIC)](/documentation/entreprise/chiffre-d'affaires/service-BIC) (abattement de 50%)\n- [Autres prestation de service et activité libérale (BNC)](/documentation/entreprise/chiffre-d'affaires/service-BNC) (abattement de 34%)\n\nSi votre entreprise a des activités correspondants à plusieurs catégories de\nrevenus, répondez oui à cette question.\n"
  },
  "entreprise . activité . mixte . proportions": {
    "description": "Part des différentes activités dans le chiffre d'affaires",
    "titre": "proportion activité",
    "unité": "%",
    "somme": [
      {
        "nom": "service BIC",
        "variations": [
          {
            "si": "activité . nature = 'libérale'",
            "alors": "0%"
          },
          {
            "sinon": "50%"
          }
        ]
      },
      {
        "nom": "service BNC",
        "variations": [
          {
            "si": "activité . nature = 'libérale'",
            "alors": "2 / 3"
          },
          {
            "sinon": "0%"
          }
        ]
      },
      {
        "nom": "vente restauration hébergement",
        "variations": [
          {
            "si": "activité . nature = 'libérale'",
            "alors": "1 / 3"
          },
          {
            "sinon": "50%"
          }
        ]
      }
    ],
    "note": "Il appartient à l'utilisateur de bien vérifier que la somme des trois pourcentages renseignés vaut 100%."
  },
  "entreprise . activité . nature . libérale . réglementée": {
    "question": "Est-ce une activité libérale réglementée ?",
    "par défaut": "non",
    "description": "Certaines professions libérales ont été classées dans le domaine libéral par la loi et leur titre est protégé. Leurs membres doivent respecter des règles déontologiques strictes et sont soumis au contrôle de leurs instances professionnelles (ordre, chambre, ou syndicat).\n\n> Exemples de professions règlementées : architecte, avocat, infirmier, médecin...\n\nIl s'agit des autres personnes qui pratiquent, une science ou un art et dont l'activité intellectuelle joue le principal rôle. Leurs recettes doivent représenter la rémunération d'un travail personnel, sans lien de subordination, tout en engageant leur responsabilité technique et morale.\n\n> Exemples de professions non-règlementées : développeur, historien, urbaniste...\n",
    "références": {
      "Liste des activités libérales": "https://bpifrance-creation.fr/encyclopedie/trouver-proteger-tester-son-idee/verifiertester-son-idee/liste-professions-liberales"
    }
  },
  "entreprise . activité . débit de tabac": {
    "experimental": "oui",
    "applicable si": "activité . nature = 'commerciale'",
    "question": "Exercez-vous une activité de vente de tabac ?",
    "par défaut": "non"
  },
  "entreprise . catégorie juridique": {
    "description": "Les catégories juridiques accessibles via l'API SIRENE\n",
    "par défaut": "non",
    "une possibilité": {
      "choix obligatoire": "oui",
      "possibilités": [
        "EI",
        "SARL",
        "SAS",
        "autre"
      ]
    },
    "références": {
      "liste des catégories juridique de l'INSEE": "https://www.insee.fr/fr/information/2028129"
    },
    "note": "On se base ici sur les catégories juridiques définies par l'INSEE"
  },
  "entreprise . catégorie juridique . EI": {
    "titre": "EI ou EIRL",
    "valeur": "catégorie juridique = 'EI'"
  },
  "entreprise . catégorie juridique . EI . auto-entrepreneur": {
    "question": "Êtes-vous auto-entrepreneur ?",
    "par défaut": {
      "nom": "défaut",
      "valeur": "oui"
    },
    "remplace": [
      {
        "règle": "imposition . régime",
        "par": "'micro-entreprise'"
      },
      {
        "règle": "entreprise . imposition",
        "par": "'IR'"
      }
    ]
  },
  "entreprise . catégorie juridique . SARL": {
    "titre": "EURL ou SARL",
    "valeur": "catégorie juridique = 'SARL'"
  },
  "entreprise . catégorie juridique . SARL . unipersonnelle": {
    "titre": "EURL",
    "description": "Une EURL est une entreprise avec un seul associé. Cela signifie que vous êtes le seul et unique propriétaire de l'entreprise.",
    "question": "Votre entreprise est-elle une EURL ?",
    "par défaut": "oui"
  },
  "entreprise . catégorie juridique . SELARL": {
    "valeur": "catégorie juridique = 'SELARL'",
    "remplace": [
      {
        "règle": "entreprise . activité . nature",
        "par": "'libérale'"
      },
      {
        "règle": "entreprise . activité . nature . libérale . réglementée",
        "par": "oui"
      }
    ]
  },
  "entreprise . catégorie juridique . SELAS": {
    "valeur": "catégorie juridique = 'SELAS'",
    "remplace": [
      {
        "règle": "entreprise . activité . nature",
        "par": "'libérale'"
      },
      {
        "règle": "entreprise . activité . nature . libérale . réglementée",
        "par": "oui"
      }
    ]
  },
  "entreprise . catégorie juridique . SAS": {
    "titre": "SASU ou SAS",
    "valeur": "catégorie juridique = 'SAS'"
  },
  "entreprise . catégorie juridique . SAS . unipersonnelle": {
    "titre": "SASU",
    "question": "Votre entreprise est-elle une SASU ?",
    "par défaut": "oui"
  },
  "entreprise . catégorie juridique . autre": {
    "valeur": "catégorie juridique = 'autre'"
  },
  "entreprise": {
    "icônes": "🏢🧑‍💼👷‍♂️🧑‍🏭"
  },
  "entreprise . SIREN": {
    "description": "Le numéro Siren est un numéro de 9 chiffres unique pour chaque entreprise. Ex : 401237780\n",
    "type": "texte"
  },
  "entreprise . nom": {
    "type": "texte"
  },
  "entreprise . date de création": {
    "question": "Quelle est votre date de début d'activité ?",
    "par défaut": "01/01/2021",
    "description": "La date de début d'activité (ou date de création) est fixée lors de la\ndéclaration de votre entreprise.\n\nVous pouvez [renseigner votre entreprise](/gérer), pour préremplir\nautomatiquement cette information.\n\nSi vous n'avez pas le jour exact, le mois suffit en général pour une bonne\napproximation.\n",
    "suggestions": {
      "Début 2022": "01/01/2022",
      "Début 2021": "01/01/2021",
      "Il y a 10 ans": "01/01/2012"
    },
    "type": "date"
  },
  "entreprise . date de création . contrôle date future": {
    "type": "notification",
    "sévérité": "avertissement",
    "formule": "date de création > 01/2025",
    "description": "Nous ne pouvons voir aussi loin dans le futur"
  },
  "entreprise . date de création . contrôle date passée": {
    "type": "notification",
    "sévérité": "avertissement",
    "formule": "date de création < 01/1900",
    "description": "Il s'agit d'une très vieille entreprise ! Êtes-vous sûr de ne pas vous être trompé dans la saisie ?"
  },
  "entreprise . durée d'activité": {
    "durée": {
      "depuis": "date de création"
    }
  },
  "entreprise . durée d'activité . en fin d'année": {
    "somme": [
      {
        "durée": {
          "depuis": "date de création",
          "jusqu'à": "période . fin d'année"
        }
      },
      "1 jour"
    ]
  },
  "entreprise . durée d'activité . en début d'année": {
    "durée": {
      "depuis": "date de création",
      "jusqu'à": "période . début d'année"
    }
  },
  "entreprise . chiffre d'affaires": {
    "question": "Quel est votre chiffre d'affaires envisagé ?",
    "identifiant court": "CA",
    "résumé": "Montant total des recettes brutes (hors taxe)",
    "unité": "€/an",
    "variations": [
      {
        "si": "dirigeant . auto-entrepreneur",
        "alors": "dirigeant . auto-entrepreneur . chiffre d'affaires"
      },
      {
        "sinon": {
          "somme": [
            "dirigeant . rémunération . net . après impôt",
            "dirigeant . rémunération . impôt",
            "dirigeant . rémunération . cotisations",
            "charges",
            {
              "applicable si": "imposition . IS",
              "somme": [
                "imposition . IS . résultat net",
                "imposition . IS"
              ]
            }
          ],
          "plancher": "0€/an",
          "arrondi": "oui"
        }
      }
    ]
  },
  "entreprise . chiffre d'affaires . vente restauration hébergement": {
    "titre": "Vente de biens, restauration, hébergement (BIC)",
    "résumé": "Chiffre d'affaires hors taxe",
    "question": "Quel est le chiffre d'affaires issu de la vente de biens, restauration ou hébergement ?",
    "unité": "€/an",
    "variations": [
      {
        "si": "activité . mixte",
        "alors": {
          "produit": {
            "assiette": "chiffre d'affaires",
            "taux": "activité . mixte . proportions . vente restauration hébergement"
          }
        }
      },
      {
        "sinon": {
          "applicable si": "activité . service ou vente = 'vente'",
          "valeur": "chiffre d'affaires"
        }
      }
    ],
    "arrondi": "oui",
    "plancher": "0€/an",
    "par défaut": "0€/an",
    "description": "### Vente de biens\nIl s’agit du chiffre d'affaires de toutes les opérations comportant\ntransfert de propriété d'un bien corporel, c'est-à-dire un bien ayant une\nexistence matérielle.\n\n### Restauration et hébergement\nIl s’agit du chiffre d'affaires de toutes les opérations de restauration\nou hébergement\n\n> Note : pour les locations meublées, seules les locations de meublé de tourisme classé et de chambre d’hôte entrent dans cette catégorie hébergement ; les autres locations meublées relèvent de la catégorie « Prestations de service BIC »\n\nCes revenus sont imposables dans la catégorie des BIC\n",
    "références": {
      "service-public.fr": "https://www.service-public.fr/professionnels-entreprises/vosdroits/F32919",
      "définition vente de bien (impots.gouv)": "https://www.impots.gouv.fr/portail/professionnel/achatvente-de-biens"
    }
  },
  "entreprise . chiffre d'affaires . service BIC": {
    "unité": "€/an",
    "plancher": "0€/an",
    "arrondi": "oui",
    "résumé": "Chiffre d'affaires hors taxe",
    "titre": "Prestations de service commerciales ou artisanales (BIC)",
    "question": "Quel est le chiffre d'affaires issu de prestations de service commerciales ou artisanales ?",
    "description": "Il s’agit de toute opération ne comportant pas de transfert de propriété de\nbiens corporels (c'est-à-dire ayant une existence matérielle), dont\nl'activité manuelle joue le principal rôle.\n\nPour simplifier on pourrait dire que ce sont toutes les prestations de\nservices qui nécessite plus qu'un ordinateur pour être effectuées.\n\n**Exemples** : transports, service à la personne, réparation etc.\n",
    "par défaut": "0€/an",
    "variations": [
      {
        "si": "activité . mixte",
        "alors": {
          "produit": {
            "assiette": "chiffre d'affaires",
            "taux": "activité . mixte . proportions . service BIC"
          }
        }
      },
      {
        "sinon": {
          "applicable si": "activité . service ou vente = 'service'",
          "valeur": "chiffre d'affaires"
        }
      }
    ],
    "références": {
      "service-public.fr": "https://www.service-public.fr/professionnels-entreprises/vosdroits/F32919"
    }
  },
  "entreprise . chiffre d'affaires . service BNC": {
    "titre": "Autres prestations de service et activités libérales (BNC)",
    "résumé": "Recettes hors taxes",
    "question": "Quelles sont les recettes issues de l’activité libérale ?",
    "arrondi": "oui",
    "par défaut": "0€/an",
    "plancher": "0€/an",
    "description": "Ce sont toutes les opérations dont l'activité intellectuelle tient\nun rôle essentiel.\n\n**Exemples** : conseil, accompagnement, traduction, développement,\nformation, enseignement, sportif\n\nLes revenus tirés de ce chiffre d'affaires sont imposable au régime BNC (bénéfices non commerciaux)\n",
    "variations": [
      {
        "si": "activité . mixte",
        "alors": {
          "produit": {
            "assiette": "chiffre d'affaires",
            "taux": "activité . mixte . proportions . service BNC"
          }
        }
      },
      {
        "sinon": {
          "applicable si": "activité . nature = 'libérale'",
          "valeur": "chiffre d'affaires"
        }
      }
    ],
    "références": {
      "liste des activités libérales": "https://bpifrance-creation.fr/encyclopedie/trouver-proteger-tester-son-idee/verifiertester-son-idee/liste-professions-liberales"
    }
  },
  "entreprise . chiffre d'affaires . service": {
    "titre": "Chiffre d'affaires de prestation de service",
    "description": "Il s’agit de toute opération ne comportant pas de transfert de propriété de\nbiens corporels (c'est-à-dire ayant une existence matérielle)\n",
    "unité": "€/an",
    "somme": [
      "service BIC",
      "service BNC"
    ]
  },
  "entreprise . chiffre d'affaires . BIC": {
    "description": "Le chiffre d'affaires correspondant au revenus imposable au titre des bénéfice industriels et commerciaux (BIC ou micro-BIC).\n",
    "unité": "€/an",
    "somme": [
      "service BIC",
      "vente restauration hébergement"
    ]
  },
  "entreprise . TVA . franchise de TVA": "oui",
  "entreprise . TVA . franchise de TVA . seuil vente": {
    "variations": [
      {
        "si": "établissement . commune . département . outre-mer . Guadeloupe Réunion Martinique",
        "alors": "110000 €/an"
      },
      {
        "sinon": "94300 €/an"
      }
    ],
    "références": {
      "Fiche service-public.fr": "https://www.service-public.fr/professionnels-entreprises/vosdroits/F21746"
    }
  },
  "entreprise . TVA . franchise de TVA . seuil service": {
    "variations": [
      {
        "si": "établissement . commune . département . outre-mer . Guadeloupe Réunion Martinique",
        "alors": "60000 €/an"
      },
      {
        "si": "dirigeant . indépendant . PL . métier = 'avocat'",
        "alors": "44500 €"
      },
      {
        "sinon": "36500 €/an"
      }
    ],
    "références": {
      "Fiche service-public.fr": "https://www.service-public.fr/professionnels-entreprises/vosdroits/F21746"
    }
  },
  "entreprise . TVA . franchise de TVA . seuils dépassés": {
    "type": "notification",
    "une de ces conditions": [
      "chiffre d'affaires > seuil vente + seuil service",
      "chiffre d'affaires . vente restauration hébergement > seuil vente",
      "chiffre d'affaires . service > seuil service"
    ],
    "résumé": "Le seuil annuel de chiffre d'affaires pour la franchise de TVA est dépassé.\n",
    "description": "La franchise de TVA est un dispositif qui exonère les entreprises de la\ndéclaration et du paiement de la TVA. Il s'applique en dessous d'un seuil de\nchiffre d'affaire annuel dépendant de l'activité.\n\nLe professionnel qui relève de ce dispositif facture ses prestations ou ses\nventes en hors taxe, et ne peut pas déduire la TVA de ses achats.\n",
    "note": "On prend compte ici des seuils majorés (qui s'appliquent si le seuil \"minoré\" n'a pas été dépassé en année `n - 2`)\n",
    "références": {
      "Fiche service-public.fr": "https://www.service-public.fr/professionnels-entreprises/vosdroits/F21746"
    }
  },
  "entreprise . résultat fiscal": {
    "unité": "€/an",
    "somme": [
      "chiffre d'affaires",
      "(- charges)",
      "(- rémunération dirigeant déductible)"
    ]
  },
  "entreprise . résultat fiscal . rémunération dirigeant déductible": {
    "titre": "charges déductibles dirigeant",
    "description": "Les montants liés à la rémunération du dirigeant qui sont déductibles d'impôt.",
    "variations": [
      {
        "si": "imposition . IS",
        "alors": "dirigeant . rémunération . totale"
      },
      {
        "sinon": {
          "valeur": "dirigeant . indépendant . cotisations et contributions",
          "abattement": "dirigeant . indépendant . cotisations et contributions . non déductibles"
        }
      }
    ]
  },
  "entreprise . exercice": {
    "avec": {
      "début": {
        "type": "date",
        "par défaut": "période . début d'année"
      },
      "fin": {
        "type": "date",
        "par défaut": "période . fin d'année"
      },
      "durée": {
        "titre": "durée de l'exercice",
        "formule": {
          "durée": {
            "depuis": "début",
            "jusqu'à": "fin"
          }
        }
      },
      "date trop ancienne": {
        "type": "notification",
        "sévérité": "avertissement",
        "formule": "début < 01/01/2018",
        "description": "La date saisie est trop ancienne. Le simulateur n'intègre pas les barèmes avant 2018."
      },
      "début après la fin": {
        "type": "notification",
        "sévérité": "avertissement",
        "formule": "début >= fin",
        "description": "La fin de l'exercice doit être postérieure à son début."
      },
      "durée maximale": {
        "type": "notification",
        "sévérité": "avertissement",
        "formule": "durée >= 24 mois",
        "description": "La durée maximale d'un exercice comptable est de 24 mois."
      }
    }
  },
  "entreprise . charges": {
    "synonymes": [
      "charges d'exploitation",
      "charges de fonctionnement"
    ],
    "titre": "charges (hors rémunération dirigeant)",
    "identifiant court": "charges",
    "résumé": "Toutes les dépenses nécessaires à l'entreprise",
    "question": "Quelles sont les charges de l'entreprise ?",
    "description": "\nCe sont les dépenses de l'entreprise engagées dans l'intérêt de celle-ci, hors rémunération du dirigeant. Pour les sociétés et entreprises hors auto-entrepreneur, ces charges sont dites déductibles du résultat : l'entreprise ne paiera pas de cotisations ou impôt dessus. Pour l'auto-entrepreneur, elles ne sont pas déductibles du chiffre d'affaires encaissé.\n\nNous ne traitons pas encore la TVA : les charges sont à renseigner hors taxe (excepté pour les auto-entrepreneurs en franchise de TVA)\n\nPar exemple, les charges peuvent être :\n\n- achat de matières premières pour une activité de production\n- achat de produits en vue de leur revente, pour une activité commerciale\n- frais de repas : le supplément par rapport au coût d'un repas à domicile\n\nAttention : l'achat d'un ordinateur à 1000€ n'est pas une charge, mais une immobilisation : c'est un bien qui va profiter à l'entreprise pendant plusieurs années. Chaque année, une partie de cette immobilisation est amortie, et cet amortissement déductible peut être intégré dans ce calcul, par exemple 200€ par an pendant 5 ans.\n\nA l'inverse, un téléphone portable à moins de 500€ peut être assimilé à une charge sans immobilisation.\n",
    "références": {
      "Charges déductibles ou non du résultat fiscal d'une entreprise": "https://www.service-public.fr/professionnels-entreprises/vosdroits/F31973"
    },
    "par défaut": "0 €/an"
  },
  "entreprise . dividendes": "bénéficiaire . dividendes . bruts",
  "entreprise . capital social": {
    "experimental": "oui",
    "description": "Cette valeur doit inclure la valeur des primes d'émission.\n",
    "titre": "Capital social",
    "question": "Quele est le capital social de la société ?",
    "unité": "€"
  },
  "entreprise . salariés": null,
  "entreprise . salariés . effectif": {
    "unité": "employés",
    "variations": [
      {
        "si": "seuil = 'moins de 5'",
        "alors": "4 employés"
      },
      {
        "si": "seuil = 'moins de 11'",
        "alors": "10 employés"
      },
      {
        "si": "seuil = 'moins de 20'",
        "alors": "19 employés"
      },
      {
        "si": "seuil = 'moins de 50'",
        "alors": "49 employés"
      },
      {
        "si": "seuil = 'moins de 150'",
        "alors": "149 employés"
      },
      {
        "si": "seuil = 'moins de 250'",
        "alors": "250 employés"
      },
      {
        "si": "seuil = 'plus de 250'",
        "alors": "251 employés"
      }
    ],
    "avec": {
      "seuil": {
        "titre": "seuil d'effectif",
        "question": "Quel est l'effectif de l'entreprise ?",
        "description": "De nombreuses cotisations patronales varient selon l'effectif de l'entreprise.\nLe franchissement d'un seuil à la hausse n'est pris en compte que s'il est atteint ou dépassé pendant 5 années civiles consécutives.\n",
        "une possibilité": {
          "choix obligatoire": "oui",
          "possibilités": [
            "moins de 5",
            "moins de 11",
            "moins de 20",
            "moins de 50",
            "moins de 150",
            "moins de 250",
            "plus de 250"
          ]
        },
        "par défaut": "'moins de 5'",
        "avec": {
          "moins de 5": null,
          "moins de 11": {
            "titre": "entre 5 et 10"
          },
          "moins de 20": {
            "titre": "entre 11 et 19"
          },
          "moins de 50": {
            "titre": "entre 20 et 49"
          },
          "moins de 150": {
            "titre": "entre 50 et 149"
          },
          "moins de 250": {
            "titre": "entre 150 et 250"
          },
          "plus de 250": {
            "titre": "251 et plus"
          }
        }
      }
    }
  },
  "entreprise . salariés . ratio alternants": {
    "question": "Quelle est la fraction de contrats d'alternance dans l'effectif moyen de l'entreprise ?",
    "titre": "Fraction d'alternants",
    "description": "Cette fraction détermine la contribution supplémentaire pour l'apprentissage pour les entreprises concernées.\n",
    "suggestions": {
      "1%": "1%",
      "5%": "5%"
    },
    "par défaut": "0%"
  },
  "entreprise . association non lucrative": {
    "experimental": "oui",
    "description": "L'entreprise est une association non lucrative",
    "question": "S'agit-il d'une association à but non lucratif ?",
    "par défaut": "non",
    "rend non applicable": "salarié . cotisations . taxe d'apprentissage"
  },
  "entreprise . TVA": {
    "question": "L'entreprise est-elle assujettie à la TVA ?",
    "par défaut": "oui",
    "description": "Certains types d'entreprises ne sont pas assujetties à la TVA.\nCes dernières payent la taxe sur les salaires en contrepartie.\n\nC'est le cas par exemple des établissements bancaires, financiers ou d'assurance. C'est aussi le cas des activités d'enseignement.\n\n**À noter** : il ne faut pas confondre l'exonération de TVA (qui dépend de votre activité) et le régime en franchise de base (qui dépend de votre chiffre d'affaires).\n",
    "references": {
      "Les régimes d'imposition à la TVA": "https://www.impots.gouv.fr/professionnel/les-regimes-dimposition-la-tva",
      "Tout savoir sur la TVA": "https://entreprendre.service-public.fr/vosdroits/N13445",
      "Liste des activités exonérées (Article 61 du Code général des impôts)": "https://www.legifrance.gouv.fr/codes/id/LEGISCTA000006179649/"
    }
  },
  "entreprise . imposition": {
    "question": "Quel est le **type d'imposition** de votre entreprise ?",
    "une possibilité": {
      "choix obligatoire": "oui",
      "possibilités": [
        "IR",
        "IS"
      ]
    },
    "par défaut": {
      "variations": [
        {
          "si": {
            "une de ces conditions": [
              "catégorie juridique . SARL . unipersonnelle",
              "catégorie juridique . EI"
            ]
          },
          "alors": "'IR'"
        },
        {
          "sinon": "'IS'"
        }
      ]
    },
    "références": {
      "Comment seront imposés mes bénéfices ?": "https://bpifrance-creation.fr/moment-de-vie/comment-seront-imposes-mes-benefices?block_id=186",
      "Quelle imposition selon mon statut ?": "https://www.economie.gouv.fr/entreprises/impot-revenu-impot-societe-statut",
      "Guide complet sur les types de résultats d'une entreprise": "https://www.impots.gouv.fr/professionnel/resultat-imposable-limpot-sur-le-revenu-ir-ou-limpot-sur-les-societes"
    }
  },
  "entreprise . imposition . IR": {
    "valeur": "imposition = 'IR'",
    "titre": "Impôt sur le revenu",
    "acronyme": "IR",
    "description": "Le résultat de votre entreprise est imposé à l'impôt sur le revenu, comme les autres revenus de\nvotre foyer.\n\nLe résultat est déterminé lors du remplissage de la **liasse fiscale** (aussi appelée\ndéclaration de résultat). C'est l'expert-comptable qui s'en charge.\n\nSi votre entreprise gagne de l'argent, le résultat est appelé **bénéfice**. Il est ajouté aux autres\nrevenus imposables (s'ils existent) : **votre impôt sur le revenu est plus élevé**.\n\nSi votre entreprise perd de l'argent, le résultat est appelé **déficit**. Il vient réduire le montant du\nrevenu imposable de votre ménage : **votre impôt sur le revenu est moins élevé**.\n\nÀ noter : avec l'imposition sur le revenu, il n'y a pas de différence fiscale entre les revenus de votre foyer et ceux de\nvotre entreprise.\n"
  },
  "entreprise . imposition . IR . type de bénéfices": {
    "question": "Quel est le **type de bénéfices** de votre entreprise ?",
    "par défaut": "oui",
    "une possibilité": {
      "choix obligatoire": "oui",
      "possibilités": [
        "BNC",
        "BIC",
        "BA"
      ]
    },
    "références": {
      "Impôt sur le revenu : BIC, BNC, comment ça marche ?": "https://www.economie.gouv.fr/entreprises/impot-sur-revenu-bic-bnc"
    }
  },
  "entreprise . imposition . IR . type de bénéfices . BNC": {
    "valeur": "type de bénéfices = 'BNC'",
    "références": {
      "Bénéfices non commerciaux (BNC) : régimes fiscaux et déclarations": "https://entreprendre.service-public.fr/vosdroits/F32105"
    }
  },
  "entreprise . imposition . IR . type de bénéfices . BIC": {
    "valeur": "type de bénéfices = 'BIC'",
    "références": {
      "Bénéfices non commerciaux (BIC) : régime fiscal et déclarations": "https://entreprendre.service-public.fr/vosdroits/F32919"
    }
  },
  "entreprise . imposition . IR . type de bénéfices . BA": {
    "applicable si": "BA possible",
    "valeur": "type de bénéfices = 'BA'"
  },
  "entreprise . imposition . IR . type de bénéfices . BA possible": "non",
  "entreprise . imposition . IR . type de bénéfices . BIC et BNC possibles": "non",
  "entreprise . imposition . IR . information sur le report de déficit": {
    "non applicable si": "régime . micro-entreprise",
    "type": "notification",
    "formule": "résultat fiscal < 0 €/an",
    "description": "Lorsque votre résultat fiscal est négatif, ce dernier vient réduire le revenu imposables du foyer fiscal.\nUn déficit peut être imputé jusqu'à 6 ans après sa réalisation.\n\n[Voir les règles fiscales détaillées](https://bofip.impots.gouv.fr/bofip/2003-PGP.html/identifiant%3DBOI-BIC-DEF-20-10-20170301)\n",
    "références": {
      "bofip": "https://bofip.impots.gouv.fr/bofip/2003-PGP.html/identifiant%3DBOI-BIC-DEF-20-10-20170301"
    }
  },
  "entreprise . imposition . IS": {
    "valeur": "imposition = 'IS'",
    "titre": "Impôt sur les sociétés",
    "acronyme": "IS",
    "description": "\nLe **résultat** de votre entreprise est imposé à l'**impôt sur les sociétés**.\n\nSi votre entreprise perd de l'argent, le résultat est appelé **déficit**. Elle n'aura pas à payer d'impôt\nsur les sociétés.\n\nSi votre entreprise gagne de l'argent, le résultat est appelé **bénéfice**. Il sera imposé à un\n**taux fixe**.\n\nLe résultat imposable est déterminé lors du remplissage de la **liasse fiscale** (aussi appelée\ndéclaration de résultat). C'est l'expert-comptable qui s'en charge.\n\n\nÀ noter : il existe **deux façons de se rémunérer** avec une entreprise à l'impôt sur les sociétés :\n  - Vous pouvez vous verser une rémunération en tant que dirigeant pendant l'année. Cette rémunération est\n  déduite (soustraite) du résultat pour calculer le bénéfice imposable de votre entreprise. En revanche, cette\n  rémunération est ajoutée aux revenus imposables de votre foyer pour le calcul de l'impôt sur le revenu.\n  - Vous pouvez aussi vous verser des dividendes à partir des bénéfices des années précédentes. Vous aurez à payer\n  un impôt fixe sur ces derniers : c'est ce que l'on appelle la \"flat tax\".\n\n  Dans tous les cas, vous aurez à payer des **cotisations sociales** sur les revenus que vous touchez.",
    "références": {
      "Impôt sur les sociétés : entreprises concernées et taux d'imposition": "https://entreprendre.service-public.fr/vosdroits/F23575",
      "Comment choisir l'imposition sur le revenu ?": "https://entreprendre.service-public.fr/vosdroits/F31265"
    }
  },
  "entreprise . imposition . IS . montant": {
    "unité": "€/an",
    "barème": {
      "assiette": "résultat imposable",
      "multiplicateur": "prorata temporis",
      "variations": [
        {
          "si": "exercice . début >= 01/2022",
          "alors": {
            "tranches": [
              {
                "taux": {
                  "nom": "taux réduit",
                  "valeur": "15%"
                },
                "plafond": {
                  "nom": "plafond taux réduit 1",
                  "applicable si": "éligible taux réduit",
                  "valeur": "38120 €/an"
                }
              },
              {
                "taux": {
                  "nom": "taux normal",
                  "valeur": "25%"
                }
              }
            ]
          }
        },
        {
          "si": "exercice . début >= 01/2021",
          "alors": {
            "tranches": [
              {
                "taux": "taux réduit",
                "plafond": "plafond taux réduit 1"
              },
              {
                "taux": "26.5%"
              }
            ]
          }
        },
        {
          "si": "exercice . début >= 01/2020",
          "alors": {
            "tranches": [
              {
                "taux": "taux réduit",
                "plafond": "plafond taux réduit 1"
              },
              {
                "taux": "28%"
              }
            ]
          }
        },
        {
          "si": "exercice . début >= 01/01/2019",
          "alors": {
            "tranches": [
              {
                "taux": "taux réduit",
                "plafond": "plafond taux réduit 1"
              },
              {
                "taux": "28%",
                "plafond": {
                  "nom": "plafond taux réduit 2",
                  "applicable si": "éligible taux réduit",
                  "valeur": "500000 €/an"
                }
              },
              {
                "taux": "31%"
              }
            ]
          }
        },
        {
          "si": "exercice . début >= 01/01/2018",
          "alors": {
            "tranches": [
              {
                "taux": "taux réduit",
                "plafond": "plafond taux réduit 1"
              },
              {
                "taux": "28%",
                "plafond": "plafond taux réduit 2"
              },
              {
                "taux": "33.3333%"
              }
            ]
          }
        }
      ],
      "arrondi": "oui"
    },
    "références": {
      "Fiche impots.gouv.fr": "https://www.impots.gouv.fr/portail/international-professionnel/impot-sur-les-societes",
      "Fiche service-public.fr": "https://www.service-public.fr/professionnels-entreprises/vosdroits/F23575"
    }
  },
  "entreprise . imposition . IS . éligible taux réduit": {
    "par défaut": "oui",
    "toutes ces conditions": [
      "chiffre d'affaires <= 7630 k€/an * prorata temporis",
      {
        "nom": "capital détenu au moins à 75 pourcents par des personnes physiques",
        "valeur": "oui"
      }
    ]
  },
  "entreprise . imposition . IS . prorata temporis": {
    "description": "Lorsque la durée de l’exercice n'est pas égale à un an, on pro-ratise les\nplafonds utilisés dans le barème de l'impôt sur les sociétés.\n",
    "unité": "%",
    "formule": "exercice . durée / 1 an",
    "références": {
      "Bofip": "https://bofip.impots.gouv.fr/bofip/2065-PGP.html/identifiant%3DBOI-IS-LIQ-20-20-20180801"
    }
  },
  "entreprise . imposition . IS . contribution sociale": {
    "description": "La contribution sociale sur les bénéfices est un impôt distinct de l’impôt sur les sociétés. Son montant n’est pas déductible des résultats.\n\nL’assiette bénéficie d’un abattement important, et seules les entreprises réalisant plus de 2,3 millions d’euros de bénéfices sont concernées par cette contribution.\n",
    "formule": {
      "produit": {
        "taux": "3.3%",
        "assiette": {
          "valeur": "IS . montant",
          "abattement": "763000 €/an * prorata temporis"
        }
      }
    },
    "références": {
      "Bofip": "https://bofip.impots.gouv.fr/bofip/3492-PGP.html/identifiant%3DBOI-IS-AUT-10-20-20130318"
    }
  },
  "entreprise . imposition . IS . résultat imposable": {
    "titre": "Résultat de l'exercice",
    "résumé": "Imposable à l'impôt sur les sociétés",
    "valeur": "résultat fiscal"
  },
  "entreprise . imposition . IS . information sur le report de déficit": {
    "type": "notification",
    "formule": "résultat imposable < 0 €/an",
    "description": "Les déficits subits au cours d'un exercice peuvent être reportés sur les exercices suivants (report en avant), ou sur le seul exercice précédent (report en arrière).\n"
  },
  "entreprise . imposition . IS . résultat net": {
    "résumé": "Après déduction des charges et de l'impôt sur les société",
    "somme": [
      "chiffre d'affaires",
      "(- charges)",
      "(- dirigeant . rémunération . totale)",
      "(- montant)"
    ],
    "par défaut": "0€"
  },
  "entreprise . imposition . régime": {
    "question": "Quel est le **régime d'imposition** de votre entreprise ?",
    "une possibilité": {
      "choix obligatoire": "oui",
      "possibilités": [
        "micro-entreprise",
        "déclaration contrôlée",
        "réel simplifié",
        "réel normal"
      ]
    },
    "références": {
      "Les différents régimes d'imposition": "https://www.economie.gouv.fr/entreprises/les-differents-regimes-dimposition"
    }
  },
  "entreprise . imposition . régime . micro-entreprise": {
    "non applicable si": "entreprise . imposition . IS",
    "valeur": "régime = 'micro-entreprise'",
    "par défaut": "non",
    "remplace": [
      {
        "règle": "entreprise . imposition . régime",
        "par": "'micro-entreprise'"
      }
    ],
    "rend non applicable": "dirigeant . indépendant . cotisations facultatives",
    "question": "Avez-vous opté pour le régime micro-fiscal ?",
    "description": "Avec le régime micro fiscal, les charges déductibles sont estimées forfaitairement,en fonction d’un pourcentage du chiffre d’affaires. Ce pourcentage dépend du type d’activité : 71% pour les activités de vente, restauration et hébergement (location de meublé de tourisme classé et chambre d’hôte), 50% pour les prestations de service commerciales ou artisanales, 34% pour les activités libérales.\n\nCette option permet de simplifier votre comptabilité et peut être avantageuse en termes de revenu imposable et soumis à cotisations et contributions sociales dans le cas où vos charges de fonctionnement sont faibles.\n",
    "références": {
      "Imposition du micro-entrepreneur": "https://entreprendre.service-public.fr/vosdroits/F23267",
      "Changement de régime d'imposition: comment ça marche ?": "https://www.economie.gouv.fr/entreprises/changement-regime-imposition"
    }
  },
  "entreprise . imposition . régime . micro-entreprise . revenu abattu": {
    "remplace": "résultat fiscal",
    "résoudre la référence circulaire": "oui",
    "titre": "abattement forfaitaire micro-fiscal",
    "description": "Le micro-entrepreneur est dispensé d'établir une déclaration professionnelle de bénéfices au titre des BNC ou BIC.\n\nIl lui suffit de porter dans la déclaration complémentaire de revenu (n°2042-C Pro) le montant annuel du chiffre d'affaires brut (BIC) ou des recettes (BNC).\n",
    "somme": [
      "entreprise . chiffre d'affaires . vente restauration hébergement",
      "entreprise . chiffre d'affaires . service BIC",
      "entreprise . chiffre d'affaires . service BNC"
    ],
    "abattement": {
      "produit": {
        "composantes": [
          {
            "assiette": "entreprise . chiffre d'affaires . vente restauration hébergement",
            "taux": "71%"
          },
          {
            "assiette": "entreprise . chiffre d'affaires . service BIC",
            "taux": "50%"
          },
          {
            "assiette": "entreprise . chiffre d'affaires . service BNC",
            "taux": "34%"
          }
        ]
      },
      "plancher": {
        "nom": "plancher abattement",
        "variations": [
          {
            "si": "entreprise . activité . mixte",
            "alors": "610 €/an"
          },
          {
            "sinon": "305 €/an"
          }
        ]
      }
    }
  },
  "entreprise . imposition . régime . micro-entreprise . alerte seuil dépassés": {
    "type": "notification",
    "sévérité": "avertissement",
    "formule": "chiffre d'affaires . seuil micro dépassé",
    "description": "Le seuil annuel de chiffre d'affaires pour le régime micro-fiscal est dépassé. [En savoir plus](/documentation/entreprise/chiffre-d'affaires/seuil-micro-dépassé)"
  },
  "entreprise . chiffre d'affaires . seuil micro dépassé": {
    "experimental": "oui",
    "applicable si": "imposition . IR",
    "description": "Le statut de micro-entreprise s'applique tant que le chiffre d'affaires annuel (effectivement encaissé au cours de l'année civile) ne dépasse pas les seuils du régime fiscal de la micro-entreprise.\n\nEn cas de dépassement **sur deux années consécutives**, l'entreprise bascule automatiquement dans le régime de [l'entreprise individuelle](/simulateurs/indépendant).\n\nÀ la fin de la première année d'activité, le CA est proratisé par rapport à la durée d'activité.\n\nExemple :\n> Un contribuable crée une entreprise le 1er août et encaisse des recettes HT de `50 000 €` au cours des cinq mois d'activité de sa première année civile d'exploitation.\n> Les recettes de cette première année civile sont ajustées *prorata temporis* pour les comparer au plafond :\n>\n> `50 000€ x (365/153) = 119 280 €`\n\n\nLes charges ne sont pas déductibles pour le calcul du plafond (comme pour le calcul des cotisations)\n\n\n### Multi-activité\n\nLorsqu'un entrepreneur exerce 2 activités au sein de sa micro-entreprise, le\nseuil de chiffre d’affaires à respecter n’est pas pour autant doublé. En\neffet l'exercice de plusieurs activités avec la même micro-entreprise\nn’augmente pas les seuils.\n",
    "références": {
      "Fiche service-public.fr": "https://www.service-public.fr/professionnels-entreprises/vosdroits/F32353",
      "Article 50-0 du Code général des impôts": "https://www.legifrance.gouv.fr/affichCode.do?idSectionTA=LEGISCTA000006199553&cidTexte=LEGITEXT000006069577",
      "Bofip (dépassement micro-bnc)": "https://bofip.impots.gouv.fr/bofip/4807-PGP.html",
      "Bofip (dépassement micro-bic)": "https://bofip.impots.gouv.fr/bofip/1802-PGP.html",
      "autoentrepreneur.urssaf.fr": "https://www.autoentrepreneur.urssaf.fr/portail/accueil/une-question/questions-frequentes.html"
    },
    "unité": "€/an",
    "une de ces conditions": [
      "entreprise . chiffre d'affaires > 176200 €/an",
      "entreprise . chiffre d'affaires . service > 72600 €/an"
    ]
  },
  "entreprise . imposition . régime . déclaration contrôlée": {
    "applicable si": "IR . type de bénéfices . BNC",
    "valeur": "régime = 'déclaration contrôlée'",
    "références": {
      "Qu’est-ce que le régime de la déclaration contrôlée ?": "https://www.economie.gouv.fr/entreprises/regime-declaration-controlee"
    }
  },
  "entreprise . imposition . régime . réel normal": {
    "titre": "réel normal d'imposition",
    "acronyme": "RN",
    "non applicable si": "IR . type de bénéfices . BNC",
    "valeur": "régime = 'réel normal'",
    "références": {
      "Qu'est-ce que le régime réel normal ?": "https://www.economie.gouv.fr/entreprises/regime-reel-normal-imposition"
    }
  },
  "entreprise . imposition . régime . réel simplifié": {
    "titre": "réel simplifié d'imposition",
    "acronyme": "RSI",
    "non applicable si": "IR . type de bénéfices . BNC",
    "valeur": "régime = 'réel simplifié'",
    "références": {
      "Qu’est-ce que le régime réel simplifié ?": "https://www.economie.gouv.fr/entreprises/regime-reel-simplifie"
    }
  },
  "établissement": null,
  "établissement . SIRET": {
    "type": "texte",
    "applicable si": "entreprise . SIREN"
  },
  "établissement . commune": {
    "icônes": "📍",
    "question": "Dans quelle commune l'établissement est-il implanté ?",
    "API": "commune",
    "variations": [
      {
        "si": {
          "est défini": "nom"
        },
        "alors": {
          "texte": "{{ nom }} ({{ code postal }})"
        }
      },
      {
        "sinon": "nom"
      }
    ],
    "avec": {
      "nom": {
        "titre": "Commune"
      },
      "taux versement mobilité": {
        "par défaut": 0,
        "unité": "%"
      },
      "code postal": null,
      "département": {
        "avec": {
          "outre-mer": {
            "par défaut": "non",
            "une de ces conditions": [
              "département = 'Guadeloupe'",
              "département = 'Martinique'",
              "département = 'Guyane'",
              "département = 'La Réunion'",
              "département . outre-mer . Mayotte"
            ],
            "avec": {
              "Guadeloupe Réunion Martinique": {
                "une de ces conditions": [
                  "département = 'Guadeloupe'",
                  "département = 'Martinique'",
                  "département = 'La Réunion'"
                ]
              },
              "Mayotte": "département = 'Mayotte'"
            }
          }
        }
      }
    }
  },
  "établissement . taux ATMP": {
    "description": "Le taux de la cotisation AT/MP est déterminé pour chaque établissement en fonction des éléments suivants :\n\n- Activité principale\n- Taille de l'établissement\n- Secteur d'activité\n- Fréquence et la gravité des sinistres (accidents du travail, maladies professionnelles) survenus\n\nSi vous ne connaissez pas le taux de l'établissement, cliquez sur « Passer  ».\n",
    "question": "Quel est le taux de la cotisation AT/MP pour l'établissement ?",
    "unité": "%",
    "par défaut": "taux collectif",
    "références": {
      "Connaître le taux AT/MP de votre entreprise sur votre compte AT/MP": "https://www.net-entreprises.fr/declaration/compte-atmp/#lessentiel",
      "Comment calculer les cotisations accidents du travail et maladies professionnelles (AT/MP) ?": "https://entreprendre.service-public.fr/vosdroits/F33665"
    },
    "avec": {
      "taux collectif": {
        "question": "De quel domaine d'activité dépend votre entreprise ?",
        "par défaut": "salarié . cotisations . ATMP . taux moyen",
        "unité": "%",
        "note": "Les taux collectifs spécifiques du régime Alsace-Moselle ne sont pas implémentés"
      },
      "avertissement taux minimum": {
        "type": "notification",
        "si": "taux ATMP < salarié . cotisations . ATMP . taux minimum",
        "niveau": "avertissement",
        "description": "Le taux renseigné est inférieur au taux minimum légal"
      }
    }
  },
  "établissement . ZFU": {
    "experimental": "oui",
    "applicable si": "entreprise . date de création < 01/2015",
    "question": "Votre établissement bénéficie-t-il du dispositif zone franche urbaine (ZFU) ?",
    "par défaut": "non"
  },
  "établissement . ZFU . durée d'implantation en fin d'année": {
    "formule": {
      "durée": {
        "depuis": "entreprise . date de création",
        "jusqu'à": "31/12/2019"
      }
    }
  },
  "impôt": {
    "experimental": "oui",
    "icônes": "🏛️",
    "description": "Cet ensemble de formules est un modèle simplifié de l'impôt sur le revenu.",
    "titre": "impôt sur le revenu"
  },
  "impôt . montant": {
    "titre": "Impôt sur le revenu",
    "somme": [
      {
        "produit": {
          "assiette": "revenu imposable",
          "taux": "taux d'imposition"
        }
      },
      "dirigeant . auto-entrepreneur . impôt . versement libératoire . montant",
      "impôt . dividendes . PFU"
    ],
    "arrondi": "oui",
    "unité": "€/an"
  },
  "impôt . taux d'imposition": {
    "formule": {
      "variations": [
        {
          "si": "méthode de calcul . taux neutre",
          "alors": "taux neutre d'impôt sur le revenu"
        },
        {
          "si": "méthode de calcul . taux personnalisé",
          "alors": "taux personnalisé"
        },
        {
          "si": "méthode de calcul . barème standard",
          "alors": "foyer fiscal . taux effectif"
        }
      ]
    }
  },
  "impôt . méthode de calcul": {
    "description": "Nous avons implémenté trois façon de calculer l'impôt sur le revenu :\n- *Le taux personnalisé* : indiqué sur votre avis d'imposition\n- *Le taux neutre* : pour un célibataire sans enfants\n- *Le barème standard * : la formule \"officielle\" utilisée par l'administration fiscale pour obtenir le taux d'imposition\n\nEn remplissant votre taux personnalisé, vous serez au plus proche de votre situation réelle. Le taux neutre peut être intéressant dans le cas où vous n'avez pas transmis votre taux personnalisé à l'employeur et que vous souhaitez comparer les résultats du simulateur à votre fiche de paie. Le barème standard vous donne un résultat plus précis que le taux neutre pour un célibataire sans enfant.\n",
    "question": "Comment souhaitez-vous calculer l'impôt sur le revenu ?",
    "non applicable si": "dirigeant . auto-entrepreneur . impôt . versement libératoire > 0",
    "par défaut": {
      "nom": "par défaut",
      "valeur": "'barème standard'"
    },
    "valeur": {
      "une possibilité": {
        "choix obligatoire": "oui",
        "possibilités": [
          "taux neutre",
          "taux personnalisé",
          "barème standard"
        ]
      }
    },
    "références": {
      "différence taux neutre / personnalisé": "https://www.impots.gouv.fr/particulier/questions/comment-gerer-mon-prelevement-la-source",
      "calcul du taux d'imposition": "https://www.economie.gouv.fr/files/files/ESPACE-EVENEMENTIEL/PAS/Fiche_de_calcul_taux_simplifiee.pdf"
    }
  },
  "impôt . méthode de calcul . taux neutre": {
    "titre": "avec le taux neutre",
    "description": "Si vous ne connaissez pas votre taux personnalisé, ou si vous voulez connaître votre impôt à la source dans le cas où vous avez choisi de ne pas communiquer à votre taux à l'employeur, le calcul au taux neutre correspond à une imposition pour un célibataire sans enfants et sans autres revenus / charges.",
    "valeur": "impôt . méthode de calcul = 'taux neutre'"
  },
  "impôt . méthode de calcul . taux personnalisé": {
    "titre": "avec un taux personnalisé",
    "description": "Vous pouvez utiliser directement le taux personnalisé communiqué par l'administration fiscale pour calculer votre impôt. Pour le connaître, vous pouvez-vous rendre sur votre [espace fiscal personnel](https://impots.gouv.fr).",
    "valeur": "impôt . méthode de calcul = 'taux personnalisé'"
  },
  "impôt . méthode de calcul . barème standard": {
    "titre": "avec le barème standard",
    "description": "Le calcul \"officiel\" de l'impôt, celui sur lequel l'administration fiscale se base pour calculer votre taux d'imposition.",
    "valeur": "impôt . méthode de calcul = 'barème standard'"
  },
  "impôt . méthode de calcul . PFU": {
    "titre": "avec prélèvement forfaitaire unique",
    "description": "Calcul de l'impôt des revenus de capitaux mobiliers avec le prélèvement forfaitaire unique (ou \"flat tax\")",
    "valeur": "impôt . méthode de calcul = 'PFU'"
  },
  "impôt . revenu imposable": {
    "description": "C'est le revenu à prendre en compte pour calculer l'impôt avec un taux moyen d'imposition (neutre ou personnalisé).\n",
    "somme": [
      {
        "variations": [
          {
            "si": "dirigeant",
            "alors": "dirigeant . rémunération . net . imposable"
          },
          {
            "sinon": {
              "valeur": "salarié . rémunération . net . imposable",
              "abattement": "abattement contrat court"
            }
          }
        ]
      },
      "bénéficiaire . dividendes . imposables"
    ]
  },
  "impôt . revenu imposable . abattement contrat court": {
    "description": "Lorsque la durée d'un contrat de travail est inférieure à 2 mois, il est possible d'appliquer un abattement pour diminuer le montant du prélèvement à la source.",
    "applicable si": {
      "toutes ces conditions": [
        "méthode de calcul . taux neutre",
        "salarié . contrat . CDD . durée <= 2 mois"
      ]
    },
    "formule": {
      "valeur": "50% * SMIC . net imposable * 1 mois/an",
      "arrondi": "oui"
    },
    "note": "Cet abattement s'applique aussi pour les conventions de stage ou les contrats de mission (intérim) de moins de 2 mois.",
    "références": {
      "Bofip - dispositions spécifiques aux contrats courts": "https://bofip.impots.gouv.fr/bofip/11252-PGP.html?identifiant=BOI-IR-PAS-20-20-30-10-20180515"
    }
  },
  "impôt . taux neutre d'impôt sur le revenu . barème Guadeloupe Réunion Martinique": {
    "icônes": "🇬🇵🇷🇪 🇲🇶",
    "applicable si": "établissement . commune . département . outre-mer . Guadeloupe Réunion Martinique",
    "remplace": "taux neutre d'impôt sur le revenu",
    "grille": {
      "assiette": "revenu imposable",
      "variations": [
        {
          "si": "date >= 01/01/2022",
          "alors": {
            "tranches": [
              {
                "montant": "0%",
                "plafond": "1652 €/mois"
              },
              {
                "montant": "0.5%",
                "plafond": "1752 €/mois"
              },
              {
                "montant": "1.3%",
                "plafond": "1931 €/mois"
              },
              {
                "montant": "2.1%",
                "plafond": "2108 €/mois"
              },
              {
                "montant": "2.9%",
                "plafond": "2328 €/mois"
              },
              {
                "montant": "3.5%",
                "plafond": "2455 €/mois"
              },
              {
                "montant": "4.1%",
                "plafond": "2540 €/mois"
              },
              {
                "montant": "5.3%",
                "plafond": "2794 €/mois"
              },
              {
                "montant": "7.5%",
                "plafond": "3454 €/mois"
              },
              {
                "montant": "9.9%",
                "plafond": "4420 €/mois"
              },
              {
                "montant": "11.9%",
                "plafond": "5021 €/mois"
              },
              {
                "montant": "13.8%",
                "plafond": "5816 €/mois"
              },
              {
                "montant": "15.8%",
                "plafond": "6968 €/mois"
              },
              {
                "montant": "17.9%",
                "plafond": "7747 €/mois"
              },
              {
                "montant": "20%",
                "plafond": "8805 €/mois"
              },
              {
                "montant": "24%",
                "plafond": "12107 €/mois"
              },
              {
                "montant": "28%",
                "plafond": "16087 €/mois"
              },
              {
                "montant": "33%",
                "plafond": "24554 €/mois"
              },
              {
                "montant": "38%",
                "plafond": "53670 €/mois"
              },
              {
                "montant": "43%"
              }
            ]
          }
        },
        {
          "sinon": {
            "tranches": [
              {
                "montant": "0%",
                "plafond": "1626 €/mois"
              },
              {
                "montant": "0.5%",
                "plafond": "1724 €/mois"
              },
              {
                "montant": "1.3%",
                "plafond": "1900 €/mois"
              },
              {
                "montant": "2.1%",
                "plafond": "2075 €/mois"
              },
              {
                "montant": "2.9%",
                "plafond": "2292 €/mois"
              },
              {
                "montant": "3.5%",
                "plafond": "2417 €/mois"
              },
              {
                "montant": "4.1%",
                "plafond": "2500 €/mois"
              },
              {
                "montant": "5.3%",
                "plafond": "2750 €/mois"
              },
              {
                "montant": "7.5%",
                "plafond": "3400 €/mois"
              },
              {
                "montant": "9.9%",
                "plafond": "4350 €/mois"
              },
              {
                "montant": "11.9%",
                "plafond": "4942 €/mois"
              },
              {
                "montant": "13.8%",
                "plafond": "5725 €/mois"
              },
              {
                "montant": "15.8%",
                "plafond": "6858 €/mois"
              },
              {
                "montant": "17.9%",
                "plafond": "7625 €/mois"
              },
              {
                "montant": "20%",
                "plafond": "8667 €/mois"
              },
              {
                "montant": "24%",
                "plafond": "11917 €/mois"
              },
              {
                "montant": "28%",
                "plafond": "15833 €/mois"
              },
              {
                "montant": "33%",
                "plafond": "24167 €/mois"
              },
              {
                "montant": "38%",
                "plafond": "52825 €/mois"
              },
              {
                "montant": "43%"
              }
            ]
          }
        }
      ]
    }
  },
  "impôt . taux neutre d'impôt sur le revenu . barème Guyane Mayotte": {
    "icônes": "🇬🇾 🇾🇹",
    "applicable si": {
      "par défaut": "non",
      "une de ces conditions": [
        "établissement . commune . département = 'Guyane'",
        "établissement . commune . département = 'Mayotte'"
      ]
    },
    "remplace": "taux neutre d'impôt sur le revenu",
    "grille": {
      "assiette": "revenu imposable",
      "variations": [
        {
          "si": "date >= 01/01/2022",
          "alors": {
            "tranches": [
              {
                "montant": "0%",
                "plafond": "1769 €/mois"
              },
              {
                "montant": "0.5%",
                "plafond": "1913 €/mois"
              },
              {
                "montant": "1.3%",
                "plafond": "2133 €/mois"
              },
              {
                "montant": "2.1%",
                "plafond": "2404 €/mois"
              },
              {
                "montant": "2.9%",
                "plafond": "2497 €/mois"
              },
              {
                "montant": "3.5%",
                "plafond": "2583 €/mois"
              },
              {
                "montant": "4.1%",
                "plafond": "2667 €/mois"
              },
              {
                "montant": "5.3%",
                "plafond": "2963 €/mois"
              },
              {
                "montant": "7.5%",
                "plafond": "4089 €/mois"
              },
              {
                "montant": "9.9%",
                "plafond": "5292 €/mois"
              },
              {
                "montant": "11.9%",
                "plafond": "5969 €/mois"
              },
              {
                "montant": "13.8%",
                "plafond": "6926 €/mois"
              },
              {
                "montant": "15.8%",
                "plafond": "7620 €/mois"
              },
              {
                "montant": "17.9%",
                "plafond": "8441 €/mois"
              },
              {
                "montant": "20%",
                "plafond": "9796 €/mois"
              },
              {
                "montant": "24%",
                "plafond": "13179 €/mois"
              },
              {
                "montant": "28%",
                "plafond": "16764 €/mois"
              },
              {
                "montant": "33%",
                "plafond": "26866 €/mois"
              },
              {
                "montant": "38%",
                "plafond": "56708 €/mois"
              },
              {
                "montant": "43%"
              }
            ]
          }
        },
        {
          "sinon": {
            "tranches": [
              {
                "montant": "0%",
                "plafond": "1741 €/mois"
              },
              {
                "montant": "0.5%",
                "plafond": "1883 €/mois"
              },
              {
                "montant": "1.3%",
                "plafond": "2100 €/mois"
              },
              {
                "montant": "2.1%",
                "plafond": "2367 €/mois"
              },
              {
                "montant": "2.9%",
                "plafond": "2458 €/mois"
              },
              {
                "montant": "3.5%",
                "plafond": "2542 €/mois"
              },
              {
                "montant": "4.1%",
                "plafond": "2625 €/mois"
              },
              {
                "montant": "5.3%",
                "plafond": "2917 €/mois"
              },
              {
                "montant": "7.5%",
                "plafond": "4025 €/mois"
              },
              {
                "montant": "9.9%",
                "plafond": "5208 €/mois"
              },
              {
                "montant": "11.9%",
                "plafond": "5875 €/mois"
              },
              {
                "montant": "13.8%",
                "plafond": "6817 €/mois"
              },
              {
                "montant": "15.8%",
                "plafond": "7500 €/mois"
              },
              {
                "montant": "17.9%",
                "plafond": "8308 €/mois"
              },
              {
                "montant": "20%",
                "plafond": "9642 €/mois"
              },
              {
                "montant": "24%",
                "plafond": "12971 €/mois"
              },
              {
                "montant": "28%",
                "plafond": "16500 €/mois"
              },
              {
                "montant": "33%",
                "plafond": "26443 €/mois"
              },
              {
                "montant": "38%",
                "plafond": "55815 €/mois"
              },
              {
                "montant": "43%"
              }
            ]
          }
        }
      ]
    }
  },
  "impôt . taux neutre d'impôt sur le revenu": {
    "description": "C'est le barème à appliquer sur le salaire mensuel imposable pour obtenir l'impôt à payer mensuellement pour les salariés qui ne veulent pas révéler à leur entreprise leur taux d'imposition (ce taux peut révéler par exemple des revenus du patrimoine importants).\n",
    "note": "Attention, l'abattement de 10% est inclus implicitement dans ce barème. L'assiette est donc bien le salaire imposable, et non le salaire imposable abattu.",
    "grille": {
      "assiette": "revenu imposable",
      "variations": [
        {
          "si": "date >= 01/01/2022",
          "alors": {
            "tranches": [
              {
                "montant": "0%",
                "plafond": "1440 €/mois"
              },
              {
                "montant": "0.5%",
                "plafond": "1496 €/mois"
              },
              {
                "montant": "1.3%",
                "plafond": "1592 €/mois"
              },
              {
                "montant": "2.1%",
                "plafond": "1699 €/mois"
              },
              {
                "montant": "2.9%",
                "plafond": "1816 €/mois"
              },
              {
                "montant": "3.5%",
                "plafond": "1913 €/mois"
              },
              {
                "montant": "4.1%",
                "plafond": "2040 €/mois"
              },
              {
                "montant": "5.3%",
                "plafond": "2414 €/mois"
              },
              {
                "montant": "7.5%",
                "plafond": "2763 €/mois"
              },
              {
                "montant": "9.9%",
                "plafond": "3147 €/mois"
              },
              {
                "montant": "11.9%",
                "plafond": "3543 €/mois"
              },
              {
                "montant": "13.8%",
                "plafond": "4134 €/mois"
              },
              {
                "montant": "15.8%",
                "plafond": "4956 €/mois"
              },
              {
                "montant": "17.9%",
                "plafond": "6202 €/mois"
              },
              {
                "montant": "20%",
                "plafond": "7747 €/mois"
              },
              {
                "montant": "24%",
                "plafond": "10752 €/mois"
              },
              {
                "montant": "28%",
                "plafond": "14563 €/mois"
              },
              {
                "montant": "33%",
                "plafond": "22860 €/mois"
              },
              {
                "montant": "38%",
                "plafond": "48967 €/mois"
              },
              {
                "montant": "43%"
              }
            ]
          }
        },
        {
          "sinon": {
            "tranches": [
              {
                "montant": "0%",
                "plafond": "1420 €/mois"
              },
              {
                "montant": "0.5%",
                "plafond": "1475 €/mois"
              },
              {
                "montant": "1.3%",
                "plafond": "1570 €/mois"
              },
              {
                "montant": "2.1%",
                "plafond": "1676 €/mois"
              },
              {
                "montant": "2.9%",
                "plafond": "1791 €/mois"
              },
              {
                "montant": "3.5%",
                "plafond": "1887 €/mois"
              },
              {
                "montant": "4.1%",
                "plafond": "2012 €/mois"
              },
              {
                "montant": "5.3%",
                "plafond": "2381 €/mois"
              },
              {
                "montant": "7.5%",
                "plafond": "2725 €/mois"
              },
              {
                "montant": "9.9%",
                "plafond": "3104 €/mois"
              },
              {
                "montant": "11.9%",
                "plafond": "3494 €/mois"
              },
              {
                "montant": "13.8%",
                "plafond": "4077 €/mois"
              },
              {
                "montant": "15.8%",
                "plafond": "4888 €/mois"
              },
              {
                "montant": "17.9%",
                "plafond": "6116 €/mois"
              },
              {
                "montant": "20%",
                "plafond": "7640 €/mois"
              },
              {
                "montant": "24%",
                "plafond": "10604 €/mois"
              },
              {
                "montant": "28%",
                "plafond": "14362 €/mois"
              },
              {
                "montant": "33%",
                "plafond": "22545 €/mois"
              },
              {
                "montant": "38%",
                "plafond": "48292 €/mois"
              },
              {
                "montant": "43%"
              }
            ]
          }
        }
      ]
    },
    "références": {
      "Explication de l'impôt neutre": "https://www.economie.gouv.fr/prelevement-a-la-source/taux-prelevement#taux-non-personnalise",
      "BOFIP": "https://bofip.impots.gouv.fr/bofip/11255-PGP.html"
    }
  },
  "impôt . taux personnalisé": {
    "question": "Quel est votre taux de prélèvement à la source ?",
    "description": "Votre taux moyen d'imposition personnalisé, que vous pouvez retrouver sur :\n  - une fiche de paie\n  - un avis d'imposition\n  - votre espace personnel [impots.gouv.fr](https://impots.gouv.fr)\n",
    "unité": "%"
  },
  "impôt . foyer fiscal": {
    "applicable si": "méthode de calcul . barème standard",
    "valeur": "oui",
    "icônes": "👨‍👩‍👧‍👦"
  },
  "impôt . foyer fiscal . situation de famille": {
    "question": "Quelle est votre situation familiale ?",
    "formule": {
      "une possibilité": {
        "choix obligatoire": "oui",
        "possibilités": [
          "célibataire",
          "couple",
          "veuf"
        ]
      }
    },
    "par défaut": "'célibataire'"
  },
  "impôt . foyer fiscal . situation de famille . célibataire": {
    "titre": "Célibataire / Divorcé(e) / Union libre"
  },
  "impôt . foyer fiscal . situation de famille . couple": {
    "titre": "Marié(e)s / Pacsé(e)s"
  },
  "impôt . foyer fiscal . situation de famille . veuf": {
    "titre": "Veuf(ve)"
  },
  "impôt . foyer fiscal . enfants à charge": {
    "question": "Combien d'enfants sont à charge du foyer fiscal ?",
    "par défaut": "0 enfant"
  },
  "impôt . foyer fiscal . parent isolé": {
    "par défaut": "non",
    "question": {
      "variations": [
        {
          "si": "impôt . foyer fiscal . enfants à charge > 1",
          "alors": {
            "texte": "Vivez-vous seul avec vos enfants ?"
          }
        },
        {
          "sinon": {
            "texte": "Vivez-vous seul avec votre enfant ?"
          }
        }
      ]
    },
    "applicable si": {
      "toutes ces conditions": [
        "enfants à charge > 0 enfant",
        "situation de famille = 'célibataire'"
      ]
    }
  },
  "impôt . foyer fiscal . nombre de parts": {
    "unité": "part",
    "formule": {
      "somme": [
        "principales",
        "rattachées",
        "majoration personne seule avec enfant",
        "majoration personne veuve avec enfant"
      ]
    }
  },
  "impôt . foyer fiscal . nombre de parts . principales": {
    "formule": {
      "variations": [
        {
          "si": "situation de famille = 'couple'",
          "alors": "2 part"
        },
        {
          "sinon": "1 part"
        }
      ]
    }
  },
  "impôt . foyer fiscal . nombre de parts . rattachées": {
    "variations": [
      {
        "si": "enfants à charge <= 2 enfant",
        "alors": "0.5 part/enfant * enfants à charge"
      },
      {
        "sinon": "(1 part/enfant * enfants à charge) - 1 part"
      }
    ]
  },
  "impôt . foyer fiscal . nombre de parts . majoration personne seule avec enfant": {
    "description": "Les contribuables célibataires, divorcés ou séparés, qui vivent seuls et supportent effectivement la charge d’un ou plusieurs enfants bénéficient d’une demie-part supplémentaire de quotient familial.",
    "applicable si": "parent isolé",
    "formule": "0.5 part",
    "références": {
      "Bofip": "https://bofip.impots.gouv.fr/bofip/2028-PGP.html/identifiant=BOI-IR-LIQ-10-20-20-10-20140326#Majoration_pour_les_personn_22"
    }
  },
  "impôt . foyer fiscal . nombre de parts . majoration personne veuve avec enfant": {
    "description": "Une personne veuve avec des enfants à charge bénéficie d'une part supplémentaire pour le calcul du quotient familial, ce qui correspond au maintient de la part de la personne décédée.\nUne personne veuve sans enfant à charge ne bénéficie en revanche d'aucune majoration.",
    "applicable si": {
      "toutes ces conditions": [
        "situation de famille = 'veuf'",
        "enfants à charge >= 1 enfant"
      ]
    },
    "formule": "1 part",
    "références": {
      "Quotient familial d'une personne veuve": "https://www.service-public.fr/particuliers/vosdroits/F35127"
    }
  },
  "impôt . foyer fiscal . taux effectif": {
    "unité": "%",
    "variations": [
      {
        "si": "revenu imposable = 0",
        "alors": "0%"
      },
      {
        "sinon": "impôt à payer / revenu imposable . revenu brut"
      }
    ]
  },
  "impôt . foyer fiscal . revenu imposable": {
    "somme": [
      "revenu d'activité abattu",
      {
        "applicable si": {
          "toutes ces conditions": [
            "dirigeant . rémunération . net . imposable",
            "entreprise . imposition . IR"
          ]
        },
        "valeur": "dirigeant . rémunération . net . imposable"
      },
      "bénéficiaire . dividendes . imposables",
      "autres revenus imposables"
    ]
  },
  "impôt . foyer fiscal . revenu imposable . revenu brut": {
    "somme": [
      "revenu imposable",
      "(- revenu d'activité abattu)",
      "revenu d'activité"
    ]
  },
  "impôt . foyer fiscal . revenu imposable . revenu d'activité": {
    "variations": [
      {
        "si": "dirigeant = non",
        "alors": "salarié . rémunération . net . imposable"
      },
      {
        "si": "entreprise . imposition = 'IS'",
        "alors": "dirigeant . rémunération . net . imposable"
      }
    ]
  },
  "impôt . foyer fiscal . revenu imposable . revenu d'activité abattu": {
    "description": "Dans le cas général, l'impôt est calculé après l'application d'un abattement forfaitaire fixe. Chacun peut néanmoins opter pour la déclaration de ses *frais réels*, qui viendront remplacer ce forfait par défaut.\n",
    "valeur": "revenu d'activité",
    "abattement": {
      "valeur": "10% * revenu d'activité",
      "plafond": {
        "variations": [
          {
            "si": "date >= 01/2022",
            "alors": "12829 €/an"
          },
          {
            "si": "date >= 01/2021",
            "alors": "12652 €/an"
          },
          {
            "si": "date >= 01/2020",
            "alors": "12627 €/an"
          }
        ]
      },
      "plancher": {
        "variations": [
          {
            "si": "date >= 01/2022",
            "alors": "448 €/an"
          },
          {
            "si": "date >= 01/2021",
            "alors": "442 €/an"
          },
          {
            "si": "date >= 01/2020",
            "alors": "441 €/an"
          }
        ]
      }
    },
    "références": {
      "Frais professionnels - forfait ou frais réels": "https://www.service-public.fr/particuliers/vosdroits/F1989",
      "Code des impôts": "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000037985819/2022-01-04/"
    }
  },
  "impôt . foyer fiscal . revenu imposable . autres revenus imposables": {
    "question": "Quel est le montant total des autres revenus imposables du foyer fiscal ?",
    "par défaut": "0 €/an"
  },
  "impôt . foyer fiscal . revenu fiscal de référence": {
    "description": "Le revenu fiscal de référence correspond au revenu abattu du foyer ajusté avec un mécanisme de quotient et majoré d'un certains nombre d'exonérations. Ces dernières sont réintégrées dans le calcul.",
    "formule": {
      "somme": [
        "revenu imposable",
        "salarié . rémunération . net . imposable . exonération prime d'impatriation"
      ]
    },
    "références": {
      "Article 1417 du Code général des impôts": "https://www.legifrance.gouv.fr/affichCodeArticle.do?idArticle=LEGIARTI000034596743&cidTexte=LEGITEXT000006069577&categorieLien=id&dateTexte=20170505"
    }
  },
  "impôt . foyer fiscal . impôt à payer": {
    "formule": {
      "somme": [
        "impôt sur le revenu",
        "CEHR"
      ]
    }
  },
  "impôt . foyer fiscal . impôt sur le revenu": {
    "unité": "€/an",
    "formule": {
      "somme": [
        {
          "valeur": "impôt brut",
          "abattement": "décote"
        },
        "impôt . dividendes . PFU"
      ]
    },
    "références": {
      "Fiche service-public.fr": "https://www.service-public.fr/particuliers/vosdroits/F34328"
    }
  },
  "impôt . foyer fiscal . impôt sur le revenu . décote": {
    "description": "Une décote est appliquée après le barème de l'impôt sur le revenu, pour réduire l'impôt des bas revenus.",
    "variations": [
      {
        "si": "foyer fiscal . situation de famille = 'couple'",
        "alors": {
          "variations": [
            {
              "si": "date >= 01/2022",
              "alors": "1307 €/an"
            },
            {
              "si": "date >= 01/2021",
              "alors": "1289 €/an"
            },
            {
              "si": "date >= 01/2020",
              "alors": "1286 €/an"
            }
          ]
        }
      },
      {
        "sinon": {
          "variations": [
            {
              "si": "date >= 01/2022",
              "alors": "790 €/an"
            },
            {
              "si": "date >= 01/2021",
              "alors": "779 €/an"
            },
            {
              "si": "date >= 01/2020",
              "alors": "777 €/an"
            }
          ]
        }
      }
    ],
    "abattement": "45.25% * impôt brut",
    "références": {
      "Fiche economie.gouv.fr": "https://www.economie.gouv.fr/particuliers/decote-impot-revenu"
    }
  },
  "impôt . foyer fiscal . impôt sur le revenu . quotient familial": {
    "unité": "€/part/an",
    "valeur": "revenu imposable / nombre de parts"
  },
  "impôt . foyer fiscal . impôt sur le revenu . quotient familial . plafond avantage": {
    "somme": [
      {
        "nom": "Plafonnement général",
        "produit": {
          "assiette": {
            "variations": [
              {
                "si": "date >= 01/2022",
                "alors": "1592 €/demi-part/an"
              },
              {
                "si": "date >= 01/2021",
                "alors": "1570 €/demi-part/an"
              },
              {
                "si": "date >= 01/2020",
                "alors": "1567 €/demi-part/an"
              }
            ]
          },
          "facteur": {
            "produit": {
              "assiette": {
                "valeur": "nombre de parts . rattachées",
                "abattement": "nombre de parts . majoration personne seule avec enfant"
              },
              "facteur": "2 demi-part/part"
            }
          }
        }
      },
      {
        "nom": "Plafonnement parent isolé",
        "description": "Avantage de quotient familial procuré par le premier enfant à charge des\ncontribuables célibataires ou divorcés vivant seuls.\n",
        "applicable si": "nombre de parts . majoration personne seule avec enfant",
        "variations": [
          {
            "si": "date >= 01/2022",
            "alors": "3756 €/an"
          },
          {
            "si": "date >= 01/2021",
            "alors": "3704 €/an"
          },
          {
            "si": "date >= 01/2020",
            "alors": "3697 €/an"
          }
        ]
      }
    ],
    "références": {
      "Bofip 2022": "https://bofip.impots.gouv.fr/bofip/2494-PGP.html/identifiant=BOI-IR-LIQ-20-20-20-20220516#III._Niveau_du_plafonnement_16",
      "Bofip 2021": "https://bofip.impots.gouv.fr/bofip/2494-PGP.html/identifiant=BOI-IR-LIQ-20-20-20-20210330#III._Niveau_du_plafonnement_12",
      "Bofip 2020": "https://bofip.impots.gouv.fr/bofip/2494-PGP.html/identifiant=BOI-IR-LIQ-20-20-20-20200515#III._Niveau_du_plafonnement_12",
      "Code général des impôts": "https://www.legifrance.gouv.fr/affichCodeArticle.do?idArticle=LEGIARTI000041464047&cidTexte=LEGITEXT000006069577&categorieLien=id&dateTexte=20190608"
    }
  },
  "impôt . foyer fiscal . impôt sur le revenu . impôt brut . par part": {
    "description": "Voici le fameux barème de l'impôt sur le revenu. C'est un barème marginal à 5 tranches.\nUne contribution sur les hauts revenus ajoute deux tranches supplémentaires.\n\nAttention : pour un revenu de 100 000€ annuels, le contribuable ne paiera pas 41 000€ d'impôt (le taux de la 4ème tranche est 41%) ! Ces 41% sont appliqués uniquement à la part de ses revenus supérieure à 72 617€.\n",
    "barème": {
      "assiette": "quotient familial",
      "tranches": [
        {
          "taux": "0%",
          "plafond": {
            "variations": [
              {
                "si": "date >= 01/2022",
                "alors": "10225 €/part/an"
              },
              {
                "si": "date >= 01/2021",
                "alors": "10084 €/part/an"
              }
            ]
          }
        },
        {
          "taux": "11%",
          "plafond": {
            "variations": [
              {
                "si": "date >= 01/2022",
                "alors": "26070 €/part/an"
              },
              {
                "si": "date >= 01/2021",
                "alors": "25710 €/part/an"
              }
            ]
          }
        },
        {
          "taux": "30%",
          "plafond": {
            "variations": [
              {
                "si": "date >= 01/2022",
                "alors": "74545 €/part/an"
              },
              {
                "si": "date >= 01/2021",
                "alors": "73516 €/part/an"
              }
            ]
          }
        },
        {
          "taux": "41%",
          "plafond": {
            "variations": [
              {
                "si": "date >= 01/2022",
                "alors": "160336 €/part/an"
              },
              {
                "si": "date >= 01/2021",
                "alors": "158122 €/part/an"
              }
            ]
          }
        },
        {
          "taux": "45%"
        }
      ]
    },
    "références": {
      "Article 197 du Code général des impôts": "https://www.legifrance.gouv.fr/affichCodeArticle.do?cidTexte=LEGITEXT000006069577&idArticle=LEGIARTI000006308322",
      "Mise à jour 2022": "https://www.economie.gouv.fr/particuliers/changement-2022-particuliers?xtor=ES-39-%5BBI_249_20220104%5D-20220104-%5Bhttps://www.economie.gouv.fr/particuliers/changement-2022-particuliers%5D"
    }
  },
  "impôt . foyer fiscal . impôt sur le revenu . impôt brut . sans parts rattachées": {
    "barème": {
      "assiette": "revenu imposable / nombre de parts . principales",
      "tranches": [
        {
          "taux": "0%",
          "plafond": {
            "variations": [
              {
                "si": "date >= 01/2022",
                "alors": "10225 €/part/an"
              },
              {
                "si": "date >= 01/2021",
                "alors": "10084 €/part/an"
              }
            ]
          }
        },
        {
          "taux": "11%",
          "plafond": {
            "variations": [
              {
                "si": "date >= 01/2022",
                "alors": "26070 €/part/an"
              },
              {
                "si": "date >= 01/2021",
                "alors": "25710 €/part/an"
              }
            ]
          }
        },
        {
          "taux": "30%",
          "plafond": {
            "variations": [
              {
                "si": "date >= 01/2022",
                "alors": "74545 €/part/an"
              },
              {
                "si": "date >= 01/2021",
                "alors": "73516 €/part/an"
              }
            ]
          }
        },
        {
          "taux": "41%",
          "plafond": {
            "variations": [
              {
                "si": "date >= 01/2022",
                "alors": "160336 €/part/an"
              },
              {
                "si": "date >= 01/2021",
                "alors": "158122 €/part/an"
              }
            ]
          }
        },
        {
          "taux": "45%"
        }
      ]
    }
  },
  "impôt . foyer fiscal . impôt sur le revenu . impôt brut": {
    "valeur": {
      "produit": {
        "assiette": "impôt brut . par part",
        "facteur": "nombre de parts"
      }
    },
    "plancher": {
      "valeur": {
        "produit": {
          "assiette": "impôt brut . sans parts rattachées",
          "facteur": "nombre de parts . principales"
        }
      },
      "abattement": "quotient familial . plafond avantage"
    },
    "références": {
      "BOFIP": "https://bofip.impots.gouv.fr/bofip/2494-PGP.html/identifiant%3DBOI-IR-LIQ-20-20-20-20210330"
    }
  },
  "impôt . foyer fiscal . CEHR": {
    "unité": "€/an",
    "formule": {
      "variations": [
        {
          "si": "foyer fiscal . situation de famille = 'couple'",
          "alors": {
            "barème": {
              "assiette": "revenu imposable",
              "tranches": [
                {
                  "taux": "0%",
                  "plafond": "500000 €/an"
                },
                {
                  "taux": "3%",
                  "plafond": "1000000 €/an"
                },
                {
                  "taux": "4%"
                }
              ]
            }
          }
        },
        {
          "sinon": {
            "barème": {
              "assiette": "revenu imposable",
              "tranches": [
                {
                  "taux": "0%",
                  "plafond": "250000 €/an"
                },
                {
                  "taux": "3%",
                  "plafond": "500000 €/an"
                },
                {
                  "taux": "4%"
                }
              ]
            }
          }
        }
      ]
    },
    "références": {
      "contribution exceptionnelle sur les hauts revenus": "https://www.service-public.fr/particuliers/vosdroits/F31130",
      "Article 223 sexies du Code général des impôts": "https://www.legifrance.gouv.fr/affichCode.do?idSectionTA=LEGISCTA000025049019&cidTexte=LEGITEXT000006069577",
      "Bofip.impots.gouv.fr": "http://bofip.impots.gouv.fr/bofip/7804-PGP"
    }
  },
  "impôt . domiciliation étranger non implémentée": {
    "formule": "situation personnelle . domiciliation fiscale à l'étranger",
    "type": "notification",
    "niveau": "avertissement",
    "description": "La retenue à la source pour les non-résident n'est pas encore implémentée. Pour en savoir plus, se référer à la [documentation fiscale](https://www.impots.gouv.fr/international-particulier/dois-je-declarer-mes-revenus-en-france)\n"
  },
  "impôt . dividendes": {
    "valeur": "oui",
    "applicable si": "bénéficiaire . dividendes . bruts > 0",
    "titre": "Imposition des dividendes"
  },
  "impôt . dividendes . impôt sans dividendes": {
    "recalcul": {
      "règle": "impôt . foyer fiscal . impôt à payer",
      "avec": {
        "bénéficiaire . dividendes . bruts": "0 €/an"
      }
    },
    "description": "Montant de l'impôt si aucun dividende n'était touché"
  },
  "impôt . dividendes . montant en sus des autres revenus imposables": {
    "variations": [
      {
        "si": "méthode de calcul . PFU",
        "alors": "PFU"
      },
      {
        "sinon": "impôt . foyer fiscal . impôt à payer - impôt sans dividendes"
      }
    ],
    "description": "Montant de l'impôt sur dividendes, en sus de l'impôt sur les autres revenus imposables"
  },
  "impôt . dividendes . PFU": {
    "applicable si": "impôt . méthode de calcul . PFU",
    "produit": {
      "assiette": "bénéficiaire . dividendes . bruts",
      "taux": "12.8%"
    },
    "titre": "Montant de l'impôt sur dividendes au titre du Prélèvement Forfaitaire Unique (ou \"flat tax\")",
    "description": "Ce montant est à verser sous forme d'acompte au moment du versement des\ndividendes.\n\nL'acompte n'est pas obligatoire au cas où le revenu fiscal n-2 est inférieur\nà\n\n  - 50 000 € pour une personne seule,\n  - 75 000 € pour un couple soumis à l'imposition commune (mariés ou\n    pacsés).\n\nDans ce cas, le bénéficiaire peut faire la demande de dispense au plus tard\nle 30 novembre de l'année précédant celle du paiement\n",
    "références": {
      "Fiche service-public.fr": "https://www.service-public.fr/professionnels-entreprises/vosdroits/F32963",
      "Article 200 A du Code Général des Impôts": "https://www.legifrance.gouv.fr/codes/id/LEGISCTA000006179579/",
      "Article 117 quater du Code Général des Impôts": "https://www.legifrance.gouv.fr/codes/id/LEGIARTI000036428175/#LEGIARTI000036428175"
    }
  },
  "dirigeant . indépendant . PL": {
    "titre": "Profession libérale",
    "applicable si": "entreprise . activité . nature = 'libérale'",
    "rend non applicable": "entreprise . activité . mixte",
    "formule": "oui"
  },
  "dirigeant . indépendant . PL . métier": {
    "applicable si": "entreprise . activité . nature . libérale . réglementée",
    "par défaut": "'rattaché CIPAV'",
    "question": "A quelle catégorie appartient votre profession ?",
    "une possibilité": {
      "choix obligatoire": "oui",
      "possibilités": [
        "santé",
        "avocat",
        "expert-comptable",
        "rattaché CIPAV"
      ]
    }
  },
  "dirigeant . indépendant . PL . métier . rattaché CIPAV": {
    "titre": "Autre métier rattaché à la CIPAV",
    "description": "Vous exercez un métier réglementé rattaché à la CIPAV. La liste de ces métiers est :\n\n- Architecte (architecte, architecte d’intérieur, économiste de la construction, maître d’œuvre, géomètre expert)\n- Guide-montagne (moniteur de ski, guide de haute montagne, accompagnateur de moyenne montagne)\n- Ostéopathe\n- Psychologue\n- Psychothérapeute\n- Psychomotriciens\n- Ergothérapeute\n- Diététicien\n- Chiropracteur\n- Ingénieur conseil\n- Guide-conférencier\n- Artistes autres que les artistes-auteurs\n- Experts devant les tribunaux\n- Experts automobiles\n- Mandataires judiciaires à la protection des majeurs\n"
  },
  "dirigeant . indépendant . PL . métier . santé": {
    "titre": "Praticien ou auxiliaire médical",
    "question": "Quel métier exercez-vous en tant que professionnel de santé ?",
    "description": "Si vous êtes praticien ou auxiliaire médical conventionné, vous relevez du\nrégime d'assurance maladie des praticiens et auxiliaires médicaux\nconventionnés (PAMC). Le point sur les conditions à remplir pour bénéficier\nde ce régime d'assurance maladie et sur les modalités de votre protection\nsociale.\n\n> *Exceptions* : Les ostéopathe, psychologue, psychothérapeute, ergothérapeute,\ndiététicien et chiropracteur ne dépendent pas du régime PAMC mais de la\nCIPAV pour leur retraite et invalidité.\n",
    "une possibilité": {
      "choix obligatoire": "oui",
      "possibilités": [
        "médecin",
        "chirurgien-dentiste",
        "sage-femme",
        "auxiliaire médical",
        "pharmacien"
      ]
    }
  },
  "dirigeant . indépendant . PL . métier . santé . auxiliaire médical": {
    "description": "Vous exercez un des métiers suivants : infirmier, masseur-kinésithérapeute, orthophoniste, orthoptiste ou pédicure-podologue.\n"
  },
  "dirigeant . indépendant . PL . métier . santé . pharmacien": null,
  "dirigeant . indépendant . PL . métier . santé . chirurgien-dentiste": null,
  "dirigeant . indépendant . PL . métier . santé . sage-femme": null,
  "dirigeant . indépendant . PL . métier . santé . médecin": null,
  "dirigeant . indépendant . PL . métier . santé . médecin . secteur": {
    "applicable si": "métier = 'santé . médecin'",
    "question": "Sur quel secteur êtes-vous conventionné ?",
    "description": "Les taux de cotisations et remboursement de la CPAM ne sont pas les même en\nfonction du régime de tarification choisie par le praticien.\n",
    "par défaut": "'S1'",
    "formule": {
      "une possibilité": {
        "choix obligatoire": "oui",
        "possibilités": [
          "S1",
          "S2",
          "non conventionné"
        ]
      }
    },
    "avec": {
      "S1": {
        "titre": "Secteur 1"
      },
      "S2": {
        "titre": "Secteur 2"
      },
      "non conventionné": null
    }
  },
  "dirigeant . indépendant . PL . métier . avocat": {
    "description": "Les avocats cotisent auprès d'un organisme autonome pour la retraite et la\nprévoyance.\n"
  },
  "dirigeant . indépendant . PL . métier . expert-comptable": {
    "description": "Les experts comptables et les commissaires aux comptes cotisent auprès d'un\norganisme autonome pour la retraite et la prévoyance.\n"
  },
  "dirigeant . indépendant . PL . option régime général": {
    "applicable si": {
      "toutes ces conditions": [
        "entreprise . activité . nature . libérale . réglementée = non",
        "entreprise . date de création < 01/2019"
      ]
    },
    "question": "Avez-vous opté pour le rattachement au régime général des indépendants ?",
    "description": "Les personnes exerçant déjà une profession libérale non réglementée avant\n2019 peuvent opter entre 2019 et 2023 pour la Sécurité sociale pour les\nindépendants, à condition d’être à jour dans le paiement de toutes leurs\ncotisations à la CIPAV.\n\nCette option leur permettra de bénéficier des mêmes droits que les artisans\net commerçants (indemnités journalières, retraite, invalidité, etc.).\n\nIls auront nottament accès à des indemnités journalières en cas d'arrêt de\ntravail ou de maternité, ce qui n'est pas le cas à la CIPAV.\n\nLa demande est à effectuer auprès de la CIPAV. Elle prendra effet au 1er\njanvier de l’année suivante et sera définitive.\n",
    "références": {
      "fiche information droit d'option (PDF CIPAV)": "https://www.lacipav.fr/sites/default/files/2019-03/Fiche%20pratique%20droit%20d%27option.pdf",
      "bpi-france": "https://bpifrance-creation.fr/entrepreneur/actualites/nouvelle-liste-activites-liberales-non-reglementees-relevant-cipav"
    },
    "par défaut": "non"
  },
  "dirigeant . indépendant . PL . régime général": {
    "description": "Les professions libérales non règlementées affiliées au régime général\nbénéficient de la même protection sociale que les artisans et commerçants.\n\nC'est le cas des professions libérales non règlementées crées avant le\n01/2019, ou celles ayant exercé leur [droit\nd'option](/documentation/dirigeant/indépendant/PL/option-régime-général)\n",
    "formule": {
      "toutes ces conditions": [
        "CIPAV = non",
        "entreprise . activité . nature . libérale . réglementée = non"
      ]
    }
  },
  "dirigeant . indépendant . PL . régime général . taux spécifique retraite complémentaire": {
    "question": "Avez-vous opté pour des taux spécifiques de cotisation retraite complémentaire ?",
    "par défaut": "non",
    "description": "Les professions libérales non règlementées qui ont débuté leur activité à\ncompter du 1er janvier 2019 ou ceux qui ont débuté leur activité avant la\ndate du 1er janvier 2019  et ont opté pour le régime général des\ntravailleurs indépendants  ont la possibilité d’opter pour des taux\nspécifique de la cotisation retraite complémentaire.\n",
    "références": {
      "Guide PL urssaf": "https://www.urssaf.fr/portail/files/live/sites/urssaf/files/documents/Diaporama_TI_statuts_hors_AE.pdf"
    }
  },
  "dirigeant . indépendant . PL . régime général . taux spécifique retraite complémentaire . montant": {
    "remplace": "cotisations et contributions . retraite complémentaire",
    "formule": {
      "barème": {
        "assiette": "assiette des cotisations",
        "multiplicateur": "plafond sécurité sociale",
        "tranches": [
          {
            "taux": "0%",
            "plafond": 1
          },
          {
            "taux": "14%",
            "plafond": 4
          }
        ]
      },
      "arrondi": "oui"
    }
  },
  "dirigeant . indépendant . PL . PAMC . maladie": {
    "remplace": "cotisations et contributions . maladie",
    "titre": "maladie (après participation CPAM)",
    "somme": [
      {
        "variations": [
          {
            "si": "date >= 01/2022",
            "alors": "PL . maladie"
          },
          {
            "sinon": {
              "produit": {
                "assiette": "assiette des cotisations",
                "taux": "6.50%"
              },
              "arrondi": "oui"
            }
          }
        ]
      },
      "contribution additionnelle",
      "(- participation CPAM)"
    ],
    "avec": {
      "participation CPAM": {
        "non applicable si": "métier . santé . médecin . secteur = 'S2'",
        "produit": {
          "assiette": "assiette participation CPAM",
          "taux": {
            "variations": [
              {
                "si": "date >= 01/2022",
                "alors": "PL . maladie . taux - 0.1%"
              },
              {
                "sinon": "6.40%"
              }
            ]
          }
        },
        "arrondi": "oui"
      }
    }
  },
  "dirigeant . indépendant . PL . maladie": {
    "non applicable si": "régime général",
    "remplace": "cotisations et contributions . maladie",
    "produit": {
      "assiette": {
        "valeur": "assiette des cotisations",
        "plancher": "assiette minimale . maladie"
      },
      "taux": {
        "nom": "taux",
        "taux progressif": {
          "assiette": "assiette des cotisations",
          "multiplicateur": "plafond sécurité sociale",
          "tranches": [
            {
              "plafond": "0%",
              "taux": "1.5%"
            },
            {
              "plafond": "110%",
              "taux": "6.5%"
            }
          ]
        }
      }
    },
    "arrondi": "oui",
    "références": {
      "secu-independants.fr": "https://www.secu-independants.fr/cotisations/calcul-des-cotisations/taux-de-cotisations",
      "guide urssaf (pdf)": "https://www.urssaf.fr/portail/files/live/sites/urssaf/files/documents/Diaporama_PL_statuts_hors_AE_et_PAM.pdf"
    },
    "note": "Les professions libérales réglementée ne cotisent pour la part correspondante aux\nindemnités journalières et n'ont donc pas le droit à ces indemnités en cas de\nmaladie.\n"
  },
  "dirigeant . indépendant . PL . cotisations Urssaf": {
    "description": "Les cotisations recouvrées par l'Urssaf, qui servent au financement\nde la sécurité sociale (assurance maladie, allocations familiales,\ndépendance).\n",
    "formule": {
      "somme": [
        "cotisations et contributions . CSG-CRDS",
        "cotisations et contributions . maladie",
        "cotisations et contributions . allocations familiales",
        "cotisations et contributions . formation professionnelle",
        "PAMC . CURPS"
      ],
      "arrondi": "oui"
    }
  },
  "dirigeant . indépendant . PL . cotisations caisse de retraite": {
    "description": "Les cotisations recouvrée par la caisse de retraite autonome spécifique à la profession libérale effectuée.\n",
    "formule": {
      "somme": [
        "cotisations et contributions . retraite de base",
        "cotisations et contributions . retraite complémentaire",
        "cotisations et contributions . invalidité et décès",
        "cotisations et contributions . indemnités journalières maladie",
        "cotisations et contributions . PCV"
      ],
      "arrondi": "oui"
    }
  },
  "dirigeant . indépendant . PL . CIPAV": {
    "description": "La CIPAV est la caisse de retraite autonomes des professions libérales réglementées.\n",
    "remplace": {
      "règle": "cotisations et contributions . retraite complémentaire",
      "par": "retraite complémentaire"
    },
    "références": {
      "Site web": "https://www.lacipav.fr/",
      "article de loi (chercher \"travailleurs indépendants créant leur activité\")": "https://www.legifrance.gouv.fr/eli/loi/2017/12/30/CPAX1725580L/jo/texte#JORFARTI000036339157",
      "guide pratique CIPAV 2022": "https://www.lacipav.fr/sites/default/files/2022-01/Guide%20pratique%202022%20-%20Professionnels%20lib%C3%A9raux%20-%20La%20Cipav_0.pdf"
    },
    "formule": {
      "une de ces conditions": [
        "métier = 'rattaché CIPAV'",
        {
          "toutes ces conditions": [
            "entreprise . date de création < 01/2019",
            "option régime général = non",
            "entreprise . activité . nature . libérale . réglementée = non"
          ]
        }
      ]
    }
  },
  "dirigeant . indépendant . PL . CIPAV . retraite complémentaire": {
    "non applicable si": "exonération incapacité",
    "unité": "€/an",
    "variations": [
      {
        "si": "date >= 01/2022",
        "alors": {
          "variations": [
            {
              "si": "classe = 'Classe A'",
              "alors": 1527
            },
            {
              "si": "classe = 'Classe B'",
              "alors": 3055
            },
            {
              "si": "classe = 'Classe C'",
              "alors": 4582
            },
            {
              "si": "classe = 'Classe D'",
              "alors": 7637
            },
            {
              "si": "classe = 'Classe E'",
              "alors": 10692
            },
            {
              "si": "classe = 'Classe F'",
              "alors": 16802
            },
            {
              "si": "classe = 'Classe G'",
              "alors": 18329
            },
            {
              "si": "classe = 'Classe H'",
              "alors": 19857
            }
          ]
        }
      },
      {
        "si": "date >= 01/2021",
        "alors": {
          "variations": [
            {
              "si": "classe = 'Classe A'",
              "alors": 1457
            },
            {
              "si": "classe = 'Classe B'",
              "alors": 2913
            },
            {
              "si": "classe = 'Classe C'",
              "alors": 4370
            },
            {
              "si": "classe = 'Classe D'",
              "alors": 7283
            },
            {
              "si": "classe = 'Classe E'",
              "alors": 10196
            },
            {
              "si": "classe = 'Classe F'",
              "alors": 16023
            },
            {
              "si": "classe = 'Classe G'",
              "alors": 17479
            },
            {
              "si": "classe = 'Classe H'",
              "alors": 18936
            }
          ]
        }
      }
    ],
    "références": {
      "Guide CIPAV 2022": "https://www.lacipav.fr/sites/default/files/2022-01/Guide%20pratique%202022%20-%20Professionnels%20lib%C3%A9raux%20-%20La%20Cipav_0.pdf#page=14"
    }
  },
  "dirigeant . indépendant . PL . CIPAV . retraite complémentaire . classe": {
    "titre": "Classe de cotisation",
    "grille": {
      "assiette": "assiette des cotisations",
      "tranches": [
        {
          "montant": "'Classe A'",
          "plafond": "26581 €/an"
        },
        {
          "montant": "'Classe B'",
          "plafond": "49281 €/an"
        },
        {
          "montant": "'Classe C'",
          "plafond": "57851 €/an"
        },
        {
          "montant": "'Classe D'",
          "plafond": "66401 €/an"
        },
        {
          "montant": "'Classe E'",
          "plafond": "83061 €/an"
        },
        {
          "montant": "'Classe F'",
          "plafond": "103181 €/an"
        },
        {
          "montant": "'Classe G'",
          "plafond": "123301 €/an"
        },
        {
          "montant": "'Classe H'"
        }
      ]
    },
    "références": {
      "Guide CIPAV 2022": "https://www.lacipav.fr/sites/default/files/2022-01/Guide%20pratique%202022%20-%20Professionnels%20lib%C3%A9raux%20-%20La%20Cipav_0.pdf#page=14"
    }
  },
  "dirigeant . indépendant . PL . CIPAV . exonération incapacité": {
    "applicable si": "CNAVPL . exonération incapacité",
    "notification": "info",
    "description": "Pour être recevable, votre demande d’exonération pour incapacité doit-être accompagnée du formulaire à faire remplir par votre médecin traitant et adressée à la CIPAV au plus tard le 31 mars de l’année suivante.",
    "remplace": {
      "règle": "retraite complémentaire . classe",
      "dans": "protection sociale . retraite . CNAVPL . CIPAV"
    },
    "valeur": "'Classe A'",
    "références": {
      "Guide CNAVPL": "https://www.cnavpl.fr/wp-content/uploads/2022/03/guideweb-2022.pdf#page=75"
    }
  },
  "dirigeant . indépendant . PL . CIPAV . retraite complémentaire . option surcotisation": {
    "question": "Avez-vous choisi de surcotiser pour améliorer vos droits à la retraite complémentaire ?",
    "non applicable si": "retraite complémentaire . classe = 'Classe H'",
    "remplace": {
      "règle": "retraite complémentaire . classe",
      "par": "option surcotisation . classe",
      "sauf dans": "option surcotisation"
    },
    "description": "Afin d’améliorer vos droits, vous pouvez choisir de\ncotiser dans la classe immédiatement supérieure\nà celle qui correspond à votre tranche de revenus\nprofessionnels.\n\nCette option vous permettra d’acquérir davantage\nde points et donc d’augmenter le montant de\nvotre future pension de retraite.\n\nPour cotiser en classe supérieure au régime\ncomplémentaire, rendez-vous sur votre espace\npersonnel Cipav :\n- onglet « Services en ligne » ;\n- rubrique « Demander à cotiser en classe supérieure ».",
    "par défaut": "non",
    "références": {
      "Guide CIPAV": "https://www.lacipav.fr/sites/default/files/2022-01/Guide%20pratique%202022%20-%20Professionnels%20lib%C3%A9raux%20-%20La%20Cipav_0.pdf#page=15"
    }
  },
  "dirigeant . indépendant . PL . CIPAV . retraite complémentaire . option surcotisation . classe": {
    "variations": [
      {
        "si": "classe = 'Classe A'",
        "alors": "'Classe B'"
      },
      {
        "si": "classe = 'Classe B'",
        "alors": "'Classe C'"
      },
      {
        "si": "classe = 'Classe C'",
        "alors": "'Classe D'"
      },
      {
        "si": "classe = 'Classe D'",
        "alors": "'Classe E'"
      },
      {
        "si": "classe = 'Classe E'",
        "alors": "'Classe F'"
      },
      {
        "si": "classe = 'Classe F'",
        "alors": "'Classe G'"
      },
      {
        "si": "classe = 'Classe G'",
        "alors": "'Classe H'"
      }
    ]
  },
  "dirigeant . indépendant . PL . CIPAV . invalidité et décès": {
    "remplace": "cotisations et contributions . invalidité et décès",
    "formule": {
      "variations": [
        {
          "si": "classe de cotisation = 'A'",
          "alors": "76 €/an"
        },
        {
          "si": "classe de cotisation = 'B'",
          "alors": "228 €/an"
        },
        {
          "si": "classe de cotisation = 'C'",
          "alors": "380 €/an"
        }
      ]
    }
  },
  "dirigeant . indépendant . PL . CIPAV . invalidité et décès . classe de cotisation": {
    "question": "Dans quelle classe cotisez-vous pour le régime invalidité-décès de la CIPAV ?",
    "description": "La Cipav gère un régime de prévoyance versant une pension en cas d'invalidité permanente et un capital décès ainsi qu’une rente pour les conjoints et enfants survivants en cas de décès de l'assuré. Par défaut les affiliés cotisent en « classe A » mais il est possible de cotiser en classe B ou C afin de bénéficier d'une meilleure couverture invalidité-décès.",
    "formule": {
      "une possibilité": {
        "choix obligatoire": "oui",
        "possibilités": [
          "A",
          "B",
          "C"
        ]
      }
    },
    "par défaut": "'A'"
  },
  "dirigeant . indépendant . PL . CIPAV . invalidité et décès . classe de cotisation . A": {
    "titre": "classe A"
  },
  "dirigeant . indépendant . PL . CIPAV . invalidité et décès . classe de cotisation . B": {
    "titre": "classe B"
  },
  "dirigeant . indépendant . PL . CIPAV . invalidité et décès . classe de cotisation . C": {
    "titre": "classe C"
  },
  "dirigeant . indépendant . PL . CIPAV . invalidité et décès . exonération invalidité et décès": {
    "question": "Avez-vous demandé à être exonéré de la cotisations invalidité-décès CIPAV ? (revenus de l'année précédente inférieurs à 6 170€)",
    "par défaut": "non",
    "description": "L’adhérent qui justifie avoir perçu, au titre de l’année précédente, un revenu professionnel inférieur à 15 % du plafond\nde la sécurité sociale en vigueur au 1er janvier de l’année en cours (soit 6 170 € pour un plafond 41 136 € en 2022),\npeut, à sa demande expresse, être dispensé de cette cotisation.",
    "rend non applicable": "dirigeant . indépendant . PL . CIPAV . invalidité et décès",
    "références": {
      "Guide CNAVPL": "https://www.cnavpl.fr/wp-content/uploads/2022/03/guideweb-2022.pdf#page=121"
    }
  },
  "dirigeant . indépendant . PL . CIPAV . conjoint collaborateur": {
    "applicable si": "conjoint collaborateur",
    "valeur": "oui"
  },
  "dirigeant . indépendant . PL . CIPAV . conjoint collaborateur . retraite complémentaire": {
    "remplace": "conjoint collaborateur . cotisations . retraite complémentaire",
    "produit": {
      "assiette": "retraite complémentaire",
      "taux": "pourcentage"
    },
    "arrondi": "oui"
  },
  "dirigeant . indépendant . PL . CIPAV . conjoint collaborateur . invalidité et décès": {
    "remplace": "conjoint collaborateur . cotisations . invalidité et décès",
    "produit": {
      "assiette": "invalidité et décès",
      "taux": "pourcentage"
    },
    "arrondi": "oui"
  },
  "dirigeant . indépendant . PL . CIPAV . conjoint collaborateur . proportion": {
    "question": "À quelle proportion du revenu le conjoint cotise-t'il pour le régime complémentaire et le régime d'invalidité-décès CIPAV ?",
    "par défaut": "'quart'",
    "formule": {
      "une possibilité": {
        "choix obligatoire": "oui",
        "possibilités": [
          "quart",
          "moitié"
        ]
      }
    }
  },
  "dirigeant . indépendant . PL . CIPAV . conjoint collaborateur . proportion . quart": {
    "formule": "proportion = 'quart'",
    "titre": "25 %"
  },
  "dirigeant . indépendant . PL . CIPAV . conjoint collaborateur . proportion . moitié": {
    "formule": "proportion = 'moitié'",
    "titre": "50 %"
  },
  "dirigeant . indépendant . PL . CIPAV . conjoint collaborateur . pourcentage": {
    "variations": [
      {
        "si": "proportion . quart",
        "alors": "25 %"
      },
      {
        "si": "proportion . moitié",
        "alors": "50 %"
      }
    ]
  },
  "dirigeant . indépendant . PL . CNAVPL": {
    "description": "La caisse nationale d'assurance vieillesse des professions libérales est\nl'organisme qui fédère les différentes caisses existantes (CIPAV, CARPIMKO,\nCARCDSF, CAVEC etc..)\n",
    "non applicable si": "régime général",
    "rend non applicable": {
      "règle": "situation personnelle . RSA",
      "dans": "dirigeant . indépendant . cotisations et contributions"
    },
    "valeur": "oui",
    "références": {
      "liste des caisses": "https://www.cnavpl.fr/regimes-complementaires-et-prevoyance/",
      "Guide CNAVPL (PDF)": "https://www.cnavpl.fr/wp-content/uploads/2022/03/guideweb-2022.pdf"
    }
  },
  "dirigeant . indépendant . PL . CNAVPL . retraite": {
    "titre": "retraite de base",
    "description": "Toutes les professions libérale (à l'exception des avocats)\nont les mêmes taux de cotisations pour leur retraite de base.\n",
    "produit": {
      "assiette": {
        "nom": "revenu cotisé",
        "valeur": "assiette des cotisations",
        "plancher": "assiette minimale . retraite"
      },
      "composantes": [
        {
          "attributs": {
            "nom": "tranche T1",
            "arrondi": "oui",
            "unité": "€/an"
          },
          "taux": {
            "nom": "taux",
            "valeur": "8.23%"
          },
          "plafond": "plafond sécurité sociale"
        },
        {
          "attributs": {
            "nom": "tranche T2",
            "arrondi": "oui",
            "unité": "€/an"
          },
          "taux": "1.87%",
          "plafond": "5 * plafond sécurité sociale"
        }
      ]
    },
    "abattement": "CARMF . participation CPAM retraite",
    "références": {
      "cnavpl.fr": "https://www.cnavpl.fr/preparer-sa-retraite/",
      "Guide CNAVPL (PDF)": "https://www.cnavpl.fr/wp-content/uploads/2022/03/guideweb-2022.pdf#page=24"
    }
  },
  "dirigeant . indépendant . PL . CNAVPL . remplacement retraite": {
    "titre": "Remplacement de la retraite de base",
    "non applicable si": "PL . CNBF",
    "remplace": [
      {
        "règle": "cotisations et contributions . retraite de base",
        "par": "retraite"
      },
      {
        "règle": "cotisations et contributions . retraite de base . taux",
        "par": "retraite . tranche T1 . taux"
      }
    ],
    "valeur": "oui"
  },
  "dirigeant . indépendant . PL . CNAVPL . indemnités journalières maladie": {
    "description": "Depuis le 1er juillet 2021 les affiliés à l’une des caisses de retraite de\nla CNAVPL peuvent bénéficier des indemnités journalières lors d’un arrêt\nmaladie.\n\nEn conséquence une nouvelle cotisation est créée.\n",
    "remplace": "cotisations et contributions . indemnités journalières maladie",
    "non applicable si": "PL . CNBF",
    "produit": {
      "assiette": {
        "nom": "assiette",
        "valeur": "assiette des cotisations",
        "plafond": {
          "nom": "plafond",
          "valeur": "3 * plafond sécurité sociale"
        },
        "plancher": "40% * plafond sécurité sociale"
      },
      "taux": {
        "nom": "taux",
        "variations": [
          {
            "si": "date >= 01/2022",
            "alors": "0.30%"
          },
          {
            "si": "date >= 01/2021",
            "alors": "0.15%"
          }
        ]
      }
    },
    "arrondi": "oui",
    "unité": "€/an",
    "références": {
      "Communiqué de la CNAVPL": "https://www.cnavpl.fr/les-pl-indemnises-des-ij/"
    }
  },
  "dirigeant . indépendant . PL . CNAVPL . exonération incapacité": {
    "question": "Avez-vous été atteint d’une incapacité d’exercice de votre profession pendant au moins six mois consécutifs cette année ?",
    "par défaut": "non",
    "description": "Si vous avez été atteint d’une incapacité d’exercice de votre profession pendant au moins six mois,\nvous êtes alors exonéré du paiement des cotisations du régime général et du régime complémentaire",
    "rend non applicable": [
      "CAVP",
      "CARMF",
      "CARPIMKO",
      "CARCDSF",
      "CNAVPL . retraite",
      "cotisations et contributions . PCV",
      "cotisations et contributions . retraite de base",
      "cotisations et contributions . retraite complémentaire"
    ],
    "références": {
      "Guide CNAVPL": "https://www.cnavpl.fr/wp-content/uploads/2022/03/guideweb-2022.pdf#page=75"
    }
  },
  "dirigeant . indépendant . PL . CNAVPL . conjoint collaborateur": {
    "applicable si": "conjoint collaborateur",
    "valeur": "oui"
  },
  "dirigeant . indépendant . PL . CNAVPL . conjoint collaborateur . proportion": {
    "question": "À quelle proportion du revenu le conjoint cotise-t'il pour le régime de base ?",
    "par défaut": "'quart'",
    "formule": {
      "une possibilité": {
        "choix obligatoire": "oui",
        "possibilités": [
          "quart",
          "moitié"
        ]
      }
    }
  },
  "dirigeant . indépendant . PL . CNAVPL . conjoint collaborateur . proportion . quart": {
    "formule": "proportion = 'quart'",
    "titre": "25 %"
  },
  "dirigeant . indépendant . PL . CNAVPL . conjoint collaborateur . proportion . moitié": {
    "formule": "proportion = 'moitié'",
    "titre": "50 %"
  },
  "dirigeant . indépendant . PL . CNAVPL . conjoint collaborateur . assiette": {
    "remplace": "conjoint collaborateur . cotisations . assiette",
    "unité": "€/an",
    "arrondi": "oui",
    "produit": {
      "assiette": "assiette des cotisations",
      "taux": "50 %",
      "variations": [
        {
          "si": "conjoint collaborateur . assiette . forfaitaire",
          "alors": {
            "assiette": "plafond sécurité sociale"
          }
        },
        {
          "si": "proportion . quart",
          "alors": {
            "taux": "25%"
          }
        },
        {
          "sinon": {}
        }
      ]
    }
  },
  "dirigeant . indépendant . PL . CNAVPL . conjoint collaborateur . retraite": {
    "remplace": "dirigeant . indépendant . conjoint collaborateur . cotisations . retraite de base",
    "recalcul": {
      "règle": "CNAVPL . retraite",
      "avec": {
        "CNAVPL . retraite . tranche T1 . revenu cotisé": {
          "valeur": "conjoint collaborateur . assiette",
          "plancher": "assiette minimale . retraite"
        },
        "CNAVPL . retraite . tranche T2 . revenu cotisé": {
          "valeur": "conjoint collaborateur . assiette",
          "plancher": "assiette minimale . retraite"
        }
      }
    }
  },
  "dirigeant . indépendant . PL . CNAVPL . conjoint collaborateur . indemnités journalières maladie": {
    "non applicable si": "date < 01/01/2022",
    "remplace": "conjoint collaborateur . cotisations . indemnités journalières maladie",
    "produit": {
      "assiette": "40% * plafond sécurité sociale",
      "taux": "indemnités journalières maladie . taux"
    },
    "unité": "€/an",
    "arrondi": "oui"
  },
  "dirigeant . indépendant . PL . PAMC": {
    "applicable si": {
      "une de ces conditions": [
        {
          "toutes ces conditions": [
            "métier = 'santé . médecin'",
            "métier . santé . médecin . secteur != 'non conventionné'"
          ]
        },
        "métier = 'santé . sage-femme'",
        "métier = 'santé . chirurgien-dentiste'",
        "métier = 'santé . auxiliaire médical'"
      ]
    },
    "rend non applicable": [
      "conjoint collaborateur",
      "entreprise . TVA . franchise de TVA",
      "dirigeant . indépendant . revenus étrangers",
      "dirigeant . indépendant . cotisations et contributions . maladie domiciliation fiscale étranger",
      "assiette minimale . maladie"
    ],
    "formule": "oui"
  },
  "dirigeant . indépendant . PL . PAMC . proportion recette activité non conventionnée": {
    "question": "Quel est la part de votre chiffre d'affaires liée à une activité non\nconventionnée (estimation) ?\n",
    "par défaut": "0%",
    "suggestions": {
      "10%": "10%",
      "30%": "30%"
    },
    "description": "Les recettes non conventionnées sont toutes celles qui ne rentrent pas dans\nles catégories suivantes :\n\n- Honoraires tirés des actes remboursables (y compris les\ndépassements d’honoraires et les frais de déplacement figurant sur le relevé\nSNIR)\n\n- Honoraires issus de rétrocessions concernant les actes remboursables\nperçues en qualité de remplaçant\n\n- Toutes les rémunérations forfaitaires versées par l’assurance maladie\n(aide à la télétransmission, indemnisation, indemnisation de la formation\ncontinue, prime à l’installation, ...)\n"
  },
  "dirigeant . indépendant . PL . PAMC . proportion recette activité non conventionnée . notification": {
    "type": "notification",
    "sévérité": "avertissement",
    "formule": "proportion recette activité non conventionnée > 100%",
    "description": "La proportion ne peut pas être supérieure à 100%\n"
  },
  "dirigeant . indépendant . PL . PAMC . remplaçant": {
    "question": {
      "texte": "Au {{ période . début d'année }}, exerciez-vous votre activité exclusivement en tant que remplaçant ?"
    },
    "description": "Les practicien et auxiliaire médical exerçant une activité de remplacement ne sont pas redevables de la contribution aux unions régionales des professionnels de santé (CURPS)\n",
    "par défaut": "non",
    "avec": {
      "offre simplifiée médecins": {
        "toutes ces conditions": [
          "entreprise . chiffre d'affaires < 19000 €/an",
          "métier = 'santé . médecin'"
        ],
        "type": "notification",
        "description": "Vous exercez une activité de médecin exclusivement en tant que remplaçant ou de régulateur ? Vous pouvez adhérer à l’offre simplifiée. [En savoir plus](https://www.medecins-remplacants.urssaf.fr/accueil)",
        "références": {
          "Site de l'offre simplifié dédiée aux médecins remplaçant": "https://www.medecins-remplacants.urssaf.fr/accueil"
        }
      }
    }
  },
  "dirigeant . indépendant . PL . PAMC . CURPS": {
    "titre": "Contribution aux unions régionales des professionnels de santé",
    "remplace": "cotisations et contributions . contributions spéciales",
    "description": "Les professions libérales de santé sont représentées par des unions\nrégionales des professionnels de santé qui contribuent à l’organisation et à\nl’évolution de l’offre de santé au niveau régional, notamment à la\npréparation du projet régional de santé et à sa mise en œuvre.\n\nCes unions sont financées par une contribution recouvrée par l’Urssaf : la\ncontribution aux unions régionales des professionnels de santé (Curps).\n",
    "note": "Les remplaçants, quelle que soit leur activité, ne sont pas redevables de la\nCurps. Si la Curps est présente sur leur échéancier de cotisations, ils sont\ninvités à se rapprocher de leur Urssaf pour que leur dossier cotisant soit\nrégularisé. Un nouvel échéancier de cotisations sera ensuite adressé.\n",
    "acronyme": "CURPS",
    "applicable si": {
      "toutes ces conditions": [
        "entreprise . date de création < période . début d'année",
        "revenu professionnel > 0"
      ]
    },
    "non applicable si": {
      "une de ces conditions": [
        "métier . santé . médecin . secteur = 'non conventionné'",
        "remplaçant"
      ]
    },
    "formule": {
      "produit": {
        "assiette": "assiette des cotisations",
        "taux": {
          "variations": [
            {
              "si": "métier = 'santé . médecin'",
              "alors": "0.5%"
            },
            {
              "si": "métier = 'santé . chirurgien-dentiste'",
              "alors": "0.3%"
            },
            {
              "sinon": "0.1%"
            }
          ]
        }
      },
      "plafond": "0.50% * plafond sécurité sociale",
      "arrondi": "oui",
      "unité": "€/an"
    },
    "références": {
      "Fiche Urssaf.fr": "https://www.urssaf.fr/portail/home/independant/mes-cotisations/quelles-cotisations/la-contribution-aux-unions-regio/la-base-de-calcul-et-le-taux-de.html"
    }
  },
  "dirigeant . indépendant . PL . PAMC . dépassement d'honoraire moyen": {
    "non applicable si": "métier . santé . médecin . secteur = 'S1'",
    "question": "Quels est votre dépassement honoraires moyen (estimation) ?",
    "par défaut": "0%"
  },
  "dirigeant . indépendant . PL . PAMC . revenus activité conventionnée": {
    "description": "Les revenus conventionnés sont ceux correspondant aux recettes tirées des\nhonoraires et des rémunérations forfaitaires versées par la CPAM.\n",
    "note": "Pour éviter d'avoir à ventiler les charges entre celles issues de\nl'activités conventionnées et celles qui ne le sont pas (ce qui aboutirait à\ndeux comptabilités distinct), on peut le calculer à partir du revenu\nprofessionnel que l'on ajuste en fonction de la part du chiffre d'affaires\nprovenant des actes conventionnés.\n",
    "formule": {
      "produit": {
        "assiette": "assiette des cotisations",
        "facteur": {
          "valeur": "100% - proportion recette activité non conventionnée",
          "plancher": "0%"
        }
      }
    }
  },
  "dirigeant . indépendant . PL . PAMC . assiette participation CPAM": {
    "description": "Aussi appelé revenu conventionnel, il s'agit du revenu des honoraires nets de dépassement.",
    "formule": "revenus activité conventionnée  / (100% + dépassement d'honoraire moyen)",
    "note": "La formule référencée dans les textes Urssaf est la suivante :\n> (revenu de l’activité conventionnée) x (total des honoraires - total des dépassements d’honoraires) / montant total des honoraires.\n\nOn peut simplififer cette formule en :\n> (revenu de l’activité conventionnée) / (100% + dépassement d'honoraire moyen)\n\n### Preuve\nSi on prends les variables suivantes,\n> `h+` : total des honoraires (avec dépassement)\n  `h` : honoraires sans dépassement\n  `d%`: pourcentage de dépassement d'honoraire moyen\n\nOn a :\n>\n  `h+ = h + h * d%`\n  `h+ = h * (100% + d%)`\n\nSi on remplace dans la formule de l'assiette participation CPAM, on a :\n> 1. `(revenu de l’activité conventionnée) * h / h+`\n> 2. `(revenu de l’activité conventionnée) * h / (h * (100% + d%))\n> 3. `(revenu de l’activité conventionnée) / (100% + d%)`\n",
    "références": {
      "Fiche Urssaf": "https://www.urssaf.fr/portail/home/praticien-et-auxiliaire-medical/mes-cotisations/le-calcul-de-mes-cotisations/la-participation-de-la-cpam-a-me/je-suis-medecin-du-secteur-1/assiette-de-participation-de-la.html"
    }
  },
  "dirigeant . indépendant . PL . PAMC . maladie . contribution additionnelle": {
    "formule": {
      "produit": {
        "assiette": "(assiette des cotisations - assiette participation CPAM)",
        "taux": "3.25%"
      },
      "arrondi": "oui"
    }
  },
  "dirigeant . indépendant . PL . PAMC . allocations familiales": {
    "applicable si": "métier . santé . médecin . secteur = 'S1'",
    "titre": "allocations familiales (après participation CPAM)",
    "remplace": {
      "règle": "cotisations et contributions . allocations familiales",
      "sauf dans": "participation CPAM"
    },
    "formule": {
      "valeur": "cotisations et contributions . allocations familiales",
      "abattement": "participation CPAM"
    },
    "références": {
      "Fiche Urssaf": "https://www.urssaf.fr/portail/home/taux-et-baremes/taux-de-cotisations/les-praticiens-et-auxiliaires-me/taux-de-cotisations-medecin-sect.html"
    }
  },
  "dirigeant . indépendant . PL . PAMC . allocations familiales . participation CPAM": {
    "formule": {
      "produit": {
        "assiette": "cotisations et contributions . allocations familiales",
        "taux": {
          "grille": {
            "assiette": "assiette participation CPAM",
            "multiplicateur": "plafond sécurité sociale",
            "tranches": [
              {
                "montant": "100%",
                "plafond": "140%"
              },
              {
                "montant": "75%",
                "plafond": "250%"
              },
              {
                "montant": "60%"
              }
            ]
          }
        }
      },
      "arrondi": "oui"
    }
  },
  "dirigeant . indépendant . PL . PAMC . assiette participation chirurgien-dentiste": {
    "applicable si": "métier = 'santé . chirurgien-dentiste'",
    "titre": "assiette participation CPAM (chirurgien dentiste)",
    "remplace": "assiette participation CPAM",
    "formule": {
      "produit": {
        "assiette": "revenus activité conventionnée",
        "taux": "1 - taux Urssaf / (1 + taux Urssaf)"
      }
    },
    "référence": {
      "Fiche Urssaf": "https://www.urssaf.fr/portail/home/praticien-et-auxiliaire-medical/mes-cotisations/le-calcul-de-mes-cotisations/la-participation-de-la-cpam-a-me/je-suis-chirurgien-dentiste/assiette-de-participation-de-la.html",
      "Texte de loi": "https://www.legifrance.gouv.fr/affichTexte.do?cidTexte=JORFTEXT000020429271&categorieLien=id"
    }
  },
  "dirigeant . indépendant . PL . PAMC . assiette participation chirurgien-dentiste . taux Urssaf": {
    "description": "Le « taux Urssaf » (taux UR) permet de calculer la part de votre\ncotisation d’assurance maladie-maternité prise en charge par la CPAM.\n\nCe taux est pré-rempli sur votre déclaration de revenus professionnels. Il\nest issu des données de votre Relevé individuel d’activité et de\nprescriptions (RIAP).\n\nPlus le taux est faible, plus la participation CPAM est importante et donc\nla part à la charge du praticien est faible.\n\n## Calcul du taux\n\nLa formule de calcul du taux de dépassement est la suivante :\n> Taux Urssaf = (dépassements - montants remboursés forfaits CMU) / (montants remboursables actes + montants remboursés forfaits CMU)\n",
    "question": "Quel est votre \"taux Urssaf\" ?",
    "unité": "",
    "par défaut": 1
  },
  "dirigeant . indépendant . PL . PAMC . assiette participation chirurgien-dentiste . taux Urssaf . notification": {
    "formule": "taux Urssaf >= 100",
    "type": "notification",
    "sévérité": "avertissement",
    "description": "Le taux Urssaf doit être inférieur à 100"
  },
  "dirigeant . indépendant . PL . PAMC . participation CPAM": {
    "titre": "Participation assurance maladie",
    "description": "Les professionnels de santé conventionnés bénéficient d'une prise en charge d'une partie de leur cotisations par l'Assurance Maladie.\n",
    "formule": {
      "somme": [
        "PAMC . allocations familiales . participation CPAM",
        "PAMC . maladie . participation CPAM",
        "CARMF . ASV . participation CPAM",
        "CARPIMKO . ASV . participation CPAM",
        "CARCDSF . chirurgien-dentiste . PCV . participation CPAM",
        "CARCDSF . sage-femme . PCV . participation CPAM",
        "CARMF . participation CPAM retraite"
      ],
      "arrondi": "oui"
    },
    "références": {
      "amelie.fr": "https://www.ameli.fr/assure/droits-demarches/salaries-travailleurs-independants-et-personnes-sans-emploi/emploi-independant-non-salarie/praticien-auxiliaire-medical",
      "rapport sécurité sociale 2009": "https://www.securite-sociale.fr/files/live/sites/SSFR/files/medias/CCSS/2009/RAPPORT/CCSS-RAPPORT-JUIN_2009-FICHE-LA_PRISE_EN_CHARGE_DES_COTISATIONS_DES_PRATICIENS_ET_AUXILIAIRES_MEDICAUX.pdf"
    }
  },
  "dirigeant . indépendant . PL . PAMC . IJSS": {
    "remplace": "indépendant . IJSS . imposable",
    "rend non applicable": "indépendant . IJSS",
    "titre": "indemnités journalières de sécurité sociale",
    "description": "Les indemnités journalières de Sécurité sociale (IJSS) sont versées dans le cas de congé maternité/paternité/adoption.\n\nLa CSG-CRDS est automatiquement précomptée par l'Assurance maladie lors du versement. Leur montant est donc retranché à l'assiette pour le calcul de la CSG-CRDS restante dûe.\n\nLes indemnités complémentaires aux indemnités journalières de la Sécurité sociale versées dans le cadre d’un contrat de prévoyance ne constituent pas des revenus de remplacement.\nNote: Les prestations d’invalidité versées par les régimes d’invalidité-décès ne sont pas concernées.",
    "question": "Quel est le montant des indemnités journalières de maternité ou paternité perçu au titre de votre activité libérale ?",
    "par défaut": "0 €/an"
  },
  "dirigeant . indépendant . PL . CAVP": {
    "description": "La CAVP est la caisse de retraite des pharmaciens.",
    "formule": "oui",
    "applicable si": "métier = 'santé . pharmacien'",
    "références": {
      "Site CAVP": "https://www.cavp.fr/"
    }
  },
  "dirigeant . indépendant . PL . CAVP . directeur non médecin": {
    "applicable si": "métier = 'santé . pharmacien'",
    "par défaut": "non",
    "question": "Êtes-vous biologiste médical conventionné ?"
  },
  "dirigeant . indépendant . PL . CAVP . demande reduction": {
    "type": "notification",
    "formule": {
      "une de ces conditions": [
        "assiette des cotisations < 1.8125 * plafond sécurité sociale",
        "entreprise . durée d'activité <= 2 an"
      ]
    },
    "résumé": "Une réduction de cotisations peut être demandée les 2 premières années, ou\nen cas de revenus faibles. Ainsi, si vos revenus de l'avant-dernière année,\nou de l'année précédente s'ils sont connus (soit 2018 ou 2019 pour les cotisations\n2020), étaient :\n  - inférieurs à 1/3 du PASS (13 712 € en 2020), vous pouvez demander une réduction de 75 % ;\n  - entre 1/3 et 2/3 du PASS (entre 13 712 et 27 423 € en 2020), vous pouvez demander une réduction de 50 % ;\n  - entre 2/3 du PASS et le PASS (entre 27 424 € et 41 135 € en 2020), vous pouvez demander une réduction de 25 %.\n\nCette possibilité est réservée aux pharmaciens qui cotisent en classe 3 (la plus basse).\n",
    "références": {
      "CAVP": "https://www.cavp.fr/votre-profil/pharmacien-en-activite/quelles-possibilit%C3%A9s-en-cas-de-difficult%C3%A9s"
    }
  },
  "dirigeant . indépendant . PL . CAVP . cotisation de référence": {
    "valeur": {
      "variations": [
        {
          "si": "date >= 01/2022",
          "alors": "1232 €"
        },
        {
          "si": "date >= 01/2021",
          "alors": "1200 €"
        }
      ]
    },
    "reference": {
      "site cavp.fr": "https://www.cavp.fr/votre-profil/pharmacien-en-activite/vos-cotisations-regime-complementaire"
    }
  },
  "dirigeant . indépendant . PL . CAVP . retraite complémentaire": {
    "remplace": "cotisations et contributions . retraite complémentaire",
    "formule": "part géré par répartition + part géré par capitalisation",
    "références": {
      "Site CAVP": "https://www.cavp.fr/votre-profil/pharmacien-en-activite/vos-cotisations-regime-complementaire",
      "Legifrance": "https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000039357705"
    }
  },
  "dirigeant . indépendant . PL . CAVP . retraite complémentaire . part géré par répartition": {
    "formule": "5 * cotisation de référence",
    "références": {
      "Site CAVP": "https://www.cavp.fr/votre-profil/pharmacien-en-activite/vos-cotisations-regime-complementaire",
      "Legifrance": "https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000039357705"
    }
  },
  "dirigeant . indépendant . PL . CAVP . retraite complémentaire . part géré par capitalisation": {
    "formule": {
      "grille": {
        "assiette": "assiette des cotisations",
        "multiplicateur": "plafond sécurité sociale",
        "tranches": [
          {
            "montant": "2 * cotisation de référence",
            "plafond": 1.8125
          },
          {
            "montant": "3 * cotisation de référence",
            "plafond": 2.1875
          },
          {
            "montant": "4 * cotisation de référence",
            "plafond": 2.5625
          },
          {
            "montant": "5 * cotisation de référence",
            "plafond": 2.9375
          },
          {
            "montant": "6 * cotisation de référence",
            "plafond": 3.3125
          },
          {
            "montant": "7 * cotisation de référence",
            "plafond": 3.6875
          },
          {
            "montant": "8 * cotisation de référence",
            "plafond": 4.0625
          },
          {
            "montant": "9 * cotisation de référence",
            "plafond": 4.4375
          },
          {
            "montant": "10 * cotisation de référence",
            "plafond": 4.8125
          },
          {
            "montant": "11 * cotisation de référence",
            "plafond": 5.1875
          },
          {
            "montant": "12 * cotisation de référence"
          }
        ]
      }
    },
    "références": {
      "Site CAVP": "https://www.cavp.fr/votre-profil/pharmacien-en-activite/vos-cotisations-regime-complementaire",
      "Legifrance": "https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000039357705"
    }
  },
  "dirigeant . indépendant . PL . CAVP . invalidité et décès": {
    "titre": "invalidité et décès",
    "remplace": "cotisations et contributions . invalidité et décès",
    "formule": "608 €/an",
    "références": {
      "Site CAVP": "https://www.cavp.fr/votre-profil/pharmacien-en-activite/vos-cotisations"
    }
  },
  "dirigeant . indépendant . PL . CAVP . PCV": {
    "titre": "Prestation complémentaire de vieillesse (CAVP)",
    "remplace": "cotisations et contributions . PCV",
    "applicable si": "dirigeant . indépendant . PL . CAVP . directeur non médecin",
    "formule": {
      "somme": [
        "cotisations forfaitaire",
        "cotisations proportionnelle",
        "(- aide CPAM)"
      ],
      "arrondi": "oui"
    },
    "référence": {
      "Taux 2021 (CAVP)": "https://www.cavp.fr/votre-profil/pharmacien-en-activite/vos-cotisations-regime-des-prestations-complementaires-vieillesse",
      "La retraite en claire": "https://www.la-retraite-en-clair.fr/parcours-professionnel-regimes-retraite/retraite-travailleurs-independants/retraite-complementaire-pharmaciens-cavp"
    }
  },
  "dirigeant . indépendant . PL . CAVP . PCV . cotisations forfaitaire": {
    "variations": [
      {
        "si": "date >= 01/2022",
        "alors": "1788 €/an"
      },
      {
        "si": "date >= 01/2021",
        "alors": "1728 €/an"
      }
    ],
    "références": {
      "site cavp.fr": "https://www.cavp.fr/votre-profil/pharmacien-en-activite/vos-cotisations-regime-des-prestations-complementaires-vieillesse"
    }
  },
  "dirigeant . indépendant . PL . CAVP . PCV . cotisations proportionnelle": {
    "formule": {
      "produit": {
        "assiette": "assiette des cotisations",
        "taux": "0.30%",
        "plafond": "5 * plafond sécurité sociale"
      }
    }
  },
  "dirigeant . indépendant . PL . CAVP . PCV . aide CPAM": {
    "somme": [
      "aide CPAM forfaitaire",
      "aide CPAM proportionnelle"
    ],
    "référence": {
      "CAVP": "https://www.cavp.fr/votre-profil/pharmacien-en-activite/vos-cotisations-regime-des-prestations-complementaires-vieillesse",
      "La retraite en claire": "https://www.la-retraite-en-clair.fr/parcours-professionnel-regimes-retraite/retraite-travailleurs-independants/retraite-complementaire-pharmaciens-cavp"
    }
  },
  "dirigeant . indépendant . PL . CAVP . PCV . aide CPAM forfaitaire": {
    "formule": "66% * cotisations forfaitaire"
  },
  "dirigeant . indépendant . PL . CAVP . PCV . aide CPAM proportionnelle": {
    "formule": "50% * cotisations proportionnelle"
  },
  "dirigeant . indépendant . PL . CARPIMKO": {
    "description": "La CARPIMKO est la caisse de retraite autonome des auxiliaires médicaux.",
    "formule": "oui",
    "applicable si": "métier = 'santé . auxiliaire médical'",
    "références": {
      "Site CARPIMKO": "https://www.carpimko.com"
    }
  },
  "dirigeant . indépendant . PL . CARPIMKO . retraite complémentaire": {
    "remplace": "cotisations et contributions . retraite complémentaire",
    "formule": {
      "somme": [
        {
          "variations": [
            {
              "si": "date >= 01/2022",
              "alors": "1840 €/an"
            },
            {
              "si": "date >= 01/2021",
              "alors": "1648 €/an"
            }
          ]
        },
        {
          "barème": {
            "assiette": "assiette des cotisations",
            "tranches": [
              {
                "taux": "0%",
                "plafond": "25246 €/an"
              },
              {
                "taux": "3%",
                "plafond": {
                  "variations": [
                    {
                      "si": "date >= 01/2022",
                      "alors": "193913 €/an"
                    },
                    {
                      "si": "date >= 01/2021",
                      "alors": "176413 €/an"
                    }
                  ]
                }
              }
            ]
          },
          "arrondi": "oui"
        }
      ]
    },
    "références": {
      "Site CARPIMKO": "https://www.carpimko.com/je-suis-en-activite/mes-cotisations/mes-cotisations-sadaptent-a-mes-revenus"
    }
  },
  "dirigeant . indépendant . PL . CARPIMKO . invalidité et décès": {
    "titre": "invalidité et décès",
    "remplace": "cotisations et contributions . invalidité et décès",
    "variations": [
      {
        "si": "date >= 01/2022",
        "alors": "776 €/an"
      },
      {
        "si": "date >= 01/2021",
        "alors": "678 €/an"
      }
    ],
    "références": {
      "Site CARPIMKO": "https://www.carpimko.com/je-suis-en-activite/mes-cotisations/mes-cotisations-sadaptent-a-mes-revenus"
    }
  },
  "dirigeant . indépendant . PL . CARPIMKO . ASV": {
    "titre": "Avantage social vieillesse",
    "remplace": "cotisations et contributions . PCV",
    "formule": {
      "somme": [
        {
          "nom": "forfaitaire",
          "variations": [
            {
              "si": "date >= 01/2022",
              "alors": "601 €/an"
            },
            {
              "si": "date >= 01/2021",
              "alors": "590 €/an"
            }
          ]
        },
        {
          "nom": "proportionnelle",
          "produit": {
            "assiette": "PAMC . assiette participation CPAM",
            "taux": "0.40%"
          }
        },
        "(- participation CPAM)"
      ],
      "arrondi": "oui"
    },
    "références": {
      "Taux Carpimko": "https://www.carpimko.com/je-suis-en-activite/mes-cotisations/mes-cotisations-sadaptent-a-mes-revenus"
    }
  },
  "dirigeant . indépendant . PL . CARPIMKO . ASV . participation CPAM": {
    "applicable si": "PAMC",
    "formule": {
      "somme": [
        {
          "produit": {
            "assiette": "forfaitaire",
            "taux": "2 / 3"
          },
          "arrondi": "oui"
        },
        "60% * proportionnelle"
      ]
    }
  },
  "dirigeant . indépendant . PL . CARMF": {
    "formule": "oui",
    "description": "La CARMF est la caisse de retraite autonome des médecins de France.\n",
    "applicable si": "métier = 'santé . médecin'",
    "références": {
      "Site CARMF": "http://www.carmf.fr"
    },
    "note": "L’affiliation est obligatoire pour les médecins titulaires du diplôme de\ndocteur en médecine, inscrits au conseil de l’Ordre et exerçant une activité\nlibérale (installation, remplacements, expertises pour les compagnies\nd’assurance ou les laboratoires privés, secteur privé à l’hôpital, en\nsociété d’exercice libéral ou toute autre activité rémunérée sous forme\nd’honoraires, même s’il ne s’agit pas de la médecine de soins) en France\nmétropolitaine et dans les départements d’Outre-Mer ou à Monaco.\n"
  },
  "dirigeant . indépendant . PL . CARMF . retraite CNAVPL": {
    "déprécié": "oui",
    "titre": "retraite de base CNAVPL (après participation CPAM)",
    "valeur": "CNAVPL . retraite",
    "abattement": {
      "nom": "participation CPAM",
      "valeur": "participation CPAM retraite"
    }
  },
  "dirigeant . indépendant . PL . CARMF . participation CPAM retraite": {
    "applicable si": "métier . santé . médecin . secteur = 'S1'",
    "description": "Pour compenser la hausse de la CSG, les médecins de secteur 1 bénéficient d'une participation de l'assurance maladie (avenant n°5 de la convention médicale) au financement de leurs cotisations du régime de base.\n",
    "unité": "€/an",
    "produit": {
      "assiette": "assiette des cotisations",
      "taux": {
        "grille": {
          "assiette": "assiette des cotisations",
          "multiplicateur": "plafond sécurité sociale",
          "tranches": [
            {
              "montant": "2.15%",
              "plafond": "140%"
            },
            {
              "montant": "1.51%",
              "plafond": "250%"
            },
            {
              "montant": "1.12%"
            }
          ]
        }
      },
      "arrondi": "oui"
    },
    "références": {
      "Avenant 5 à la convention médical": "https://www.ameli.fr/sites/default/files/Documents/434342/document/avis_relatif_a_lavenant_ndeg_5_a_la_convention_nationale_organisant_les_rapports_entre_les_medecins_liberaux_et_lassurance_maladie.pdf"
    }
  },
  "dirigeant . indépendant . PL . CARMF . retraite complémentaire": {
    "remplace": "cotisations et contributions . retraite complémentaire",
    "description": "La CARMF gère le régime de retraite complémentaire.\nLe montant des cotisations est déterminé en fonction des revenus nets d’activité indépendante de l’avant-dernière année.\nLes cotisations des deux premières années d’affiliation ne sont pas dues, sauf si vous étes âgé de plus de 40 ans au début de votre activité libérale. Dans ce cas, la cotisation est proportionnelle aux revenus nets d'activité indépendante de 2018 plafonnés, sans régularisation ultérieure, avec une cotisation maximale de 14 110 €.",
    "arrondi": "oui",
    "variations": [
      {
        "si": "entreprise . durée d'activité . en fin d'année < 2 ans",
        "alors": "0€/an"
      },
      {
        "sinon": {
          "produit": {
            "assiette": "assiette des cotisations",
            "plafond": "3.5 * plafond sécurité sociale",
            "taux": "10%"
          }
        }
      }
    ],
    "unité": "€/an",
    "références": {
      "Site CARMF": "http://www.carmf.fr/page.php?page=cdrom/coti/coti-chiffre.htm"
    }
  },
  "dirigeant . indépendant . PL . CARMF . invalidité décès": {
    "remplace": "cotisations et contributions . invalidité et décès",
    "description": "La CARMF gère un régime de prévoyance versant une pension en cas d'invalidité permanente et un capital décès ainsi qu’une rente pour les conjoints et enfants survivants en cas de décès de l'assuré.\nLa cotisation comporte trois classes forfaitaires dont le montant est déterminé en fonction de vos revenus nets d'activité indépendante de l’avant-dernière année.\nSans communication des revenus professionnels non salariés et de l’avis d’imposition de l’avant dernière année, le taux d’indemnisation ne peut être fixé. Dans l’attente de la réception de ce document l’indemnisation sera basée sur le taux prévu pour la classe A.",
    "formule": {
      "grille": {
        "assiette": "assiette des cotisations",
        "multiplicateur": "plafond sécurité sociale",
        "tranches": [
          {
            "montant": "631 €/an",
            "plafond": 1
          },
          {
            "montant": "738 €/an",
            "plafond": 3
          },
          {
            "montant": "863 €/an"
          }
        ]
      }
    },
    "références": {
      "Montant des cotisations": "http://www.carmf.fr/page.php?page=cdrom/coti/coti-cours.htm#base",
      "Détails des couvertures": "http://www.carmf.fr/page.php?page=cdrom/prev/prev-chiffre.htm"
    }
  },
  "dirigeant . indépendant . PL . CARMF . ASV": {
    "titre": "Allocations supplémentaires de vieillesse",
    "remplace": "cotisations et contributions . PCV",
    "description": "Le régime des allocations supplémentaires de vieillesse (ASV) s'applique pour les médecins conventionnés.\nIl fonctionne en points et comprend une part forfaitaire et une part d’ajustement calculée sur le revenu conventionnel de N-2.\nLes deux tiers de la cotisation des médecins en secteur 1 sont financés par les Caisses maladie.",
    "non applicable si": "métier . santé . médecin . secteur = 'non conventionné'",
    "valeur": {
      "nom": "assiette",
      "somme": [
        "5136 €/an",
        {
          "produit": {
            "assiette": "PAMC . revenus activité conventionnée",
            "plafond": "5 * plafond sécurité sociale",
            "taux": "3.80%"
          }
        }
      ],
      "unité": "€/an"
    },
    "abattement": "participation CPAM",
    "arrondi": "oui",
    "références": {
      "Taux 2021": "http://www.carmf.fr/page.php?page=chiffrescles/stats/2021/taux2021.htm",
      "Taux 2022": "http://www.carmf.fr/page.php?page=chiffrescles/stats/2022/taux2022.htm"
    }
  },
  "dirigeant . indépendant . PL . CARMF . ASV . participation CPAM": {
    "applicable si": "métier . santé . médecin . secteur = 'S1'",
    "formule": {
      "produit": {
        "assiette": "assiette",
        "taux": "2 / 3"
      }
    }
  },
  "dirigeant . indépendant . PL . CARCDSF": {
    "formule": "oui",
    "description": "La CARCDSF est la caisse de retraite des chirurgiens dentiste et des sages femmes.\n",
    "applicable si": {
      "une de ces conditions": [
        "métier = 'santé . chirurgien-dentiste'",
        "métier = 'santé . sage-femme'"
      ]
    },
    "références": {
      "Site Web": "http://www.carcdsf.fr"
    }
  },
  "dirigeant . indépendant . PL . CARCDSF . retraite complémentaire": {
    "remplace": "cotisations et contributions . retraite complémentaire",
    "formule": {
      "somme": [
        "cotisation forfaitaire",
        "cotisation proportionnelle"
      ]
    },
    "références": {
      "Site CARCDSF": "https://www.carcdsf.fr/cotisations-du-praticien/montant-des-cotisations"
    }
  },
  "dirigeant . indépendant . PL . CARCDSF . retraite complémentaire . cotisation proportionnelle": {
    "formule": {
      "unité": "€/an",
      "barème": {
        "assiette": "assiette des cotisations",
        "multiplicateur": "plafond sécurité sociale",
        "tranches": [
          {
            "taux": "0%",
            "plafond": 0.85
          },
          {
            "taux": "10.65%",
            "plafond": 5
          }
        ]
      },
      "arrondi": "oui"
    }
  },
  "dirigeant . indépendant . PL . CARCDSF . retraite complémentaire . cotisation forfaitaire": {
    "formule": {
      "produit": {
        "assiette": "2960.40 €/an",
        "facteur": {
          "variations": [
            {
              "si": "taux réduction",
              "alors": "taux réduction"
            },
            {
              "sinon": "100%"
            }
          ]
        }
      },
      "arrondi": "oui"
    }
  },
  "dirigeant . indépendant . PL . CARCDSF . retraite complémentaire . cotisation forfaitaire . réduction applicable": {
    "formule": "assiette des cotisations < 85% * plafond sécurité sociale",
    "description": "Vous avez la possibilité de bénéficier d'une réduction de cotisation\npour la retraite complémentaire si vous en faites la demande. [En savoir\nplus](/documentation/dirigeant/indépendant/PL/CARCDSF/retraite-complémentaire/cotisation-forfaitaire/taux-réduction)\n",
    "type": "notification"
  },
  "dirigeant . indépendant . PL . CARCDSF . retraite complémentaire . cotisation forfaitaire . taux réduction": {
    "applicable si": "réduction applicable",
    "description": "Les affiliés dont les revenus professionnels nets sur l'année N-1 sont inférieurs à 85\n% du PASS en vigueur au 1er janvier de l’année considérée (34 966 € en 2020)\npeuvent, sur demande, obtenir une réduction de la cotisation forfaitaire.\n\nLe coefficient de réduction appliqué est égal au rapport des revenus\nprofessionnels non-salariés sur le seuil mentionné ci-dessus.\n\nLa demande doit être adressée à la CARCDSF et être accompagnée d’une\nphotocopie de la déclaration d’impôt n° 2042 C ou 2035 ou 2065 et de leurs\nannexes (2033 B et D ou 2053 et 2058 A) de l’année 2019.\n",
    "unité": "%",
    "formule": "assiette des cotisations / (85% * plafond sécurité sociale)",
    "références": {
      "Site CARCDSF": "https://www.carcdsf.fr/cotisations-du-praticien/montant-des-cotisations"
    }
  },
  "dirigeant . indépendant . PL . CARCDSF . chirurgien-dentiste": {
    "applicable si": "métier = 'santé . chirurgien-dentiste'",
    "formule": "oui"
  },
  "dirigeant . indépendant . PL . CARCDSF . chirurgien-dentiste . RID": {
    "titre": "invalidité et décès",
    "remplace": "cotisations et contributions . invalidité et décès",
    "formule": "1078 €/an"
  },
  "dirigeant . indépendant . PL . CARCDSF . chirurgien-dentiste . PCV": {
    "titre": "Prestation complémentaire vieillesse",
    "remplace": "cotisations et contributions . PCV",
    "non applicable si": "exonération PCV",
    "note": "Une dispense peut être accordée lorsque les revenus professionnels 2019 sont inférieurs ou égaux à 500 C (valeur au 1er janvier de l’année considérée), soit 11 500 €.\nLa demande doit être accompagnée d’une photocopie de la déclaration d’impôt n° 2042 C ou 2035 ou 2065 et de leurs annexes (2033 B et D ou 2053 et 2058 A) de l’année 2019.\nCette dispense entraîne l’annulation des droits pour l’année et les points non cotisés ne sont pas rachetables.",
    "somme": [
      "forfaitaire",
      "proportionnelle"
    ],
    "arrondi": "oui",
    "avec": {
      "forfaitaire": "1440.60 €/an",
      "proportionnelle": {
        "produit": {
          "assiette": "assiette des cotisations",
          "plafond": "5 * plafond sécurité sociale",
          "taux": "0.725 %"
        },
        "unité": "€/an",
        "références": {
          "Site CARCDSF": "https://www.carcdsf.fr/cotisations-du-praticien/montant-des-cotisations"
        }
      }
    }
  },
  "dirigeant . indépendant . PL . CARCDSF . chirurgien-dentiste . PCV . participation CPAM": {
    "formule": {
      "somme": [
        "2 * forfaitaire",
        "proportionnelle"
      ]
    },
    "références": {
      "Guide CARCDSF (PDF, page 6)": "https://www.carcdsf.fr/images/memento/0872-19_CARCDSF_MEMENTO_2020_CHIRURGIENS_DENTISTES-WEB.pdf"
    }
  },
  "dirigeant . indépendant . PL . CARCDSF . chirurgien-dentiste . exonération PCV": {
    "type": "notification",
    "formule": "(assiette des cotisations / prix d'une consultation) <=  500 consultation/an",
    "description": "Vous avez la possibilité de bénéficier d'une exonération totale de cotisation pour la prestation complémentaire de vieillesse (PCV) si vous en faites la demande. [En savoir plus](https://www.carcdsf.fr/cotisations-du-praticien/montant-des-cotisations)"
  },
  "dirigeant . indépendant . PL . CARCDSF . chirurgien-dentiste . prix d'une consultation": {
    "formule": "23 €/consultation"
  },
  "dirigeant . indépendant . PL . CARCDSF . sage-femme": {
    "applicable si": "métier = 'santé . sage-femme'",
    "formule": "oui"
  },
  "dirigeant . indépendant . PL . CARCDSF . sage-femme . RID": {
    "titre": "invalidité et décès",
    "description": "Il existe classes de cotisations aux choix, correspondant à des cotisations\net des degrés d'indemnisations différents.\n\nLe changement d'option pour une classe supérieure doit être demandé avant le\n1er juillet de l'année en cours, pour prendre effet au 1er janvier de\nl'année suivante.\n\nAucun changement de classe n'est autorisé après le 1er juillet du 56e anniversaire.\n",
    "remplace": "cotisations et contributions . invalidité et décès",
    "formule": {
      "variations": [
        {
          "si": "classe = 'A'",
          "alors": "91 €/an"
        },
        {
          "si": "classe = 'B'",
          "alors": "182 €/an"
        },
        {
          "si": "classe = 'C'",
          "alors": "273 €/an"
        }
      ]
    },
    "références": {
      "Montant des cotisations": "https://www.carcdsf.fr/cotisations-du-praticien/montant-des-cotisations"
    }
  },
  "dirigeant . indépendant . PL . CARCDSF . sage-femme . RID . classe": {
    "titre": "Classe de cotisation",
    "question": "Dans quelle classe cotisez-vous pour le régime invalidité-décès de la CARCDSF ?",
    "description": "Il existe classes de cotisations aux choix, correspondant à des cotisations\net des degrés d'indemnisations différents.\n",
    "par défaut": "'A'",
    "formule": {
      "une possibilité": {
        "choix obligatoire": "oui",
        "possibilités": [
          "A",
          "B",
          "C"
        ]
      }
    }
  },
  "dirigeant . indépendant . PL . CARCDSF . sage-femme . RID . classe . A": {
    "titre": "classe A"
  },
  "dirigeant . indépendant . PL . CARCDSF . sage-femme . RID . classe . B": {
    "titre": "classe B"
  },
  "dirigeant . indépendant . PL . CARCDSF . sage-femme . RID . classe . C": {
    "titre": "classe C"
  },
  "dirigeant . indépendant . PL . CARCDSF . sage-femme . PCV": {
    "remplace": "cotisations et contributions . PCV",
    "non applicable si": "exonération PCV",
    "description": "Pour 2020, le montant est fixé à 780 € dont un tiers, soit 260 € à votre\ncharge et 520 € à la charge des Caisses Primaires d’Assurance Maladie\n(CPAM).\n",
    "formule": {
      "valeur": "780 €/an",
      "abattement": {
        "nom": "participation CPAM",
        "valeur": "520 €/an"
      }
    },
    "références": {
      "Site CARCDSF": "https://www.carcdsf.fr/cotisations-du-praticien/montant-des-cotisations"
    },
    "note": "Une dispense peut être accordée lorsque les revenus professionnels sont\ninférieurs ou égaux à 3120 €.\n\nLa demande doit être accompagnée d’une photocopie de la déclaration d’impôt\nn° 2042 C ou 2035 ou 2065 et de leurs annexes (2033 B et D ou 2053 et 2058\nA).\n\nCette dispense entraîne l’annulation des droits pour l’année et les points\nnon cotisés ne sont pas rachetables.\n"
  },
  "dirigeant . indépendant . PL . CARCDSF . sage-femme . exonération PCV": {
    "type": "notification",
    "formule": "assiette des cotisations <= 3120 €/an",
    "description": "Vous avez la possibilité de bénéficier d'une exonération totale de cotisation pour la prestation complémentaire de vieillesse (PCV) si vous en faites la demande. [En savoir plus](https://www.carcdsf.fr/cotisations-du-praticien/montant-des-cotisations)"
  },
  "dirigeant . indépendant . PL . CNBF": {
    "formule": "oui",
    "applicable si": "métier = 'avocat'",
    "description": "La Caisse Nationale des Barreaux Français (CNBF) est l’organisme de sécurité\nsociale des avocats.\n",
    "rend non applicable": [
      "cotisations et contributions . indemnités journalières maladie",
      "conjoint collaborateur"
    ],
    "références": {
      "Site CNBF": "https://www.cnbf.fr",
      "Barème 2020": "https://www.cnbf.fr/wp-content/uploads/2020/08/CNBF-bareme-des-cotisations-et-prestations-2020.pdf"
    }
  },
  "dirigeant . indépendant . PL . CNBF . retraite de base": {
    "remplace": "cotisations et contributions . retraite de base",
    "formule": {
      "somme": [
        {
          "nom": "cotisation forfaitaire",
          "grille": {
            "assiette": "entreprise . durée d'activité . en fin d'année",
            "tranches": [
              {
                "montant": {
                  "variations": [
                    {
                      "si": "date >= 01/2022",
                      "alors": "303 €/an"
                    },
                    {
                      "si": "date >= 01/2021",
                      "alors": "290 €/an"
                    }
                  ]
                },
                "plafond": "1 an"
              },
              {
                "montant": {
                  "variations": [
                    {
                      "si": "date >= 01/2022",
                      "alors": "608 €/an"
                    },
                    {
                      "si": "date >= 01/2021",
                      "alors": "581 €/an"
                    }
                  ]
                },
                "plafond": "2 ans"
              },
              {
                "montant": {
                  "variations": [
                    {
                      "si": "date >= 01/2022",
                      "alors": "954 €/an"
                    },
                    {
                      "si": "date >= 01/2021",
                      "alors": "912 €/an"
                    }
                  ]
                },
                "plafond": "3 ans"
              },
              {
                "montant": {
                  "variations": [
                    {
                      "si": "date >= 01/2022",
                      "alors": "1299 €/an"
                    },
                    {
                      "si": "date >= 01/2021",
                      "alors": "1242 €/an"
                    }
                  ]
                },
                "plafond": "5 ans"
              },
              {
                "montant": {
                  "variations": [
                    {
                      "si": "date >= 01/2022",
                      "alors": "1658 €/an"
                    },
                    {
                      "si": "date >= 01/2021",
                      "alors": "1586 €/an"
                    }
                  ]
                }
              }
            ]
          }
        },
        {
          "nom": "cotisation proportionnelle",
          "produit": {
            "taux": "3.1%",
            "assiette": "assiette des cotisations",
            "plafond": {
              "variations": [
                {
                  "si": "date >= 01/2022",
                  "alors": "297549 €/an"
                },
                {
                  "si": "date >= 01/2021",
                  "alors": "291718 €/an"
                }
              ]
            }
          }
        }
      ]
    },
    "références": {
      "barème 2022": "https://www.cnbf.fr/wp-content/uploads/2021/12/Bareme-CNBF-2022.pdf"
    }
  },
  "dirigeant . indépendant . PL . CNBF . retraite complémentaire": {
    "remplace": "cotisations et contributions . retraite complémentaire",
    "barème": {
      "assiette": "assiette des cotisations",
      "multiplicateur": {
        "variations": [
          {
            "si": "date >= 01/2022",
            "alors": "42507 €/an"
          },
          {
            "si": "date >= 01/2021",
            "alors": "41674 €/an"
          }
        ]
      },
      "tranches": [
        {
          "taux": {
            "variations": [
              {
                "si": "date >= 01/2022",
                "alors": "4.60%"
              },
              {
                "si": "date >= 01/2021",
                "alors": "4%"
              }
            ]
          },
          "plafond": 1
        },
        {
          "taux": {
            "variations": [
              {
                "si": "date >= 01/2022",
                "alors": "8.80%"
              },
              {
                "si": "date >= 01/2021",
                "alors": "8%"
              }
            ]
          },
          "plafond": 2
        },
        {
          "taux": {
            "variations": [
              {
                "si": "date >= 01/2022",
                "alors": "10.20%"
              },
              {
                "si": "date >= 01/2021",
                "alors": "9.2%"
              }
            ]
          },
          "plafond": 3
        },
        {
          "taux": {
            "variations": [
              {
                "si": "date >= 01/2022",
                "alors": "11.60%"
              },
              {
                "si": "date >= 01/2021",
                "alors": "10.4%"
              }
            ]
          },
          "plafond": 4
        },
        {
          "taux": {
            "variations": [
              {
                "si": "date >= 01/2022",
                "alors": "13%"
              },
              {
                "si": "date >= 01/2021",
                "alors": "11.6%"
              }
            ]
          },
          "plafond": 5
        }
      ]
    },
    "arrondi": "oui",
    "note": "Il existe plusieurs classes de cotisations, qui permettent de cotiser\nd'avantage pour acquérir d'avantages de points. Seule la première classe est\nimplémentée pour l'instant.\n",
    "références": {
      "barème 2022": "https://www.cnbf.fr/wp-content/uploads/2021/12/Bareme-CNBF-2022.pdf"
    }
  },
  "dirigeant . indépendant . PL . CNBF . RID": {
    "titre": "invalidité et décès",
    "remplace": "cotisations et contributions . invalidité et décès",
    "formule": {
      "variations": [
        {
          "si": "entreprise . durée d'activité . en fin d'année < 5 ans",
          "alors": {
            "variations": [
              {
                "si": "date >= 01/2022",
                "alors": "58 €/an"
              },
              {
                "si": "date >= 01/2021",
                "alors": "55 €/an"
              }
            ]
          }
        },
        {
          "sinon": {
            "variations": [
              {
                "si": "date >= 01/2022",
                "alors": "145 €/an"
              },
              {
                "si": "date >= 01/2021",
                "alors": "137 €/an"
              }
            ]
          }
        }
      ]
    },
    "références": {
      "barème 2022": "https://www.cnbf.fr/wp-content/uploads/2021/12/Bareme-CNBF-2022.pdf"
    }
  },
  "dirigeant . indépendant . PL . CAVEC": {
    "formule": "oui",
    "applicable si": "métier = 'expert-comptable'",
    "description": "La CAVEC est l’organisme de sécurité sociale des experts-comptables et des\ncommissaires aux comptes.\n",
    "rend non applicable": [
      "conjoint collaborateur"
    ],
    "références": {
      "Site CAVEC": "https://www.cavec.fr"
    }
  },
  "dirigeant . indépendant . PL . CAVEC . retraite complémentaire": {
    "remplace": "cotisations et contributions . retraite complémentaire",
    "formule": {
      "grille": {
        "assiette": "assiette des cotisations",
        "unité": "€/an",
        "tranches": [
          {
            "montant": {
              "variations": [
                {
                  "si": "date >= 01/2022",
                  "alors": 670
                },
                {
                  "si": "date >= 01/2021",
                  "alors": 648
                }
              ]
            },
            "plafond": "16190 €/an"
          },
          {
            "montant": {
              "variations": [
                {
                  "si": "date >= 01/2022",
                  "alors": 2511
                },
                {
                  "si": "date >= 01/2021",
                  "alors": 2430
                }
              ]
            },
            "plafond": "32350 €/an"
          },
          {
            "montant": {
              "variations": [
                {
                  "si": "date >= 01/2022",
                  "alors": 3962
                },
                {
                  "si": "date >= 01/2021",
                  "alors": 3834
                }
              ]
            },
            "plafond": "44790 €/an"
          },
          {
            "montant": {
              "variations": [
                {
                  "si": "date >= 01/2022",
                  "alors": 6194
                },
                {
                  "si": "date >= 01/2021",
                  "alors": 5994
                }
              ]
            },
            "plafond": "64560 €/an"
          },
          {
            "montant": {
              "variations": [
                {
                  "si": "date >= 01/2022",
                  "alors": 9877
                },
                {
                  "si": "date >= 01/2021",
                  "alors": 9558
                }
              ]
            },
            "plafond": "79040 €/an"
          },
          {
            "montant": {
              "variations": [
                {
                  "si": "date >= 01/2022",
                  "alors": 15066
                },
                {
                  "si": "date >= 01/2021",
                  "alors": 14580
                }
              ]
            },
            "plafond": "94850 €/an"
          },
          {
            "montant": {
              "variations": [
                {
                  "si": "date >= 01/2022",
                  "alors": 16740
                },
                {
                  "si": "date >= 01/2021",
                  "alors": 16200
                }
              ]
            },
            "plafond": "132780 €/an"
          },
          {
            "montant": {
              "variations": [
                {
                  "si": "date >= 01/2022",
                  "alors": 20925
                },
                {
                  "si": "date >= 01/2021",
                  "alors": 20250
                }
              ]
            }
          }
        ]
      }
    },
    "références": {
      "CAVEC : Les cotisations retraite, prévoyance et options": "https://www.cavec.fr/fr/vos-cotisations-12/montant-des-cotisations-retraite-tns-59/montant-des-cotisations-62"
    }
  },
  "dirigeant . indépendant . PL . CAVEC . invalidité et décès": {
    "titre": "invalidité et décès",
    "remplace": "cotisations et contributions . invalidité et décès",
    "formule": {
      "grille": {
        "assiette": "assiette des cotisations",
        "unité": "€/an",
        "tranches": [
          {
            "montant": 288,
            "plafond": "16190 €/an"
          },
          {
            "montant": 396,
            "plafond": "44790 €/an"
          },
          {
            "montant": 612,
            "plafond": "79040 €/an"
          },
          {
            "montant": 828
          }
        ]
      }
    },
    "références": {
      "CAVEC : Les cotisations retraite, prévoyance et options": "https://www.cavec.fr/fr/vos-cotisations-12/montant-des-cotisations-retraite-tns-59/montant-des-cotisations-62"
    }
  },
  "protection sociale": {
    "experimental": "oui",
    "description": "La protection sociale est composée de 5 branches principales : maladie, famille, accidents du travail et maladies professionnelles, retraite et chômage. A cela s'ajoutent aussi les cotisations pour la formation professionnelle et le transport.\n",
    "références": {
      "securite-sociale.fr": "https://www.securite-sociale.fr/accueil"
    }
  },
  "protection sociale . retraite": {
    "icônes": "👵",
    "type": "branche",
    "résumé": "Garantit en moyenne 60 à 70 % du dernier revenu d'activité après 65 ans.",
    "description": "### Un système obligatoire …\nDès lors que vous travaillez, vous et votre employeur, cotisez pour la retraite. Cette cotisation est définie à la mesure du salaire que vous percevez.\n\n###… par répartition\nLe montant total des cotisations que vous versez chaque année sert à payer les pensions des retraités pour cette même année. Le système organise ainsi un transfert direct des générations en activité vers les générations à la retraite.\n\n###… principalement contributif\nLorsque vous arrivez à la retraite, votre pension (c’est-à-dire votre « revenu » à la retraite) est calculé en fonction de vos revenus, de votre âge de départ à la retraite et du nombre d’années passées à travailler.\n\n**Notre système de retraite est également solidaire** : les chômeurs, les personnes en arrêt maladie, les personnes en situation de handicap, les travailleurs touchant de faibles revenus, les femmes en congé maternité acquièrent également des droits. Aucune personne à la retraite n’est laissée sans ressources.\n\n\nSimulez et gérez votre retraite sur [info-retraite.fr](https://www.info-retraite.fr/portail-info/home.html).\n",
    "références": {
      "Panorama des régimes de retraites": "https://travail-emploi.gouv.fr/retraite/le-systeme-de-retraite-actuel/",
      "Retraites de base et complémentaire dans le privé : quelles différences ?": "https://www.service-public.fr/particuliers/vosdroits/F12389"
    }
  },
  "protection sociale . retraite . trimestres": {
    "titre": "trimestres validés",
    "grille": {
      "assiette": "base . cotisée",
      "multiplicateur": "SMIC . horaire . début d'année",
      "tranches": [
        {
          "montant": "0 trimestres validés/an",
          "plafond": "150 heures/an"
        },
        {
          "montant": "1 trimestres validés/an",
          "plafond": "300 heures/an"
        },
        {
          "montant": "2 trimestres validés/an",
          "plafond": "450 heures/an"
        },
        {
          "montant": "3 trimestres validés/an",
          "plafond": "600 heures/an"
        },
        {
          "montant": "4 trimestres validés/an"
        }
      ]
    },
    "références": {
      "Durée d'assurance retraite du salarié du secteur privé": "https://www.service-public.fr/particuliers/vosdroits/F1761",
      "Salaire validant un trimestre": "https://www.legislation.cnav.fr/Pages/bareme.aspx?Nom=salaire_validant_un_trimestre_montant_bar",
      "Article R351-9 du code de la sécurité sociale": "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000028751530/2014-03-21"
    }
  },
  "protection sociale . retraite . base": {
    "titre": "Retraite de base maximum",
    "résumé": "Pension de retraite de base à taux plein en partant du principe que votre rémunération est restée la même pendant toute votre vie active.",
    "description": "Le montant de votre pension pour la retraite de base est calculé à partir la moyenne de vos revenus des 25 meilleures années.\n\nCet estimation de votre pension de retraite est calculée en se basant sur les principes suivants : \n- La rémunération calculée correspond à celle de vos 25 meilleures années\n- Vous avez cotisé suffisement de trimestres et vous partez à l'âge requis pour bénéficier du taux plein\n",
    "arrondi": "oui",
    "produit": {
      "assiette": "base . cotisée",
      "taux": "50%"
    }
  },
  "protection sociale . retraite . base . cotisée": {
    "titre": "revenu cotisés pour la retraite de base",
    "unité": "€/mois",
    "arrondi": "oui",
    "variations": [
      {
        "si": "dirigeant . indépendant",
        "alors": "revenu indépendant"
      },
      {
        "si": "dirigeant . auto-entrepreneur",
        "alors": "revenu auto-entrepreneur"
      },
      {
        "sinon": "revenu salarié"
      }
    ],
    "plafond": "plafond sécurité sociale",
    "avec": {
      "revenu salarié": {
        "valeur": "salarié . cotisations . vieillesse . salarié / (salarié . cotisations . vieillesse . salarié . plafonnée . taux + salarié . cotisations . vieillesse . salarié . déplafonnée . taux)",
        "références": {
          "Article R351-9 du Code de la sécurité sociale": "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000028751530/2014-03-21",
          "Salaire validant un trimestre": "https://www.legislation.cnav.fr/Pages/bareme.aspx?Nom=salaire_validant_un_trimestre_montant_bar"
        }
      },
      "revenu auto-entrepreneur": {
        "recalcul": {
          "règle": "entreprise . imposition . régime . micro-entreprise . revenu abattu",
          "avec": {
            "entreprise . imposition . régime . micro-entreprise . revenu abattu . plancher abattement": "non"
          }
        }
      },
      "revenu indépendant": {
        "valeur": "dirigeant . indépendant . cotisations et contributions . retraite de base / dirigeant . indépendant . cotisations et contributions . retraite de base . taux",
        "références": {
          "Article R351-9 du code de la sécurité sociale": "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000028751530/2014-03-21",
          "Article R634-1 du code de la sécurité sociale": "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000038787378",
          "Article R551-9 du code de la sécurité sociale": "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000028751530/",
          "Guide CNAVPL": "https://www.cnavpl.fr/wp-content/uploads/2022/03/guideweb-2022.pdf#page=26"
        },
        "note": "Rappel : la validation de trimestres s’effectue, pour les travailleurs indépendants à partir du **revenu cotisé**\n\nLe dernier alinéa de l’article R351-9  du code de la sécurité sociale, tel que rendu applicable aux travailleurs indépendants par les articles D634-1 et R634-1 du même code, moyennant adaptations, prévoit que pour la période postérieure au 31 décembre 2013, il y a lieu de retenir autant de trimestres que le revenu annuel correspondant aux retenues subies par l’assuré représente de fois le montant du salaire minimum de croissance en vigueur au 1er janvier de l'année considérée calculé sur la base de 150 heures, avec un maximum de quatre trimestres par année civile.\n\nPar retenues subies par l’assuré, le texte vise (s’agissant d’un indépendant qui n’est pas forcément à jour de ses cotisations) les cotisations du régime vieillesse de base effectivement versées par lui (et non des cotisations appelées).\n\nPar revenu annuel correspondant aux retenues subies par l’assuré (dit « revenu cotisé ») on entend le revenu reconstitué à partir des cotisations du régime vieillesse de base (« RVB ») effectivement payées par l’assuré.\n\nLe revenu cotisé correspond donc à la cotisation du régime vieillesse de base effectivement versée au titre de l’année N divisée par le taux de cotisation du régime vieillesse de base de cette année N.\n\nCotisation définitive RVB effectivement versée au titre d'une année N (+réductions ou exonérations génératrices de droits)  / taux de cotisation RVB au titre de cette année N (pour la part génératrice de droit applicable au revenu plafonné).\n\nCe revenu (dit « revenu cotisé » d’une année N) est retenu pour la validation de trimestres d’une année N.\n\nIl est comparé au seuil de 150 smic/h pour déterminer le nombre de trimestres à valider (revenu cotisé de l’année N /150 smic h)."
      }
    }
  },
  "protection sociale . retraite . complémentaire": {
    "titre": "Retraite complémentaire gagnée en 10 ans",
    "arrondi": "oui",
    "description": "Supplément de pension de retraite acquis grâce à une année complète de cotisation retraite complémentaire.\n\n> Ce montant est succeptible de varier d'ici votre retraite, en fonction de la mise à jour de la valeur du point. Néanmoins il offre un ordre de grandeur, et permet de comparer les régimes de retraite complémentaire entre eux\n",
    "unité": "€/mois",
    "somme": [
      "RCI * 10 ans",
      "AGIRC ARRCO * 10 ans"
    ]
  },
  "protection sociale . retraite . complémentaire . AGIRC ARRCO": {
    "titre": "Pension AGIRC-ARRCO",
    "applicable si": "salarié",
    "produit": {
      "assiette": "points acquis",
      "facteur": {
        "nom": "valeur du point",
        "variations": [
          {
            "si": "date >= 11/2022",
            "alors": "1.3498 €/an/point"
          },
          {
            "si": "date >= 11/2021",
            "alors": "1.2841 €/an/point"
          },
          {
            "si": "date >= 11/2019",
            "alors": "1.2714 €/an/point"
          },
          {
            "si": "date >= 01/2019",
            "alors": "1.2588 €/an/point"
          }
        ]
      }
    },
    "note": "La revalorisation de la valeur du point a lieu au 1er novembre, et non au 1er janvier.",
    "références": {
      "service-public.fr": "https://www.service-public.fr/particuliers/vosdroits/F15396",
      "agirc-arrco": "https://www.agirc-arrco.fr/ressources-documentaires/chiffres-cles/"
    },
    "avec": {
      "points acquis": {
        "note": "On se base sur une valeur constante du point, hors cette dernière change d'année en année, cette valeure est donc une grossière approximation\n",
        "valeur": "salarié . cotisations . retraite complémentaire / valeur d'acquisition",
        "références": {
          "service-public.fr": "https://www.service-public.fr/particuliers/vosdroits/F15396"
        }
      },
      "valeur d'acquisition": {
        "variations": [
          {
            "si": "date >= 01/2022",
            "alors": "17.4316 €/point"
          },
          {
            "si": "date >= 01/2021",
            "alors": "17.3982 €/point"
          },
          {
            "si": "date >= 01/2020",
            "alors": "17.3982 €/point"
          },
          {
            "si": "date >= 01/01/2019",
            "alors": "17.0571 €/point"
          }
        ],
        "références": {
          "barèmes agirc-arrco": "https://www.agirc-arrco.fr/wp-content/uploads/2021/10/Compilation_valeurs_de_point_novembre-2022.pdf"
        }
      }
    }
  },
  "protection sociale . retraite . complémentaire . RCI": {
    "acronyme": "RCI",
    "titre": "Pension retraite complémentaire des indépendants",
    "non applicable si": "dirigeant . indépendant . PL . CNAVPL",
    "produit": {
      "assiette": "points acquis",
      "facteur": {
        "nom": "valeur du point",
        "variations": [
          {
            "si": "date >= 01/2022",
            "alors": "1.221 €/an/point"
          },
          {
            "si": "date >= 01/2021",
            "alors": "1.208 €/an/point"
          },
          {
            "si": "date >= 01/2020",
            "alors": "1.203 €/an/point"
          },
          {
            "si": "date >= 01/01/2019",
            "alors": "1.191 €/an/point"
          }
        ]
      }
    },
    "références": {
      "cnav.fr": "https://www.lassuranceretraite.fr/portail-info/home/actif/travailleur-independant/calcul-retraite/retraite-complementaire.html",
      "barèmes cnav.fr": "https://www.legislation.cnav.fr/Pages/bareme.aspx?Nom=rci_valeur_point_bar"
    },
    "avec": {
      "points acquis": {
        "non applicable si": "dirigeant . indépendant . cotisations et contributions . exonérations . pension invalidité",
        "arrondi": "oui",
        "valeur": "dirigeant . indépendant . cotisations et contributions . retraite complémentaire / valeur d'acquisition",
        "références": {
          "cnav.fr": "https://www.lassuranceretraite.fr/portail-info/home/actif/travailleur-independant/calcul-retraite/retraite-complementaire.html"
        }
      },
      "valeur d'acquisition": {
        "variations": [
          {
            "si": "date >= 01/2022",
            "alors": "17.956 €/point"
          },
          {
            "si": "date >= 01/2021",
            "alors": "17.765 €/point"
          },
          {
            "si": "date >= 01/2020",
            "alors": "17.691 €/point"
          },
          {
            "si": "date >= 01/01/2019",
            "alors": "17.515 €/point"
          }
        ],
        "références": {
          "barèmes cnav.fr": "https://www.legislation.cnav.fr/Pages/bareme.aspx?Nom=rci_valeur_achat_point_bar"
        }
      },
      "revenu cotisé auto-entrepreneur": {
        "applicable si": "dirigeant . auto-entrepreneur",
        "remplace": {
          "règle": "dirigeant . indépendant . cotisations et contributions . retraite complémentaire",
          "dans": "points acquis"
        },
        "somme": [
          {
            "produit": {
              "assiette": "entreprise . chiffre d'affaires . vente restauration hébergement",
              "taux": {
                "variations": [
                  {
                    "si": "date >= 10/2022",
                    "alors": "2.03%"
                  },
                  {
                    "sinon": "2.04%"
                  }
                ]
              }
            }
          },
          {
            "produit": {
              "assiette": "entreprise . chiffre d'affaires . service BIC",
              "taux": "3.50%"
            }
          },
          {
            "produit": {
              "assiette": "entreprise . chiffre d'affaires . service BIC",
              "taux": "0%"
            }
          }
        ],
        "références": {
          "Article D613-6 du code de la sécurité sociale": "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000046714699/2022-12-10/"
        }
      }
    }
  },
  "protection sociale . retraite . CNAVPL": {
    "applicable si": "dirigeant . indépendant . PL . CNAVPL",
    "titre": "retraite de base CNAVPL",
    "remplace": "retraite . base",
    "description": "Les professions libérales affiliées à la CNAVPL ont un régime de retraite de base par point.\n\nLe nombre de points acquis chaque année est déterminé en fonction des revenus\nprofessionnels soumis à cotisations :\n\n- la cotisation maximale sur la tranche T1 permet d’acquérir 525 points (de 0 à un plafond\nannuel de la sécurité sociale),\n- la cotisation maximale sur la tranche T2 permet d’acquérir 25 points (de 0 à cinq fois le pla-\nfond annuel de la sécurité sociale).\n\nPour chaque tranche, le nombre de points attribué est calculé au prorata de la cotisation effective\nsur la cotisation maximale et arrondi à la décimale la plus proche",
    "arrondi": "oui",
    "produit": {
      "assiette": "points acquis",
      "facteur": {
        "nom": "valeur du point",
        "variations": [
          {
            "si": "date >= 01/2022",
            "alors": "0.5795 €/an/point"
          }
        ]
      }
    },
    "avec": {
      "points acquis": {
        "somme": [
          {
            "nom": "points T1",
            "produit": {
              "assiette": "525 points",
              "taux": "dirigeant . indépendant . PL . CNAVPL . retraite . tranche T1 / cotisation maximum T1"
            },
            "arrondi": "1 décimale"
          },
          {
            "nom": "points T2",
            "produit": {
              "assiette": "25 points",
              "taux": "dirigeant . indépendant . PL . CNAVPL . retraite . tranche T2 / cotisation maximum T2"
            },
            "arrondi": "1 décimale"
          },
          {
            "nom": "points incapacité",
            "applicable si": "dirigeant . indépendant . PL . CNAVPL . exonération incapacité",
            "valeur": "400 points"
          }
        ],
        "note": "Des points supplémentaires peuvent être attribués :\n- points rachetés ;\n- 100 points supplémentaires au titre du trimestre civil au cours duquel survient l’accouchement,\n- 200 points supplémentaires par année civile concernée pour l’assuré atteint d’invalidité l’obli-\ngeant à avoir recours à l’assistance d’une tierce personne ;\n- 400 points par année civile pour les personnes reconnues atteintes d’une incapacité d’exercice\nde leur profession pour une durée de plus de 6 mois",
        "références": {
          "guide juridique CNAVPL": "https://www.cnavpl.fr/statuts-et-documents-de-reference/?wpdmdl=234211#page=27"
        },
        "avec": {
          "cotisation maximum T1": {
            "privé": "oui",
            "recalcul": {
              "règle": "dirigeant . indépendant . PL . CNAVPL . retraite . tranche T1",
              "avec": {
                "dirigeant . indépendant . assiette des cotisations": "plafond sécurité sociale"
              }
            }
          },
          "cotisation maximum T2": {
            "privé": "oui",
            "recalcul": {
              "règle": "dirigeant . indépendant . PL . CNAVPL . retraite . tranche T2",
              "avec": {
                "dirigeant . indépendant . assiette des cotisations": "5 * plafond sécurité sociale"
              }
            }
          }
        }
      }
    }
  },
  "protection sociale . retraite . CNAVPL . CIPAV": null,
  "protection sociale . retraite . CNAVPL . CIPAV . complémentaire": {
    "applicable si": "dirigeant . indépendant . PL . CIPAV",
    "remplace": "retraite . complémentaire",
    "produit": {
      "assiette": "points acquis",
      "facteur": {
        "nom": "valeur du point",
        "variations": [
          {
            "si": "dirigeant . indépendant . PL . CIPAV . retraite complémentaire . classe = 'Classe A'",
            "alors": 36
          },
          {
            "si": "dirigeant . indépendant . PL . CIPAV . retraite complémentaire . classe = 'Classe B'",
            "alors": 72
          },
          {
            "si": "dirigeant . indépendant . PL . CIPAV . retraite complémentaire . classe = 'Classe C'",
            "alors": 108
          },
          {
            "si": "dirigeant . indépendant . PL . CIPAV . retraite complémentaire . classe = 'Classe D'",
            "alors": 180
          },
          {
            "si": "dirigeant . indépendant . PL . CIPAV . retraite complémentaire . classe = 'Classe E'",
            "alors": 252
          },
          {
            "si": "dirigeant . indépendant . PL . CIPAV . retraite complémentaire . classe = 'Classe F'",
            "alors": 396
          },
          {
            "si": "dirigeant . indépendant . PL . CIPAV . retraite complémentaire . classe = 'Classe G'",
            "alors": 432
          },
          {
            "si": "dirigeant . indépendant . PL . CIPAV . retraite complémentaire . classe = 'Classe H'",
            "alors": 468
          }
        ]
      }
    },
    "références": {
      "Guide CIPAV": "https://www.lacipav.fr/sites/default/files/2022-01/Guide%20pratique%202022%20-%20Professionnels%20lib%C3%A9raux%20-%20La%20Cipav_0.pdf#page=14"
    }
  },
  "protection sociale . retraite . CNAVPL . CIPAV . trimestres auto-entrepreneur": {
    "applicable si": {
      "toutes ces conditions": [
        "dirigeant . auto-entrepreneur",
        "entreprise . activité . nature . libérale . réglementée"
      ]
    },
    "titre": "trimestres validés auto-entrepreneur",
    "remplace": "retraite . trimestres",
    "grille": {
      "assiette": "entreprise . chiffre d'affaires",
      "multiplicateur": "2421 €/an",
      "tranches": [
        {
          "montant": "0 trimestres validés/an",
          "plafond": 1
        },
        {
          "montant": "1 trimestres validés/an",
          "plafond": 2
        },
        {
          "montant": "2 trimestres validés/an",
          "plafond": 3
        },
        {
          "montant": "3 trimestres validés/an",
          "plafond": 4
        },
        {
          "montant": "4 trimestres validés/an"
        }
      ]
    },
    "références": {
      "Le régime retraite de base des auto-entrepreneur": "https://www.lacipav.fr/sites/default/files/2022-01/Guide%20pratique%202022%20-%20Auto-entrepreneurs%20-%20La%20Cipav_0.pdf?page=10"
    }
  },
  "protection sociale . maladie": {
    "icônes": "🏥",
    "titre": "assurance maladie",
    "type": "branche",
    "résumé": "Couvre la plupart des soins de santé de la vie quotidienne et 100 % des maladies graves comme les séjours à l'hôpital.",
    "description": "L’Assurance Maladie protège durablement la santé de chacun dans sa vie personnelle ou professionnelle.\n\nConcrètement, elle accompagne 60 millions d’assurés tout au long de leur vie, en prenant en charge leurs soins quels que soient leurs ressources, leur situation ou leur état de santé. Elle garantit ainsi un accès universel aux droits et elle permet l’accès aux soins.\n\nGrâce à elle, vous êtes couvert sur la plupart des soins de santé. En cas de maladie grave ou de longue durée, 100 % des soins sont remboursés.\n\n## L'assurance maladie en France en quelques chiffres\n  - **92 %** des dépenses de santé remboursées en moyenne par l'assurance maladie et la complémentaire\n  - **30 000 € / an / patient** : exemple de prise en charge complète pour une personne atteinte de mucoviscidose\n  - **82,4 ans** d’espérance de vie moyenne en france (dans le top 10 mondial 🏅)\n",
    "références": {
      "À quel organisme de sécurité sociale est-on rattaché pour l'assurance maladie ?": "https://www.service-public.fr/particuliers/vosdroits/F648",
      "Ce qui est remboursé pour tout le monde": "https://www.ameli.fr/assure/remboursements/rembourse",
      "Rapport d'activité de l'assurance maladie 2017 (PDF)": "https://assurance-maladie.ameli.fr/sites/default/files/ra-2017_agir-ensemble-proteger-chacun.pdf",
      "Rapport OCDE sur l'esperance de vie dans les différents pays": "https://read.oecd-ilibrary.org/social-issues-migration-health/health-at-a-glance-europe-2018_health_glance_eur-2018-en#page89"
    }
  },
  "protection sociale . maladie . arrêt maladie": {
    "titre": null,
    "description": "Si vous êtes en arrêt de travail pour maladie, vous avez droit à des indemnités journalières (IJ) versées par votre régime d'assurance maladie (CPAM, MSA,...).\nLes conditions d'indemnisation varient en fonction de votre régime de protection sociale.",
    "somme": [
      "salarié . indemnités",
      "indépendant . indemnités"
    ],
    "avec": {
      "délai de carence": {
        "non applicable si": "arrêt maladie = 0",
        "description": "Pendant les 3 premiers jours de votre arrêt de travail, aucune indemnité journalière ne vous est versée ; c'est ce que l'on appelle le délai de carence. Il s'applique au début de chaque arrêt de travail.\n",
        "valeur": "3 jour",
        "références": {
          "Délai de carence pour les salarié": "https://www.service-public.fr/particuliers/vosdroits/F3053#fiche-item-aria-3",
          "Délai de carence pour les indépendants": "https://www.ameli.fr/assure/remboursements/indemnites-journalieres/arret-maladie-artisans-commercants#text_124978"
        }
      },
      "délai d'attente": {
        "non applicable si": "arrêt maladie = 0"
      }
    }
  },
  "protection sociale . maladie . arrêt maladie . salarié": {
    "références": {
      "Arrêt de travail pour maladie : les indemnités journalières du salarié": "https://www.ameli.fr/assure/remboursements/indemnites-journalieres/arret-maladie-salarie",
      "Arrêt maladie : indemnités journalières versées au salarié": "https://www.service-public.fr/particuliers/vosdroits/F3053"
    },
    "non applicable si": {
      "une de ces conditions": [
        "dirigeant . indépendant",
        "dirigeant . auto-entrepreneur"
      ]
    },
    "avec": {
      "conditions": {
        "avec": {
          "revenu": {
            "valeur": "salarié . cotisations . assiette * 6 mois > plancher"
          },
          "délai d'attente": {
            "description": "Pour pouvoir prétendre à une indemnisation pour maladie au titre de votre activité professionnelle, vous devez justifier d’un délai d’affiliation continus dans cette activité. Ce dernier dépend de votre rémunération des mois précédents.\n",
            "remplace": "arrêt maladie . délai d'attente",
            "applicable si": "conditions . revenu",
            "valeur": "(plancher / salarié . cotisations . assiette) + 0.5",
            "arrondi": "oui"
          },
          "[privé] plancher": "1015 heure * SMIC . horaire"
        },
        "références": {
          "Quels sont les critères pour être indemnisé en cas de maladie ?": "https://www.ameli.fr/tarn/assure/remboursements/indemnites-journalieres/arret-maladie-salarie#text_2632"
        }
      },
      "indemnités": {
        "applicable si": "conditions . revenu",
        "unité": "€/jour",
        "description": "L'indemnité journalière que vous recevrez pendant votre arrêt de travail est égale à 50 % de votre salaire journalier de base. Celui-ci est calculé sur la moyenne des salaires bruts des 3 derniers mois précédant votre arrêt de travail (12 mois en cas d'activité saisonnière).\n",
        "produit": {
          "assiette": {
            "valeur": "salarié . cotisations . assiette / 91.25 jour/trimestre",
            "plafond": "1.8 * SMIC"
          },
          "taux": "50%"
        },
        "notes": "- Vu que le simulateur ne permet pas encore la conversion de période vers le jour, on multiplie le salaire moyen par 3 pour avoir le salaire trimestriel, puis on le divise par 91.25, conformément à la fiche service-public.fr\n- Pour les salarié, votre entreprise est peut-être soumise à une convention collective de branche professionnelle qui assure le maintien de votre salaire intégral ou partiel pendant votre arrêt de travail pour maladie. Elle peut aussi avoir conclu un accord interne à l’entreprise qui prévoit ce maintien, appelé subrogation. Renseignez-vous auprès du service qui gère la paye dans votre entreprise.\n"
      }
    }
  },
  "protection sociale . maladie . arrêt maladie . indépendant": {
    "applicable si": {
      "une de ces conditions": [
        "dirigeant . indépendant",
        "dirigeant . auto-entrepreneur"
      ]
    },
    "avec": {
      "conditions": {
        "description": "En cas de revenu d’activité indépendante faible, le montant de l’indemnité journalière (IJ) perçu par le travailleur indépendant peut être nul. De même en début d'activité, il faut attendre un certain nombre de mois avant de pouvoir bénéficier d'indemnités.\nDepuis le 1er janvier 2022, il est donc possible de percevoir des indemnités journalières pour maladie et/ou pour maternité au titre de son ancienne activité (quel que soit le régime auquel on était affilié).",
        "référence": {
          "Comment bénéficier d'indemnités liées à son ancien régime": "https://www.ameli.fr/tarn/assure/actualites/indemnites-maladie-et-maternite-du-nouveau-pour-certains-travailleurs-independants"
        },
        "avec": {
          "revenu": "raam > 10% * plafond sécurité sociale",
          "délai d'attente": {
            "description": "Pour pouvoir prétendre à une indemnisation pour maladie au titre de votre activité professionnelle, vous devez justifier d’un délai d’affiliation continus dans cette activité.\n\n> **À noter** : si les droits ne sont pas réunis, votre arrêt de travail peut, sous certaines conditions, être indemnisable au titre du maintien de droits de votre activité précédente. Renseignez-vous auprès de votre caisse primaire d'assurance maladie (CPAM).\n",
            "valeur": "12 mois",
            "remplace": "arrêt maladie . délai d'attente",
            "références": {
              "Artisan/commerçant : quels sont les critères pour être indemnisé en cas de maladie ?": "https://www.ameli.fr/assure/remboursements/indemnites-journalieres/arret-maladie-artisans-commercants#text_124972#text_124921",
              "Profession libérale : quels sont les critères pour être indemnisé en cas de maladie ?": "https://www.ameli.fr/assure/remboursements/indemnites-journalieres/arret-maladie-profession-liberale#text_170646"
            }
          }
        }
      },
      "indemnités": {
        "applicable si": "conditions . revenu",
        "description": "L'indemnité journalière que vous recevrez pendant votre arrêt de travail est égale à 1/730e de votre revenu d’activité annuel moyen (Raam) (1). Celui-ci est calculé sur la moyenne de vos revenus cotisés des 3 années civiles précédant la date de votre arrêt de travail.\n",
        "unité": "€/jour",
        "produit": {
          "assiette": "raam",
          "facteur": "1 an / 730 jour"
        }
      },
      "[privé] raam": {
        "titre": "Revenu d’activité annuel moyen",
        "valeur": {
          "variations": [
            {
              "si": "dirigeant . indépendant",
              "alors": "dirigeant . indépendant . cotisations et contributions . indemnités journalières maladie . assiette"
            },
            {
              "si": "dirigeant . auto-entrepreneur",
              "alors": "dirigeant . auto-entrepreneur . impôt . revenu imposable"
            }
          ]
        },
        "plafond": {
          "variations": [
            {
              "si": "entreprise . activité . nature . libérale . réglementée",
              "alors": "3 * plafond sécurité sociale"
            },
            {
              "sinon": "plafond sécurité sociale"
            }
          ]
        }
      }
    },
    "références": {
      "Quelles indemnités journalières pour les artisans/commerçants": "https://www.ameli.fr/assure/remboursements/indemnites-journalieres/arret-maladie-artisans-commercants#text_124972",
      "Quelles indemnités journalières pour les professions libérales": "https://www.ameli.fr/assure/remboursements/indemnites-journalieres/arret-maladie-profession-liberale#text_170670"
    }
  },
  "protection sociale . maladie . ATMP": {
    "titre": "Accident du travail et maladie professionnelle"
  },
  "protection sociale . invalidité et décès": {
    "icônes": "🦽",
    "type": "branche",
    "résumé": "Garantit le versement d'une pension en cas d'invalidité et un capital à vos proches en cas de décès.",
    "description": "Vous pouvez être reconnu invalide si votre capacité de travail et de gain est réduite d'au moins 2/3 à la suite d'un accident ou d'une maladie d'origine non professionnelle. Vous pouvez obtenir le versement d'une pension d'invalidité afin de compenser la perte de revenus.\n\nLe capital décès est une indemnité qui garantit le versement d'un capital aux ayants droit d'un travailleur décédé, sous certaines conditions. Son montant est forfaitaire.\n",
    "références": {
      "capital décès (amelie.fr)": "https://www.ameli.fr/assure/remboursements/pensions-allocations-rentes/deces-proche-capital-deces",
      "capital décès (salarié privé)": "https://www.service-public.fr/particuliers/vosdroits/F3005",
      "pension invalidité": "https://www.service-public.fr/particuliers/vosdroits/F672"
    }
  },
  "protection sociale . assurance chômage": {
    "icônes": "💸",
    "type": "assurance",
    "résumé": "Assure un revenu aux travailleurs à la recherche d'un nouvel emploi.",
    "description": "Depuis 1958, l’Assurance chômage protège tous les salariés du privé et certains du secteur public lorsqu’ils perdent leur emploi. Elle leur verse une allocation et favorise leur retour à l’emploi grâce à des aides.\nFonctionnant comme une assurance,  elle indemnise ceux qui ont cotisé, en fonction de leur ancien salaire. Mais elle est aussi solidaire, puisqu’elle mutualise les risques et compense mieux la perte d’un bas salaire que d’un haut revenu.\nGrâce à elle, tous ceux qui perdent leur emploi de façon involontaire peuvent toucher un revenu sous forme d’allocation à condition d’avoir cotisé suffisamment.\n## L'assurance chômage en France en quelques chiffres\n  - **72 %** de l'ancien salaire net : pourcentage de l'allocation chômage en moyenne\n  - **2,7 millions** de chômeurs indemnisés chaque mois\n  - **1 020 €** : montant de l'allocation nette moyenne par mois\n  - **51 %** des allocataires cumulent allocation et salaire\n",
    "références": {
      "Pôle-emploi": "https://www.pole-emploi.fr/accueil",
      "Unédic": "https://www.unedic.org/a-propos/quest-ce-que-lassurance-chomage"
    }
  },
  "protection sociale . famille": {
    "icônes": "👶",
    "type": "branche",
    "résumé": "Assure des prestations en soutien aux familles : garde d'enfants, aide au logement...\n",
    "description": "Créée en 1945, la branche Famille est l’un des principaux acteurs de la politique familiale française. Actuellement, elle a deux missions prioritaires :\n  - Aider les familles dans leur vie quotidienne, faciliter, en particulier, la conciliation entre vie familiale et vie professionnelle\n  - Développer la solidarité envers les plus vulnérables, dont les personnes handicapées\n\nPour remplir ces missions, elle s’appuie sur deux leviers :\n  - Le versement de prestations financières aux familles (prestations familiales et sociales, aides au logement et minima sociaux comme l’aide aux adultes handicapés et le revenu de solidarité active)\n  - L’accompagnement des familles et la mise en place ou le cofinancement de différents\n  services et équipements collectifs qui leur sont destinés (comme les crèches)\n",
    "références": {
      "Quelles sont les missions de la branche Famille ?": "https://www.caf.fr/nous-connaitre/nos-missions",
      "Allocations destinées aux familles": "https://www.service-public.fr/particuliers/vosdroits/N156",
      "Tout savoir sur les Allocations familiales": "https://www.caf.fr/nous-connaitre/qui-sommes-nous"
    }
  },
  "protection sociale . accidents du travail et maladies professionnelles": {
    "icônes": "☣️",
    "résumé": "Offre une couverture complète des maladies ou accidents du travail.",
    "description": "L’assurance AT/MP (accident du travail et maladie professionnelle) est la plus ancienne branche de la Sécurité sociale : elle relève de principes qui remontent à l’année 1898 et qui ont été repris dans la loi du 31 décembre 1946.\n\n[🎞️ Voir la vidéo](https://www.youtube.com/watch?v=NaGI_deZJD8 )\n\nLa cotisation AT/MP couvre les risques accidents du travail, accidents de trajet et maladies professionnelles pour les salariés relevant du régime général.\n\nPour connaître les risques professionnels et mettre en place des actions de prévention, le [compte AT/MP](https://www.ameli.fr/entreprise/votre-entreprise/compte-atmp/ouvrir-compte-atmp) est un service ouvert à toutes les entreprises du régime général de la Sécurité sociale.\n\nEn cas d’AT/MP, les soins médicaux et chirurgicaux sont remboursés intégralement dans la limite des tarifs de la Sécurité sociale.\n",
    "unité": "€/jour",
    "applicable si": "salarié",
    "produit": {
      "assiette": {
        "valeur": 5,
        "plafond": "83.4% * plafond sécurité sociale"
      },
      "taux": {
        "nom": "Pourcentage du salaire journalier de référence",
        "valeur": "60%"
      }
    },
    "note": "Le taux est de 80% à partir du 29e jour d'arrêt.\n",
    "références": {
      "ameli.fr": "https://www.ameli.fr/entreprise/votre-entreprise/cotisation-atmp",
      "service-public.fr (AT)": "https://www.service-public.fr/particuliers/vosdroits/F31881",
      "service-public.fr (MP)": "https://www.service-public.fr/particuliers/vosdroits/F31880",
      "Calcul de l'indemnité": "https://www.service-public.fr/particuliers/vosdroits/F32148",
      "Code de la Sécurité Sociale": "https://www.legifrance.gouv.fr/codes/id/LEGISCTA000006156659/2020-12-10/"
    }
  },
  "protection sociale . formation": {
    "icônes": "👩‍🎓",
    "résumé": "Finance la possibilité de suivre des formations professionnelles.",
    "description": "La formation professionnelle permet à chaque personne, indépendamment de son statut, d’acquérir et d’actualiser ses connaissances et ses compétences, d’accroître son niveau de qualification et de favoriser son évolution professionnelle.\n\nPour avoir un compte-rendu personnalisé de vos droits à la formation, rendez-vous sur [www.moncompteactivite.gouv.fr](https://www.moncompteactivite.gouv.fr).\n"
  },
  "protection sociale . autres": {
    "icônes": "🔧",
    "résumé": "Autres contributions au système social.",
    "description": "Toutes les contributions transverses au système social.\n\nOn y retrouve par exemple la CRDS (contribution pour le remboursement de la dette sociale) qui est un impôt destiné à résorber l'endettement de la Sécurité sociale, et ainsi assurer la viabilité de la protection sociale pour vos enfants et petits enfants.\n"
  },
  "protection sociale . transport": {
    "icônes": "🚌",
    "résumé": "Permet de maintenir le prix d'un billet de transport en commun à un bas prix",
    "description": "Cette contribution est reversée intégralement à l'[autorité organisatrice de la mobilité](https://fr.wikipedia.org/wiki/Autorit%C3%A9_organisatrice_de_la_mobilit%C3%A9) de la zone ou est implantée l'entreprise. Celle-ci peut ensuite l'utiliser pour subventionner les transports en commun existants ou pour développer de nouvelles infrastructures de transport (tramway, métro, bus...).\n\n## Le versement mobilité en quelques chiffres\n- **45% de réduction** sur le coût des transports en communs dans les 12 plus grandes agglomérations de France.\n- **263 € / an / habitant** de gain de pouvoir d'achat pour les habitants d'Île-de-France\n",
    "références": {
      "wikipedia": "https://fr.wikipedia.org/wiki/Versement_transport"
    }
  },
  "date": "01/11/2022",
  "période": "oui",
  "période . jours ouvrés moyen par mois": {
    "formule": "21 jour ouvré/mois",
    "note": "On retient 21 comme nombre de jours ouvrés moyen par mois"
  },
  "période . semaines par mois": {
    "unité": "semaine/mois",
    "formule": "52 semaine/an / 12 mois/an"
  },
  "période . début d'année": {
    "variations": [
      {
        "si": "date >= 01/2022",
        "alors": "01/01/2022"
      },
      {
        "si": "date >= 01/2021",
        "alors": "01/01/2021"
      }
    ]
  },
  "période . fin d'année": {
    "variations": [
      {
        "si": "date <= 31/12/2021",
        "alors": "31/12/2021"
      },
      {
        "si": "date <= 31/12/2022",
        "alors": "31/12/2022"
      }
    ]
  },
  "salarié . rémunération . revenus de remplacement": {
    "experimental": "oui",
    "description": "Les revenus de remplacement sont les revenus perçus en remplacement de la rémunération du travail : allocations de chômage ou de chômage partiel, indemnités maladie ou accident du travail, pension de retraite, revenu d'intégration sociale, etc.\nCes revenus sont imposables mais sont exonérés de cotisations sociales. Ils sont soumis à la CSG/CRDS avec un taux spécifique.",
    "somme": [
      "activité partielle . indemnités"
    ],
    "note": "L'indemnité complémentaire n'est pas ajoutée ici car elle est systématiquement exonérée de CSG du fait de l'écrêtement pour les bas revenus.\nL'ajouter abouti à un calcul cyclique (vu qu'elle dépend du montant de la CSG)",
    "avec": {
      "net": {
        "valeur": "revenus de remplacement",
        "abattement": {
          "somme": [
            "cotisation maladie",
            "salarié . cotisations . CSG-CRDS . revenus de remplacement"
          ]
        }
      },
      "cotisation maladie": {
        "produit": {
          "assiette": "revenus de remplacement",
          "taux": {
            "variations": [
              {
                "si": "établissement . commune . département . outre-mer . Mayotte",
                "alors": "2.35%"
              },
              {
                "si": "régimes spécifiques . alsace moselle",
                "alors": "1.5%"
              },
              {
                "sinon": "0%"
              }
            ]
          }
        }
      }
    }
  },
  "salarié . activité partielle": {
    "experimental": "oui",
    "description": "À la suite de la crise du Coronavirus, le gouvernement a mis en place un dispositif de chômage partiel étendu dans lequel l'État prend en charge l'indemnisation des heures chômées jusqu’à 4,5 SMIC.\nLa déclaration d'activité partielle est simplifiée et l'effet est rétroactif.",
    "par défaut": "non",
    "rend non applicable": [
      "temps de travail . heures supplémentaires",
      "temps de travail . heures complémentaires"
    ],
    "références": {
      "déclaration employeur": "https://activitepartielle.emploi.gouv.fr/aparts/",
      "service-public.fr": "https://www.service-public.fr/professionnels-entreprises/vosdroits/F23503",
      "economie.gouv.fr": "https://www.economie.gouv.fr/entreprises/activite-partielle",
      "urssaf.fr": "https://www.urssaf.fr/portail/home/employeur/reduire-ou-cesser-lactivite/la-reduction-ou-la-cessation-tem/lactivite-partielle-dispositif-d.html"
    }
  },
  "salarié . activité partielle . rémunération mensuelle minimale": {
    "acronyme": "RMM",
    "description": "Les salariés à temps plein dont l’horaire de travail est réduit ont droit à une rémunération mensuelle minimale qui peut donner lieu à un versement complémentaire de l’employeur.",
    "références": {
      "Article L3232-3 du code du travail": "https://www.legifrance.gouv.fr/affichCodeArticle.do?idArticle=LEGIARTI000006902847&cidTexte=LEGITEXT000006072050&dateTexte=20080501"
    },
    "formule": {
      "recalcul": {
        "règle": "salarié . rémunération . net . sans revenus de remplacement",
        "avec": {
          "contrat . salaire brut": "contrat . temps de travail . SMIC",
          "activité partielle": "non",
          "temps de travail . heures supplémentaires": "non",
          "temps de travail . heures complémentaires": "non"
        }
      }
    }
  },
  "salarié . activité partielle . heures chômées": {
    "unité": "heures/mois",
    "formule": {
      "valeur": "contrat . temps de travail - heures travaillées",
      "plancher": 0
    }
  },
  "salarié . activité partielle . heures travaillées": {
    "titre": "heures travaillées restantes",
    "question": "Quel est le nombre d'heures travaillées sur le mois ?",
    "description": "Dans le cadre du chômage partiel, le nombre d'heure restantes travaillées. Doit être inférieur au temps contractuel.",
    "par défaut": "0 heures/mois",
    "suggestions": {
      "30 h/semaine": "130 heures/mois",
      "20 h/semaine": "86.6666 heures/mois",
      "10 h/semaine": "43.3333 heures/mois"
    }
  },
  "salarié . activité partielle . heures travaillées . contrôle temps de travail": {
    "type": "notification",
    "sévérité": "avertissement",
    "formule": "heures travaillées > contrat . temps de travail",
    "description": "Dans le cadre de l'activité partielle, le temps de travail doit être inférieur à celui inscrit dans le contrat de travail."
  },
  "salarié . activité partielle . indemnités": {
    "description": "La mise en chômage partiel ouvre droit non au paiement d’un salaire mais à l’allocation spécifique. Pour chaque heure chômée indemnisable, le salarié reçoit de l'entreprise une indemnité. L'entreprise obtient en contrepartie de l’Etat une allocation d’activité partielle.\nSi après versement de l’indemnité d’activité partielle la rémunération du salarié est inférieure à la rémunération mensuelle minimale (RMM garantie par les articles L3232-1 et suivants du code du travail pour les salariés à temps plein), l'employeur doit  lui verser une allocation complémentaire qui est égale à la différence entre la rémunération mensuelle minimale (ou Smic net) et la somme initialement perçue par le salarié.",
    "formule": {
      "somme": [
        "base",
        "complémentaire"
      ]
    },
    "références": {
      "urssaf.fr": "https://www.urssaf.fr/portail/home/employeur/reduire-ou-cesser-lactivite/la-reduction-ou-la-cessation-tem/lactivite-partielle-dispositif-d.html"
    }
  },
  "salarié . activité partielle . indemnités . base": {
    "multiplication": {
      "assiette": "retrait absence",
      "taux": {
        "valeur": {
          "variations": [
            {
              "si": "secteur d'activité restreint",
              "alors": "70%"
            },
            {
              "sinon": "60%"
            }
          ]
        },
        "nom": "taux"
      }
    }
  },
  "salarié . activité partielle . indemnités . complémentaire": {
    "description": "L'indemnité complémentaire de chômage partielle est une indemnité versée par l'entreprise pour les salaires proches du SMIC permettant de s'assurer que rémunération effectivement perçue ne soit jamais inférieure à celle du SMIC net.",
    "non applicable si": "contrat . salaire brut > 3.15 * contrat . temps de travail . SMIC",
    "formule": {
      "valeur": "rémunération mensuelle minimale",
      "abattement": {
        "somme": [
          "rémunération . net . sans revenus de remplacement",
          "indemnités . base"
        ]
      }
    }
  },
  "salarié . activité partielle . retrait absence": {
    "multiplication": {
      "assiette": "rémunération . taux horaire",
      "facteur": "heures chômées"
    }
  },
  "salarié . activité partielle . indemnisation entreprise": {
    "titre": "Remboursement de l'indemnité",
    "description": "Dans le cadre de la crise du Coronavirus, le gouvernement a annoncé que l'indemnité de chômage partiel pour les commerces fermés sera prise à 100% en charge par l'état.",
    "formule": {
      "multiplication": {
        "assiette": "retrait absence",
        "taux": "taux d'indemnisation"
      },
      "plancher": {
        "variations": [
          {
            "si": "date >= 01/2022",
            "alors": "8.37 €/heures * heures chômées"
          },
          {
            "si": "date >= 01/10/2021",
            "alors": "8.30 €/heures * heures chômées"
          },
          {
            "si": "date >= 01/2021",
            "alors": "8.11 €/heures * heures chômées"
          }
        ]
      },
      "plafond": {
        "recalcul": {
          "avec": {
            "contrat . salaire brut": "4.5 * contrat . temps de travail . SMIC"
          }
        }
      }
    },
    "références": {
      "Décret mise à jour 2022": "https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000044614377"
    }
  },
  "salarié . activité partielle . indemnisation entreprise . taux d'indemnisation": {
    "titre": "taux d'allocation",
    "description": "Pendant la période de baisse d’activité, l’employeur reçoit de l’Agence de services et de paiement (ASP) une allocation équivalente à une part de la rémunération horaire du salarié placé en activité partielle, dans un délai moyen de 12 jours. Le salarié reçoit quant à lui, de son employeur, une indemnité d’activité partielle, en lieu et place de son salaire pour la période durant laquelle il est placé en activité partielle.",
    "formule": {
      "variations": [
        {
          "si": "secteur d'activité restreint",
          "alors": "70%"
        },
        {
          "sinon": "36%"
        }
      ]
    }
  },
  "salarié . activité partielle . secteur d'activité restreint": {
    "question": "Le secteur d'activité de l'entreprise fait-il l'objet de restrictions réglementaires ? (ex. : tourisme, restauration, culture, événementiel)",
    "description": "Les entreprises dont l'activité a été interrompue par décision administrative en raison de la crise sanitaire, ou qui sont situées dans une circonscription territoriale soumise à des restrictions spécifiques des conditions d'exercice de l'activité économique et de circulation des personnes prises par l'autorité administrative lorsqu'ils subissent une forte baisse de chiffre d'affaires, ou qui relèvent des secteurs les plus affectés et qui continuent de subir une très forte baisse du chiffre d'affaires, bénéficient d'un taux d'allocation de 70 % jusqu'au 31 octobre 2021.\n\nSont concernées :\n\n  - les entreprises relevant des secteurs, listés en annexe 2 du décret du 29 juin 2020 , qui ont subi une très forte baisse de chiffre d'affaires d'au moins 80 % durant la période comprise entre le 15 mars et le 15 mai 2020 ;\n\n  - les établissement recevant du public fermés administrativement ou situés dans un territoire soumis à des restrictions particulières (couvre-feu par exemple) et subissant une baisse de chiffre d'affaires d'au moins 60 % ;\n\n  - les établissements situés dans une zone de chalandise d'une station de ski et subissant une baisse de chiffre d'affaires d'au moins 50 % si les téléphériques et remontées mécaniques sont fermés.",
    "références": {
      "Liste des secteurs concernés": "https://travail-emploi.gouv.fr/actualites/presse/communiques-de-presse/article/prise-en-charge-a-100-de-l-activite-partielle-par-l-etat-pour-les-entreprises",
      "Actualité service-public.fr": "https://www.service-public.fr/particuliers/actualites/A15140"
    },
    "par défaut": "non"
  },
  "salarié . activité partielle . net habituel": {
    "recalcul": {
      "règle": "salarié . rémunération . net . à payer avant impôt",
      "avec": {
        "activité partielle": "non"
      }
    }
  },
  "salarié . activité partielle . total employeur habituel": {
    "recalcul": {
      "règle": "salarié . coût total employeur",
      "avec": {
        "activité partielle": "non"
      }
    }
  },
  "salarié . coût total employeur . aides": {
    "résumé": "Pour l'employeur, différées dans le temps",
    "description": "Ces aides sont appelées différées, car elles ne consistent pas en une simple réduction des cotisations mensuelles : elles interviendront a posteriori par exemple sous la forme d’un crédit d'impôt.\n\nLe simulateur n'intègre pas toutes les innombrables aides disponibles en France. Découvrez-les sur le [portail officiel](http://www.aides-entreprises.fr).\n",
    "formule": {
      "somme": [
        "embauche",
        "emploi franc",
        "activité partielle . indemnisation entreprise"
      ]
    }
  },
  "salarié . coût total employeur . aides . embauche": {
    "titre": "aides à l'embauche",
    "description": "L'État met en place des aides pour encourager l'embauche de certains publics prioritaires. Ces aides sont non cumulables entre elles.\n",
    "le maximum de": [
      "apprentis",
      "senior professionnalisation",
      "emploi franc"
    ]
  },
  "salarié . coût total employeur . aides . embauche . apprentis": {
    "description": "Depuis 2019 une aide à l'embauche unique remplace quatre précédents dispositifs. Le montant de l'aide dépend de l'ancienneté du contrat.\n\nUne fois les démarches d'enregistrement effectuées, l'aide est versée automatiquement tous les mois.\n",
    "applicable si": {
      "toutes ces conditions": [
        "entreprise . salariés . effectif < 250",
        "contrat . apprentissage",
        "contrat . apprentissage . diplôme préparé . niveau bac ou moins"
      ]
    },
    "formule": {
      "variations": [
        {
          "si": "contrat . apprentissage . ancienneté = 'moins d'un an'",
          "alors": "4125 €/an"
        },
        {
          "si": "contrat . apprentissage . ancienneté = 'moins de deux ans'",
          "alors": "2000 €/an"
        },
        {
          "sinon": "1200 €/an"
        }
      ]
    },
    "références": {
      "Fiche service-public.fr": "https://www.service-public.fr/professionnels-entreprises/vosdroits/F23556"
    }
  },
  "salarié . coût total employeur . aides . embauche . senior professionnalisation": {
    "description": "Les employeurs peuvent obtenir une aide de 2000 € pour l'embauche d'un\ndemandeur d'emploi de plus de 45 ans en contrat de professionnalisation.\n",
    "applicable si": "contrat . professionnalisation . salarié de 45 ans et plus",
    "produit": {
      "assiette": "2000 €/an",
      "facteur": "temps de travail . effectif . quotité"
    },
    "arrondi": "oui",
    "références": {
      "Ministère du travail": "https://travail-emploi.gouv.fr/emploi/mesures-seniors/article/l-aide-a-l-embauche-d-un-demandeur-d-emploi-de-45-ans-et-plus-en-contrat-de",
      "Pôle Emploi": "https://www.pole-emploi.fr/employeur/aides-aux-recrutements/les-aides-a-lembauche/embauche-de-de-de-45-ans-et-plus.html"
    }
  },
  "salarié . coût total employeur . aides . emploi franc": {
    "description": "Aide différée versée par Pôle emploi pour l'embauche d'un demandeur d'emploi\ninscrit à Pôle Emploi et résidant dans un quartier prioritaire de la ville\n(QPV).\n\n- *embauche en CDI* : 5000€/an pendant 3 ans, soit un total de 15 000€\n- *embauche en CDD d'au moins 6 mois* : 2 500€/an pendant 2 ans, soit 5 000€ au maximum\n\n[🗺 Vérifier l'éligibilité d'une adresse](https://sig.ville.gouv.fr/recherche-adresses-qp-polville)\n",
    "applicable si": "éligible",
    "formule": {
      "multiplication": {
        "assiette": {
          "variations": [
            {
              "si": "contrat . CDD",
              "alors": "2500 €/an"
            },
            {
              "sinon": "5000 €/an"
            }
          ]
        },
        "facteur": "temps de travail . effectif . quotité"
      },
      "arrondi": "oui"
    },
    "références": {
      "Fiche emploi franc": "https://travail-emploi.gouv.fr/emploi/emplois-francs/article/embaucher-une-personne-en-emploi-franc"
    }
  },
  "salarié . coût total employeur . aides . emploi franc . éligible": {
    "applicable si": {
      "une de ces conditions": [
        "contrat . CDI",
        {
          "toutes ces conditions": [
            "contrat . CDD",
            "contrat . CDD . durée >= 6"
          ]
        }
      ]
    },
    "question": "Cette embauche est-elle éligible à l'aide emploi-franc ?",
    "description": "Conditions :\n- Le salarié recruté est un demandeur d'emploi inscrit à Pôle Emploi et réside dans un quartier prioritaire de la ville (QPV) [vérifier l'éligibilité d'un quartier](https://sig.ville.gouv.fr/recherche-adresses-qp-polville)\n- L'employeur est à jour de ses cotisations et n'a pas procédé à un licenciement économique pour le poste pourvu dans les 6 mois précédents le recrutement\n- Le salarié recruté ne doit pas avoir appartenu à l'effectif de l'entreprise dans les 6 mois précédent l'embauche\n",
    "par défaut": "non"
  },
  "salarié . contrat": {
    "icônes": "📄",
    "question": "De quel type de contrat s'agit-il ?",
    "une possibilité": {
      "choix obligatoire": "oui",
      "possibilités": [
        "CDI",
        "CDD",
        "apprentissage",
        "professionnalisation",
        "stage"
      ]
    },
    "par défaut": "'CDI'",
    "description": "Le contrat qui lie une entreprise (via son établissement) à un individu, qui est alors son salarié.\n",
    "références": {
      "Code du travail numérique": "https://code.travail.gouv.fr/fiche-ministere-travail/contrat-de-travail-les-principales-caracteristiques"
    },
    "avec": {
      "CDI": {
        "valeur": "contrat = 'CDI'",
        "titre": "CDI"
      },
      "CDD": {
        "titre": "CDD",
        "valeur": "contrat = 'CDD'",
        "description": "Par défaut, faire travailler quelqu'un en France établit automatiquement un CDI à temps plein.\nCertaines situations exceptionnelles permettent aux employeurs de prévoir une date de fin. Le contrat, qui est alors nécessaire, mentionne cette date de fin.\n",
        "références": {
          "Code du travail numérique": "https://code.travail.gouv.fr/fiche-ministere-travail/le-contrat-a-duree-determinee-cdd"
        },
        "avec": {
          "information": {
            "type": "notification",
            "valeur": "oui",
            "description": "Rappelez-vous qu'un CDD doit toujours correspondre à un besoin temporaire de l'entreprise. [Code du travail - Article L1242-1](https://www.legifrance.gouv.fr/affichCodeArticle.do?idArticle=LEGIARTI000006901194&cidTexte=LEGITEXT000006072050)"
          }
        }
      },
      "apprentissage": {
        "titre": "apprentissage",
        "valeur": "contrat = 'apprentissage'",
        "description": "Le contrat d'apprentissage est un contrat de travail écrit à durée limitée (CDD) ou à durée indéterminée (CDI) entre un salarié et un employeur. Il permet à l'apprenti de suivre une formation en alternance en entreprise sous la responsabilité d'un maître d'apprentissage et en centre de formation des apprentis (CFA) pendant 1 à 3 ans.\n",
        "rend non applicable": [
          "statut cadre",
          "cotisations . CSG-CRDS",
          "cotisations . exonérations . JEI",
          "régimes spécifiques . impatriés",
          "temps de travail . temps partiel"
        ]
      },
      "professionnalisation": {
        "titre": "professionnalisation",
        "valeur": "contrat = 'professionnalisation'",
        "description": "Le contrat de professionnalisation est un contrat de travail en alternance\nréservé à un public prioritaire : jeunes de 16 à 25 ans dans le cadre de\nleur formation initiale, demandeurs d'emplois, bénéficiaires du RSA, ASS ou\nAAH, et les personnes ayant bénéficié d'un contrat unique d'insertion.\n\nIl peut prendre la forme d'un contrat à durée déterminée (CDD) ou\nindéterminée (CDI), la période de professionnalisation proprement-dite\ndevant durer entre 6 et 12 mois. Dans certains cas cette période peut être\nprolongée jusqu'à 36 mois.\n",
        "rend non applicable": "rémunération . assiette de vérification du SMIC . contrôle",
        "références": {
          "Contrat de professionnalisation": "https://www.service-public.fr/particuliers/vosdroits/F15478"
        }
      },
      "stage": {
        "titre": "stage",
        "description": "Un employeur qui accueille un stagiaire doit lui verser une gratification minimale. Celle-ci est en partie exonérée de cotisations sociales.\n",
        "valeur": "contrat = 'stage'",
        "rend non applicable": [
          "cotisations . exonérations",
          "cotisations . allocations familiales . taux réduit",
          "cotisations . maladie . employeur . taux réduit",
          "cotisations . retraite complémentaire",
          "cotisations . CEG",
          "cotisations . chômage",
          "cotisations . AGS",
          "cotisations . prévoyances . santé",
          "cotisations . contribution au dialogue social",
          "temps de travail . temps partiel",
          "temps de travail . heures supplémentaires",
          "activité partielle",
          "statut cadre",
          "régimes spécifiques . DFS",
          "régimes spécifiques . impatriés",
          "rémunération . assiette de vérification du SMIC . contrôle"
        ],
        "avec": {
          "avertissement": {
            "type": "notification",
            "sévérité": "avertissement",
            "valeur": "oui",
            "description": "Une convention de stage **n'est pas un contrat de travail**, et ne peut pas être conclue pour réaliser une tâche régulière correspondant à un poste de travail permanent, ou à un accroissement temporaire de l'activité de l'entreprise. [Code de l'éducation - Article L124-7](https://www.legifrance.gouv.fr/affichCodeArticle.do?idArticle=LEGIARTI000029234119&cidTexte=LEGITEXT000006071191)\nPar ailleurs, une entreprise de moins de 20 salariés ne peut pas accueillir plus de **3&nbsp;stagiaires**, et pas plus de **15% de l’effectif** pour les entreprises de plus de 20 salariés."
          },
          "contrôle gratification minimale": {
            "type": "notification",
            "sévérité": "avertissement",
            "valeur": "contrat . salaire brut < gratification minimale",
            "description": "La rémunération du stage est inférieure à la [gratification minimale](https://www.service-public.fr/professionnels-entreprises/vosdroits/F32131)."
          },
          "gratification minimale": {
            "valeur": "15% * plafond sécurité sociale",
            "Gratification minimale": "https://www.service-public.fr/professionnels-entreprises/vosdroits/F32131"
          }
        }
      }
    }
  },
  "salarié . contrat . apprentissage . diplôme préparé": {
    "question": "Quel type de diplôme l'apprenti prépare-t-il ?",
    "formule": {
      "une possibilité": {
        "choix obligatoire": "oui",
        "possibilités": [
          "niveau bac ou moins",
          "niveau supérieur au bac"
        ]
      }
    },
    "par défaut": "'niveau supérieur au bac'"
  },
  "salarié . contrat . apprentissage . diplôme préparé . niveau bac ou moins": {
    "titre": "Diplôme d'un niveau inférieur ou égal au bac",
    "formule": "diplôme préparé = 'niveau bac ou moins'",
    "description": "Concerne les diplôme de niveau V (CAP, BEP, CTM...) et de niveau IV (Bac Pro, BP, BTM)"
  },
  "salarié . contrat . apprentissage . diplôme préparé . niveau supérieur au bac": {
    "titre": "Diplôme d'un niveau supérieur au bac",
    "formule": "diplôme préparé = 'niveau supérieur au bac'",
    "description": "Concerne les diplôme de niveau I (Master, Ingénieur, Grandes écoles...), de niveau II (License, BMS...), et de niveau III (BTS, SUT, BM, ...)"
  },
  "salarié . contrat . apprentissage . ancienneté": {
    "question": "Depuis combien de temps l'apprenti est-il employé ?",
    "formule": {
      "une possibilité": {
        "choix obligatoire": "oui",
        "possibilités": [
          "moins d'un an",
          "moins de deux ans",
          "moins de trois ans",
          "moins de quatre ans"
        ]
      }
    },
    "par défaut": "'moins d'un an'"
  },
  "salarié . contrat . apprentissage . ancienneté . moins d'un an": {
    "formule": "ancienneté = 'moins d'un an'"
  },
  "salarié . contrat . apprentissage . ancienneté . moins de deux ans": {
    "formule": "ancienneté = 'moins de deux ans'"
  },
  "salarié . contrat . apprentissage . ancienneté . moins de trois ans": {
    "formule": "ancienneté = 'moins de trois ans'"
  },
  "salarié . contrat . apprentissage . ancienneté . moins de quatre ans": {
    "formule": "ancienneté = 'moins de quatre ans'",
    "type": "notification",
    "description": "La durée maximale du contrat peut être portée à 4 ans lorsque la qualité de travailleur handicapé est reconnue à l'apprenti."
  },
  "salarié . contrat . apprentissage . assiette réduite apprentissage": {
    "description": "Les apprentis bénéficient d'une exonération de cotisations sociales jusqu'à 79% du SMIC.",
    "références": {
      "Urssaf": "https://www.urssaf.fr/portail/home/employeur/beneficier-dune-exoneration/exonerations-ou-aides-liees-a-la/le-contrat-dapprentissage/exonerations.html"
    },
    "remplace": {
      "règle": "cotisations . assiette",
      "dans": [
        "cotisations . CEG . salarié",
        "cotisations . retraite complémentaire . salarié",
        "cotisations . vieillesse . salarié"
      ]
    },
    "valeur": "cotisations . assiette",
    "abattement": "79% * SMIC"
  },
  "salarié . contrat . professionnalisation . jeune de moins de 30 ans": {
    "question": "Le salarié embauché a-t'il moins de 30 ans ?",
    "par défaut": "oui"
  },
  "salarié . contrat . professionnalisation . salarié de 45 ans et plus": {
    "non applicable si": "jeune de moins de 30 ans",
    "question": "Le salarié embauché a-t'il 45 ans ou plus ?",
    "par défaut": "non"
  },
  "salarié . contrat . CDD . motif": {
    "titre": "Motif de recours",
    "question": "Quel est le motif de recours au CDD ?",
    "description": "Le CDD est un contrat d'exception: son recours doit être autorisé par l'un des motifs spécifiés dans la loi.\n",
    "une possibilité": {
      "choix obligatoire": "oui",
      "possibilités": [
        "classique",
        "contrat aidé",
        "complément formation",
        "issue d'apprentissage"
      ]
    },
    "par défaut": "'classique . accroissement activité'",
    "références": {
      "Code du travail - Articles L1242-1 à 4": "https://www.legifrance.gouv.fr/affichCode.do;jsessionid=E318966AA9DEB9E32465297F15B04D86.tpdila20v_1?idSectionTA=LEGISCTA000006195639&cidTexte=LEGITEXT000006072050&dateTexte=20170420",
      "le recours au CDD": "http://www.entreprises.cci-paris-idf.fr/web/reglementation/developpement-entreprise/droit-social/le-recours-au-cdd",
      "embaucher en CDD": "https://www.service-public.fr/particuliers/vosdroits/F34",
      "les cas de recours au CDD": "https://www.easycdd.com/LEGISLATION-CDD/Avant-de-rediger-un-contrat-CDD/Les-cas-de-recours-au-contrat-CDD"
    },
    "avec": {
      "classique": {
        "titre": "motifs classiques",
        "une possibilité": {
          "choix obligatoire": "oui",
          "possibilités": [
            "remplacement",
            "accroissement activité",
            "saisonnier",
            "usage",
            "mission"
          ]
        },
        "références": {
          "Code du travail - Article L1242-2": "https://www.legifrance.gouv.fr/affichCodeArticle.do;jsessionid=714D2E2B814371F4F1D5AA88472CD621.tpdila20v_1?idArticle=LEGIARTI000033024658&cidTexte=LEGITEXT000006072050&dateTexte=20170420"
        },
        "avec": {
          "saisonnier": {
            "valeur": "salarié . contrat . CDD . motif = 'classique . saisonnier'",
            "description": "Emplois à caractère saisonnier, dont les tâches sont appelées à se répéter chaque année selon une périodicité à peu près fixe, en fonction du rythme des saisons ou des modes de vie collectifs."
          },
          "accroissement activité": {
            "titre": "Accroissement temporaire d'activité",
            "valeur": "salarié . contrat . CDD . motif = 'classique . accroissement activité'",
            "description": "Accroissement temporaire de l'activité de l'entreprise"
          },
          "remplacement": {
            "titre": "Contrat de remplacement",
            "valeur": "salarié . contrat . CDD . motif = 'classique . remplacement'",
            "description": "Nous regroupons dans cette catégorie les cas suivants.\n\n- Remplacement d'un salarié en cas :\n  - D'absence ;\n  - De passage provisoire à temps partiel, conclu par avenant à son contrat de travail ou par échange écrit entre ce salarié et son employeur ;\n  - De suspension de son contrat de travail ;\n  - De départ définitif précédant la suppression de son poste de travail après consultation du comité d'entreprise ou, à défaut, des délégués du personnel, s'il en existe ;\n  - D'attente de l'entrée en service effective du salarié recruté par contrat à durée indéterminée appelé à le remplacer ;\n\n- Remplacement d'un chef d'entreprise artisanale, industrielle ou commerciale, d'une personne exerçant une profession libérale, de son conjoint participant effectivement à l'activité de l'entreprise à titre professionnel et habituel ou d'un associé non salarié d'une société civile professionnelle, d'une société civile de moyens d'une société d'exercice libéral ou de toute autre personne morale exerçant une profession libérale ;\n\n- Remplacement du chef d'une exploitation agricole ou d'une entreprise mentionnée aux 1° à 4° de l'article L. 722-1 du code rural et de la pêche maritime, d'un aide familial, d'un associé d'exploitation, ou de leur conjoint mentionné à l'article L. 722-10 du même code dès lors qu'il participe effectivement à l'activité de l'exploitation agricole ou de l'entreprise ;\n"
          },
          "mission": {
            "titre": "Contrat de mission",
            "valeur": "salarié . contrat . CDD . motif = 'classique . mission'",
            "description": "> Aussi appelé contrat à objet défini.\n\nRecrutement d'ingénieurs et de cadres, au sens des conventions collectives, en vue de la réalisation d'un objet défini lorsqu'un accord de branche étendu ou, à défaut, un accord d'entreprise le prévoit et qu'il définit :\n\n- Les nécessités économiques auxquelles ces contrats sont susceptibles d'apporter une réponse adaptée ;\n- Les conditions dans lesquelles les salariés sous contrat à durée déterminée à objet défini bénéficient de garanties relatives à l'aide au reclassement, à la validation des acquis de l'expérience, à la priorité de réembauche et à l'accès à la formation professionnelle continue et peuvent, au cours du délai de prévenance, mobiliser les moyens disponibles pour organiser la suite de leur parcours professionnel ;\n- Les conditions dans lesquelles les salariés sous contrat à durée déterminée à objet défini ont priorité d'accès aux emplois en contrat à durée indéterminée dans l'entreprise.\n"
          },
          "usage": {
            "titre": "Contrat d'usage",
            "alias": "motif extra",
            "valeur": "salarié . contrat . CDD . motif = 'classique . usage'",
            "description": "Emplois pour lesquels, dans certains secteurs d'activité définis par décret ou par convention ou accord collectif de travail étendu, il est d'usage constant de ne pas recourir au contrat de travail à durée indéterminée en raison de la nature de l'activité exercée et du caractère par nature temporaire de ces emplois ;",
            "références": {
              "Embauche en contrat d'extra": "https://www.service-public.fr/professionnels-entreprises/vosdroits/F33693"
            }
          }
        }
      },
      "complément formation": {
        "titre": "Complément de formation professionnelle",
        "valeur": "salarié . contrat . CDD . motif = 'complément formation'",
        "description": "L'employeur s'engage, pour une durée et dans des conditions déterminées par décret, à assurer un complément de formation professionnelle au salarié.",
        "références": {
          "Code du travail - Article L1242-3": "https://www.legifrance.gouv.fr/affichCodeArticle.do;jsessionid=714D2E2B814371F4F1D5AA88472CD621.tpdila20v_1?idArticle=LEGIARTI000006901196&cidTexte=LEGITEXT000006072050&dateTexte=20170420",
          "Code du travail - Décret D1242-3": "https://www.legifrance.gouv.fr/affichCodeArticle.do?idArticle=LEGIARTI000018537448&cidTexte=LEGITEXT000006072050"
        }
      },
      "issue d'apprentissage": {
        "titre": "À l'issue d'un contrat d'apprentissage",
        "valeur": "salarié . contrat . CDD . motif = 'issue d'apprentissage'",
        "description": "A l'issue d'un contrat d'apprentissage, un contrat de travail à durée déterminée peut être conclu lorsque l'apprenti doit satisfaire aux obligations du service national dans un délai de moins d'un an après l'expiration du contrat d'apprentissage.\n",
        "références": {
          "Code du travail - Article L1242-4": "https://www.legifrance.gouv.fr/affichCodeArticle.do;jsessionid=714D2E2B814371F4F1D5AA88472CD621.tpdila20v_1?idArticle=LEGIARTI000028498598&cidTexte=LEGITEXT000006072050&dateTexte=20170420"
        }
      },
      "contrat aidé": {
        "titre": "Contrat aidé (CUI, alternance, ...)",
        "valeur": "salarié . contrat . CDD . motif = 'contrat aidé'",
        "références": {
          "Code du travail - Article L1242-3": "https://www.legifrance.gouv.fr/affichCodeArticle.do;jsessionid=714D2E2B814371F4F1D5AA88472CD621.tpdila20v_1?idArticle=LEGIARTI000006901196&cidTexte=LEGITEXT000006072050&dateTexte=20170420"
        }
      }
    }
  },
  "salarié . contrat . CDD . durée": {
    "icônes": "⏳",
    "titre": "durée du contrat",
    "question": "Quelle est la durée du contrat ?",
    "description": "[Cliquez ici](https://www.service-public.fr/professionnels-entreprises/vosdroits/F31211) pour connaître la durée maximale d'un CDD.\n",
    "références": {
      "Durée maximale d'un CDD (service-public.fr)": "https://www.service-public.fr/professionnels-entreprises/vosdroits/F31211"
    },
    "suggestions": {
      "18 mois": "18 mois",
      "1 an": "12 mois",
      "6 mois": "6 mois",
      "3 mois": "3 mois"
    },
    "par défaut": "1 mois",
    "unité": "mois"
  },
  "salarié . contrat . CDD . indemnité de fin de contrat": {
    "alias": "prime de précarité",
    "question": "Le salarié a-t-il droit à l'indemnité de fin de contrat (dite prime de précarité) ?",
    "description": "Si vous ne savez pas, cliquez sur « Passer »",
    "par défaut": {
      "valeur": "oui",
      "non applicable si": {
        "une de ces conditions": [
          "motif = 'classique . usage'",
          "motif = 'classique . saisonnier'",
          "motif . complément formation",
          "motif . contrat aidé",
          "reconduction en CDI",
          "rupture sans indemnité",
          "CDD jeune vacances"
        ]
      }
    },
    "avec": {
      "rupture sans indemnité": {
        "titre": "Rupture pour faute grave, force majeure, ou par le salarié.",
        "question": "Le contrat CDD a-t-il été rompu pendant la période d'essai, pour faute grave, force majeure, ou de manière anticipée par le salarié ?",
        "description": "Dans ces cas, aucune majoration ou indemnité sur le CDD ne sera à verser.",
        "par défaut": "non",
        "références": {
          "Faute grave": "https://code.travail.gouv.fr/fiche-service-public/faute-simple-grave-ou-lourde-quelles-differences-pour-le-salarie-licencie",
          "Force majeure": "https://code.travail.gouv.fr/fiche-service-public/rupture-du-contrat-de-travail-pour-cas-de-force-majeure?q=rupture%20du%20contrat%20et%20force%20majeure"
        }
      },
      "CDD jeune vacances": {
        "par défaut": "non",
        "question": "Est-ce un CDD conclu avec un jeune pendant ses vacances scolaires ou universitaires (« job d’été ») ?",
        "description": "\nPour être dans ce cas, le contrat doit se terminer avant les vacances scolaires ou universitaires, et que le jeune reprenne effectivement ses études lors de la prochaine rentrée."
      }
    },
    "références": {
      "Code du travail - Article L1243-8": "https://www.legifrance.gouv.fr/affichCode.do?idSectionTA=LEGISCTA000006189459&cidTexte=LEGITEXT000006072050",
      "Fiche Fin du CDD": "https://www.service-public.fr/particuliers/vosdroits/F40",
      "Fiche La prime de précarité est-elle due": "https://www.service-public.fr/particuliers/vosdroits/F803",
      "Le travail saisonnier": "http://travail-emploi.gouv.fr/droit-du-travail/contrats-et-carriere/contrats-de-travail/article/le-travail-saisonnier",
      "La prime de précarité n'est pas due si": "https://www.easycdd.com/LEGISLATION-CDD/Fin-ou-rupture-du-contrat-CDD/La-prime-de-precarite/La-prime-de-precarite-n-est-pas-due-si",
      "Poursuite de l'activité après la fin du CDD": "https://www.easycdd.com/LEGISLATION-CDD/Fin-ou-rupture-du-contrat-CDD/Poursuite-de-l-activite-apres-la-fin-du-contrat-CDD"
    }
  },
  "salarié . contrat . CDD . reconduction en CDI": {
    "question": "Le CDD sera-t-il reconduit en CDI ?",
    "description": "Le salarié se voit proposé, au terme du CDD, une reconduction en CDI pour un emploi similaire, et une rémunération au moins aussi avantageuse.\n",
    "par défaut": "non"
  },
  "salarié . contrat . CDD . congés pris": {
    "question": "Combien de jours de congés seront pris sur la durée du CDD (en jours ouvrés) ?",
    "description": "Le contrat étant à durée déterminée, le salarié n'a pas forcément le temps de prendre tous les jours de congés qu'il a acquis comme tout salarié au cours du contrat.\nPar exemple, pour un contrat de 3 mois, le salarié acquiert 2,08 jours de congés par mois (25 jours / 12 mois = 2,08), donc 6,25 sur la durée du contrat. Or il se peut que l'entreprise le contraigne à n'en prendre que 4, donc 2,25 jours ne seront pas pris. Ils seront payés par l'employeur à la fin du contrat.\n",
    "unité": "jours ouvrés",
    "suggestions": {
      "la totalité": "congés dus sur la durée du contrat",
      "la moitié": "50% * congés dus sur la durée du contrat",
      "aucun": "0 jours ouvrés"
    },
    "par défaut": "congés dus sur la durée du contrat",
    "références": {
      "A-t-on droit à des congés payés pendant un CDD ?": "https://www.service-public.fr/particuliers/vosdroits/F2931"
    },
    "avec": {
      "jours ouvrés sur la durée du contrat": {
        "produit": {
          "assiette": "253 jours ouvrés/an",
          "facteur": "durée"
        }
      },
      "congés dus sur la durée du contrat": {
        "produit": {
          "assiette": "25 jours ouvrés/an",
          "facteur": "durée"
        },
        "arrondi": "2 décimales"
      },
      "contrôle congés non pris max": {
        "type": "notification",
        "sévérité": "avertissement",
        "valeur": "congés pris > congés dus sur la durée du contrat",
        "description": "Le nombre de jours de congés pris est supérieur à la totalité des jours de congés acquis sur la durée du contrat (par défaut 25 jours / an)"
      },
      "proportion": {
        "unité": "%",
        "valeur": "congés pris / congés dus sur la durée du contrat",
        "plafond": "100%"
      },
      "proportion par rapport aux jours ouvrés": "(congés dus sur la durée du contrat - congés pris) / jours ouvrés sur la durée du contrat"
    }
  },
  "salarié . contrat . date d'embauche": {
    "question": "Quelle est la date d'embauche du salarié ?",
    "par défaut": "01/10/2021",
    "suggestions": {
      "Début 2021": "01/01/2021",
      "Début 2020": "01/01/2020",
      "Fin 2017": "31/12/2017"
    },
    "type": "date"
  },
  "salarié . contrat . salaire brut": {
    "identifiant court": "salaire-brut",
    "résumé": "Brut de référence (sans les primes, indemnités ni majorations)",
    "type": "salaire",
    "question": "Quel est votre salaire brut ?",
    "description": "C'est le salaire *brut* régulier inscrit dans le contrat de travail. Il ne change jamais entre les mois et ne peut pas être modifié sans signature des deux parties.\n\nIl ne comprend pas les indemnités, avantages en nature et primes...\n",
    "unité": "€/mois",
    "suggestions": {
      "salaire médian": "2500 €/mois",
      "SMIC": "temps de travail . SMIC"
    },
    "inversion numérique": {
      "avec": [
        "coût total employeur",
        "rémunération . net . à payer avant impôt",
        "rémunération . net . payé après impôt",
        "équivalent temps plein",
        "dirigeant . rémunération . totale",
        "entreprise . chiffre d'affaires"
      ]
    },
    "références": {
      "Le salaire. Fixation et paiement": "http://travail-emploi.gouv.fr/droit-du-travail/remuneration-et-participation-financiere/remuneration/article/le-salaire-fixation-et-paiement"
    },
    "avec": {
      "équivalent temps plein": {
        "applicable si": "temps de travail . temps partiel",
        "titre": "Salaire brut équivalent temps plein",
        "résumé": "Le salaire si l'embauche se faisait à temps plein",
        "question": "Quel est le salaire en équivalent temps plein ?",
        "unité": "€/mois",
        "valeur": "salaire brut / temps de travail . quotité"
      },
      "contrôle salaire élevé": {
        "type": "notification",
        "toutes ces conditions": [
          "salaire brut >= 10000 €/mois",
          "dirigeant = non"
        ],
        "description": "Le salaire mensuel saisi est élevé. Ne vous êtes-vous pas trompé de période de calcul ?"
      }
    }
  },
  "salarié . contrat . temps de travail": {
    "unité": "heures/mois",
    "produit": {
      "assiette": {
        "variations": [
          {
            "si": "temps partiel",
            "alors": "temps partiel . heures par semaine"
          },
          {
            "sinon": "durée légale du travail"
          }
        ]
      },
      "facteur": "période . semaines par mois"
    },
    "avec": {
      "quotité": {
        "valeur": "temps de travail / durée légale du travail . mensuelle",
        "unité": "%"
      },
      "SMIC": "SMIC * quotité"
    }
  },
  "salarié . contrat . temps de travail . temps partiel": {
    "question": "Le contrat est-il à temps partiel ?",
    "description": "Deux contrats au même salaire, l'un à temps partiel, l'autre à temps complet, peuvent donner lieu à des montants de cotisation différents.\n\nPar exemple pour les cotisations plafonnées ou les exonérations dépendant du SMIC.\n",
    "par défaut": "non",
    "avec": {
      "heures par semaine": {
        "par défaut": "32 heures/semaine",
        "plancher": "1 heures/semaine",
        "question": "Quel est le nombre d'heures travaillées par semaine dans le cadre du temps partiel ?",
        "suggestions": {
          "4 jours / semaine": "durée légale du travail * 4 / 5",
          "mi-temps": "durée légale du travail / 2"
        }
      },
      "contrôle temps min": {
        "type": "notification",
        "sévérité": "avertissement",
        "formule": "heures par semaine < 24 heures/semaine",
        "description": "Le nombre minimum d'heures par semaine est 24. Il est possible de descendre plus bas dans certains cas seulement. [Plus d'infos](https://www.service-public.fr/particuliers/vosdroits/F32428)."
      },
      "contrôle temps max": {
        "type": "notification",
        "sévérité": "avertissement",
        "formule": "heures par semaine >= durée légale du travail",
        "description": "Un temps partiel doit être en dessous de la durée de travail légale (35h)"
      }
    }
  },
  "salarié . contrat . statut cadre": {
    "question": "Le salarié a-t-il le statut cadre ?",
    "description": "Un cadre d'entreprise est un employé ou dirigeant d'une entreprise\nappartenant à la catégorie supérieure des salariés. Il s'agit d'un statut\nreconnu par les conventions collectives, qui détermine l'appartenance à une\ncaisse de retraite spécifique, l'AGIRC, et quelques modalités spécifiques du\ncontrat de travail.\n\n\nReconnaissant initialement les compétences techniques et le rôle\nd'encadrement du salarié, le statut s'est progressivement élargi à un\nensemble de postes de plus en plus nombreux, et a fini par recouvrir une\nlarge population, mêlant managers, experts et dirigeants.\n\n\nIl s'agit d'une notion mal définie désignant des concepts différents selon\nle point de vue envisagé — que ce soit en termes de statut, de\nreprésentation sociale, de rôle dans l'entreprise ou de culture.\n",
    "par défaut": "non",
    "références": {
      "wikipedia.fr": "https://fr.wikipedia.org/wiki/Cadre_d%27entreprise"
    }
  },
  "salarié . convention collective . BTP": {
    "formule": "convention collective = 'BTP'",
    "titre": "Bâtiment",
    "icônes": "👷‍♀️",
    "description": "L'entreprise dépend de la convention collective nationale du bâtiment. Cette convention définit trois catégories de salariés : les ouvriers, les ETAM (employés, techniciens et agents de maîtrise) et les cadres.",
    "rend non applicable": "rémunération . indemnités CDD . congés payés"
  },
  "salarié . convention collective . BTP . catégorie": {
    "question": "À quelle catégorie la salarié appartient-t'il ?",
    "par défaut": "'ouvrier'",
    "formule": {
      "une possibilité": {
        "choix obligatoire": "oui",
        "possibilités": [
          "ouvrier",
          "etam",
          "cadre"
        ]
      }
    }
  },
  "salarié . convention collective . BTP . catégorie . ouvrier": {
    "titre": "Ouvrier",
    "icônes": "👨‍🔧",
    "formule": "catégorie = 'ouvrier'"
  },
  "salarié . convention collective . BTP . catégorie . ouvrier . prévoyance complémentaire": {
    "produit": {
      "assiette": "contrat . salaire brut",
      "plafond": "3 * temps de travail . plafond sécurité sociale",
      "composantes": [
        {
          "attributs": {
            "nom": "employeur",
            "remplace": "cotisations . prévoyances . conventionnelle . employeur"
          },
          "taux": "1.72%"
        },
        {
          "attributs": {
            "nom": "salarié",
            "remplace": "cotisations . prévoyances . conventionnelle . salarié"
          },
          "taux": "0.87%"
        }
      ]
    }
  },
  "salarié . convention collective . BTP . catégorie . etam": {
    "titre": "ETAM",
    "description": "Employé, technicien, angent de maîtrise",
    "icônes": "👷‍♂️",
    "formule": "catégorie = 'etam'",
    "remplace": [
      {
        "règle": "cotisations . retraite complémentaire . employeur . taux T1",
        "par": "4.47%"
      },
      {
        "règle": "cotisations . retraite complémentaire . employeur . taux T2",
        "par": "12.70%"
      },
      {
        "règle": "cotisations . retraite complémentaire . salarié . taux T1",
        "par": "3.40%"
      },
      {
        "règle": "cotisations . retraite complémentaire . salarié . taux T2",
        "par": "8.89%"
      }
    ],
    "note": "Répartition conventionnelle fixée par l’article 5 de l’Accord du BTP du 13 décembre 1990."
  },
  "salarié . convention collective . BTP . catégorie . etam . prévoyance complémentaire": {
    "produit": {
      "assiette": "contrat . salaire brut",
      "plafond": "3 * temps de travail . plafond sécurité sociale",
      "composantes": [
        {
          "attributs": {
            "nom": "employeur",
            "remplace": "cotisations . prévoyances . conventionnelle . employeur"
          },
          "taux": "1.25%"
        },
        {
          "attributs": {
            "nom": "salarié",
            "remplace": "cotisations . prévoyances . conventionnelle . salarié"
          },
          "taux": "0.60%"
        }
      ]
    }
  },
  "salarié . convention collective . BTP . catégorie . cadre": {
    "formule": "catégorie = 'cadre'",
    "titre": "Cadre",
    "icônes": "👩‍💼",
    "remplace": [
      {
        "règle": "contrat . statut cadre",
        "par": "oui"
      }
    ]
  },
  "salarié . convention collective . BTP . catégorie . cadre . prévoyance complémentaire": {
    "barème": {
      "assiette": "contrat . salaire brut",
      "multiplicateur": "plafond sécurité sociale",
      "composantes": [
        {
          "attributs": {
            "nom": "employeur",
            "remplace": "cotisations . prévoyances . conventionnelle . employeur"
          },
          "tranches": [
            {
              "taux": "1.50%",
              "plafond": 1
            },
            {
              "taux": "50% * 2.40%",
              "plafond": 4
            },
            {
              "taux": "50% * 3.60%",
              "plafond": 8
            }
          ]
        },
        {
          "attributs": {
            "nom": "salarié",
            "remplace": "cotisations . prévoyances . conventionnelle . salarié"
          },
          "tranches": [
            {
              "taux": "0%",
              "plafond": 1
            },
            {
              "taux": "50% * 2.40%",
              "plafond": 4
            },
            {
              "taux": "50% * 3.60%",
              "plafond": 8
            }
          ]
        }
      ]
    }
  },
  "salarié . convention collective . BTP . cotisations employeur": {
    "remplace": "cotisations . employeur",
    "somme": [
      "cotisations . employeur",
      "congés intempéries",
      "OPPBTP"
    ]
  },
  "salarié . convention collective . BTP . congés intempéries": {
    "formule": {
      "produit": {
        "assiette": "cotisations . assiette",
        "taux": {
          "variations": [
            {
              "si": "caisse de rattachement = 'idf'",
              "alors": "19.80%"
            },
            {
              "si": "caisse de rattachement = 'nord ouest'",
              "alors": "19.95%"
            },
            {
              "si": "caisse de rattachement = 'grand ouest'",
              "alors": "19.95%"
            },
            {
              "si": "caisse de rattachement = 'centre ouest'",
              "alors": "20.30%"
            },
            {
              "si": "caisse de rattachement = 'centre'",
              "alors": "20.40%"
            },
            {
              "si": "caisse de rattachement = 'grand est'",
              "alors": "20.00%"
            },
            {
              "si": "caisse de rattachement = 'rhône alpes auvergne'",
              "alors": "19.80%"
            },
            {
              "si": "caisse de rattachement = 'méditerranée'",
              "alors": "19.60%"
            },
            {
              "si": "caisse de rattachement = 'sud ouest'",
              "alors": "19.90%"
            }
          ]
        }
      }
    },
    "références": {
      "CIBTP": "https://www.cibtp.fr/",
      "Article L3141-30 du Code du Travail": "https://www.legifrance.gouv.fr/affichCodeArticle.do;jsessionid=DF6E6424807679A6EDC2915496BEA32D.tplgfr22s_2?idArticle=LEGIARTI000033020675&cidTexte=LEGITEXT000006072050&dateTexte=20200320"
    }
  },
  "salarié . convention collective . BTP . congés intempéries . caisse de rattachement": {
    "question": "À quelle caisse l'entreprise est-elle rattachée pour le versement de la cotisation congés intempéries ?",
    "formule": {
      "une possibilité": {
        "choix obligatoire": "oui",
        "possibilités": [
          "idf",
          "nord ouest",
          "grand ouest",
          "centre ouest",
          "centre",
          "grand est",
          "rhône alpes auvergne",
          "méditerranée",
          "sud ouest"
        ]
      }
    },
    "par défaut": "'idf'",
    "avec": {
      "idf": {
        "titre": "Île-de-France"
      },
      "nord ouest": null,
      "grand ouest": null,
      "centre ouest": null,
      "centre": null,
      "grand est": null,
      "rhône alpes auvergne": null,
      "méditerranée": null,
      "sud ouest": null
    }
  },
  "salarié . convention collective . BTP . OPPBTP": {
    "formule": {
      "produit": {
        "assiette": "contrat . salaire brut * 1.1314",
        "taux": "0.11%"
      }
    }
  },
  "salarié . convention collective . BTP . taux ATMP fonctions support": {
    "remplace": "cotisations . ATMP . taux fonctions support . montant",
    "valeur": "0.70%",
    "Arrêté du 24 décembre 2021 Relatif à la tarification des risques d'accidents du travail et de maladies professionnelles pour l'année 2022": "https://www.legifrance.gouv.fr/jorf/article_jo/JORFARTI000044616026"
  },
  "salarié . convention collective . compta": {
    "formule": "convention collective = 'compta'",
    "titre": "Experts-comptables et commissaires aux comptes",
    "icônes": "🧮",
    "description": "Cette convention collective concerne les experts comptables inscrits à l'ordre, les commissaires aux comptes inscrits à la compagnie, ainsi que les centres de gestion agréés et les associations agréées (AGC).",
    "références": {
      "Légifrance": "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000005635826",
      "Synthèse Dicotravail": "https://www.dicotravail.com/convention-collective/experts-comptables-jo-3020-idcc-787/"
    }
  },
  "salarié . convention collective . compta . majoration heures supplémentaires": {
    "remplace": "temps de travail . heures supplémentaires . majoration",
    "formule": {
      "barème": {
        "assiette": "temps de travail . heures supplémentaires",
        "multiplicateur": "période . semaines par mois",
        "tranches": [
          {
            "taux": "10%",
            "plafond": "4 heures/semaine"
          },
          {
            "taux": "25%"
          }
        ]
      }
    }
  },
  "salarié . convention collective . HCR": {
    "formule": "convention collective = 'HCR'",
    "titre": "hôtels, cafés restaurants HCR",
    "icônes": "🍴",
    "description": "L'entreprise est un hôtel, café, restaurant ou assimilé."
  },
  "salarié . convention collective . HCR . montant forfaitaire d'un repas": {
    "remplace": {
      "règle": "rémunération . avantages en nature . nourriture . montant . repas forfaitaire"
    },
    "formule": "3.94 €/repas"
  },
  "salarié . convention collective . HCR . majoration heures supplémentaires": {
    "remplace": "temps de travail . heures supplémentaires . majoration",
    "formule": {
      "barème": {
        "assiette": "temps de travail . heures supplémentaires",
        "multiplicateur": "période . semaines par mois",
        "tranches": [
          {
            "taux": "10%",
            "plafond": "4 heures/semaine"
          },
          {
            "taux": "20%",
            "plafond": "8 heures/semaine"
          },
          {
            "taux": "50%"
          }
        ]
      }
    }
  },
  "salarié . convention collective . HCR . prévoyance conventionnelle": {
    "produit": {
      "assiette": "contrat . salaire brut",
      "plafond": "plafond sécurité sociale",
      "composantes": [
        {
          "attributs": {
            "nom": "employeur",
            "remplace": "cotisations . prévoyances . conventionnelle . employeur"
          },
          "taux": "0.90%"
        },
        {
          "attributs": {
            "nom": "salarié",
            "remplace": "cotisations . prévoyances . conventionnelle . salarié"
          },
          "taux": "0.47%"
        }
      ]
    },
    "note": "Taux spécifiques pour les salariés relevant du régime local Alsace-Moselle"
  },
  "salarié . convention collective . optique": {
    "formule": "convention collective = 'optique'",
    "titre": "Optique",
    "icônes": "👓"
  },
  "salarié . convention collective . optique . prime d'ancienneté": {
    "applicable si": "convention collective = 'optique'",
    "remplace": "rémunération . primes . ancienneté",
    "formule": {
      "produit": {
        "assiette": "salaire minimum conventionnel",
        "taux": {
          "variations": [
            {
              "si": "ancienneté >= 15 ans",
              "alors": "15%"
            },
            {
              "si": "ancienneté >= 12 ans",
              "alors": "12%"
            },
            {
              "si": "ancienneté >= 9 ans",
              "alors": "9%"
            },
            {
              "si": "ancienneté >= 6 ans",
              "alors": "6%"
            },
            {
              "si": "ancienneté >= 3 ans",
              "alors": "3%"
            },
            {
              "sinon": "0%"
            }
          ]
        }
      }
    },
    "références": {
      "Légifrance": "https://www.legifrance.gouv.fr/affichIDCC.do?idSectionTA=KALISCTA000005736434&cidTexte=KALITEXT000005649634&idConvention=KALICONT000005635912"
    }
  },
  "salarié . convention collective . optique . salaire minimum conventionnel": {
    "unité": "€/mois",
    "formule": {
      "variations": [
        {
          "si": "coefficient < 110",
          "alors": 0
        },
        {
          "si": "coefficient < 115",
          "alors": 1485
        },
        {
          "si": "coefficient < 130",
          "alors": 1555
        },
        {
          "si": "coefficient < 140",
          "alors": 1585
        },
        {
          "si": "coefficient < 160",
          "alors": 1645
        },
        {
          "si": "coefficient < 180",
          "alors": 1650
        },
        {
          "si": "coefficient < 195",
          "alors": 1660
        },
        {
          "si": "coefficient < 210",
          "alors": 1715
        },
        {
          "si": "coefficient < 220",
          "alors": 1845
        },
        {
          "si": "coefficient < 230",
          "alors": 1920
        },
        {
          "si": "coefficient < 250",
          "alors": 1945
        },
        {
          "si": "coefficient < 280",
          "alors": 2150
        },
        {
          "si": "coefficient < 300",
          "alors": 2305
        },
        {
          "si": "coefficient < 330",
          "alors": 2560
        },
        {
          "si": "coefficient < 350",
          "alors": 2715
        },
        {
          "si": "coefficient < 380",
          "alors": 2970
        },
        {
          "sinon": 3170
        }
      ]
    }
  },
  "salarié . convention collective . optique . coefficient": {
    "question": "Quel est le coefficient correspondant au poste du salarié ?",
    "description": "Se référer à la [grille fournie par la convention collective](https://www.optometrie-aof.com/images/telecharger/convention_collective.pdf#page=45).",
    "par défaut": "110 points"
  },
  "salarié . convention collective . optique . prévoyance": {
    "non applicable si": "contrat . statut cadre",
    "barème": {
      "assiette": "contrat . salaire brut",
      "tranches": [
        {
          "taux": "0.46%",
          "plafond": "4 * plafond sécurité sociale"
        }
      ]
    },
    "avec": {
      "employeur": {
        "remplace": "cotisations . prévoyances . conventionnelle . employeur",
        "valeur": "60% * prévoyance"
      },
      "salarié": {
        "remplace": "cotisations . prévoyances . conventionnelle . salarié",
        "valeur": "40% * prévoyance"
      }
    }
  },
  "salarié . convention collective . SVP": {
    "titre": "Spectacle vivant privé",
    "formule": "convention collective = 'SVP'",
    "icônes": "🎭",
    "description": "L'entreprise dépend de la convention collective nationale des entreprises privée du spectacle\n",
    "rend non applicable": "rémunération . indemnités CDD . congés payés"
  },
  "salarié . convention collective . SVP . cotisations employeur": {
    "remplace": "cotisations . employeur",
    "somme": [
      "cotisations . employeur",
      "régimes spécifiques . intermittents du spectacle . caisse des congés spectacle",
      "FCAP",
      "prévoyance"
    ]
  },
  "salarié . convention collective . SVP . FCAP": {
    "titre": "Fond commun d'aide au paritarisme",
    "description": "Le Fonds Commun d’Aide au Paritarisme du Spectacle Vivant Privé (FCAP-SVP) résulte de l’application du titre V – Financement du paritarisme la CCN des entreprises du secteur privé du spectacle vivant. Il a pour but de :\n\n- Permettre aux organisations d’employeurs et de salariés d’exercer leurs missions et de favoriser l’application dans le temps de la Convention collective,\n- De couvrir les frais engagés par les organisations syndicales,\n- De couvrir les frais relatifs au dispositif des Conseillers Conventionnels des Salariés, au nombre de 28\n- De financer le rapport de branche du spectacle vivant privé.\n",
    "unité": "€/an",
    "note": "les minimum et maximum sont fixé par entreprise, et non par salarié",
    "non applicable si": "entreprise . salariés . effectif = 0",
    "formule": {
      "produit": {
        "plafond": "plafond sécurité sociale",
        "assiette": "rémunération . brut",
        "taux": "0.1%"
      },
      "plancher": "80 €.employés/an / entreprise . salariés . effectif",
      "plafond": "300 €.employés/an / entreprise . salariés . effectif"
    },
    "références": {
      "Titre V de IDCC 3090": "https://www.legifrance.gouv.fr/affichIDCC.do;?idSectionTA=KALISCTA000028157274&cidTexte=KALITEXT000028157267&idConvention=KALICONT000028157262",
      "Note explicative AUDIENS": "http://www.cheque-intermittents.com/wp-content/uploads/2015/05/FCAP-SVP-EXPLIC_final.pdf"
    }
  },
  "salarié . convention collective . SVP . prévoyance": {
    "formule": {
      "produit": {
        "plafond": "plafond sécurité sociale",
        "assiette": "cotisations . assiette",
        "taux": "1.20%"
      }
    },
    "non applicable si": "contrat . statut cadre",
    "note": "Dans le cas du statut cadre, la prévoyance obligatoire est plus avantageuse, c'est donc cette dernière qui est prise en compte",
    "références": {
      "notice audiens": "https://www.audiens.org/files/live/sites/siteAudiens/files/03_documents/particulier/Fiches-techniques/ESSENTIEL-Sante-Prevoyance-Intermittents.pdf",
      "Article 12.6, Titre VII, IDCC 3090": "https://www.legifrance.gouv.fr/affichIDCCArticle.do;?idArticle=KALIARTI000028157451&cidTexte=KALITEXT000028157267&dateTexte=29990101&categorieLien=id"
    }
  },
  "salarié . régimes spécifiques . intermittents du spectacle": {
    "applicable si": {
      "toutes ces conditions": [
        "contrat . CDD . motif = 'classique . usage'",
        "convention collective . SVP"
      ]
    },
    "question": "A quel statut d'intermittent est rattaché l'employé ?",
    "par défaut": "'technicien'",
    "formule": {
      "une possibilité": {
        "choix obligatoire": "oui",
        "possibilités": [
          "technicien",
          "artiste"
        ]
      }
    }
  },
  "salarié . régimes spécifiques . intermittents du spectacle . formation professionnelle": {
    "remplace": "formation professionnelle",
    "formule": {
      "somme": [
        "50 €/mois",
        {
          "produit": {
            "assiette": "rémunération . brut",
            "taux": "2.10%"
          }
        }
      ]
    }
  },
  "salarié . régimes spécifiques . intermittents du spectacle . caisse des congés spectacle": {
    "formule": {
      "produit": {
        "assiette": "rémunération . brut",
        "taux": "15.40%"
      }
    },
    "références": {
      "audiens.org": "https://www.audiens.org/files/live/sites/siteAudiens/files/03_documents/particulier/Fiches-techniques/ESSENTIEL-Sante-Prevoyance-Intermittents.pdf",
      "Article L3141-30 du Code du Travail": "https://www.legifrance.gouv.fr/affichCodeArticle.do;jsessionid=DF6E6424807679A6EDC2915496BEA32D.tplgfr22s_2?idArticle=LEGIARTI000033020675&cidTexte=LEGITEXT000006072050&dateTexte=20200320"
    }
  },
  "salarié . régimes spécifiques . intermittents du spectacle . retraite complémentaire techniciens et cadre": {
    "applicable si": {
      "une de ces conditions": [
        "contrat . statut cadre",
        "technicien"
      ]
    },
    "formule": "oui",
    "remplace": [
      {
        "règle": "cotisations . retraite complémentaire . employeur . taux T1",
        "par": "3.94%"
      },
      {
        "règle": "cotisations . retraite complémentaire . salarié . taux T1",
        "par": "3.93%"
      }
    ],
    "références": {
      "audiens.org": "https://www.audiens.org/solutions/entreprises-la-retraite-complementaire-agirc-arcco-au-1er-janvier-2019.html"
    }
  },
  "salarié . régimes spécifiques . intermittents du spectacle . technicien": {
    "formule": "intermittents du spectacle = 'technicien'"
  },
  "salarié . régimes spécifiques . intermittents du spectacle . technicien . non cadre": {
    "formule": "contrat . statut cadre = non",
    "remplace": [
      {
        "règle": "cotisations . retraite complémentaire . employeur . taux T2",
        "par": "10.80%"
      },
      {
        "règle": "cotisations . retraite complémentaire . salarié . taux T2",
        "par": "10.79%"
      },
      {
        "règle": "plafond sécurité sociale",
        "par": "plafond sécurité sociale",
        "dans": [
          "cotisations . retraite complémentaire",
          "cotisations . CEG",
          "cotisations . CET"
        ]
      }
    ],
    "références": {
      "audiens.org": "https://www.audiens.org/solutions/entreprises-la-retraite-complementaire-agirc-arcco-au-1er-janvier-2019.html"
    }
  },
  "salarié . régimes spécifiques . intermittents du spectacle . artiste": {
    "formule": "intermittents du spectacle = 'artiste'",
    "description": "Sont considérés comme artistes du spectacle :\n- L'artiste lyrique\n- L'artiste dramatique\n- L'artiste chorégraphique\n- L'artiste de variétés\n- Le musicien\n- Le chansonnier\n- L'artiste de complément\n- Le chef d'orchestre\n- L'arrangeur-orchestrateur\n- Le metteur en scène, le réalisateur et le chorégraphe, pour l'exécution matérielle de leur conception artistique\n- L'artiste de cirque\n- Le marionnettiste\n- Les personnes dont l'activité est reconnue comme un métier d'artiste-interprète par les conventions collectives du spectacle vivant étendues.\n",
    "références": {
      "Article L7121-2": "https://www.legifrance.gouv.fr/affichCodeArticle.do?idArticle=LEGIARTI000032859810&cidTexte=LEGITEXT000006072050&dateTexte=20160709"
    }
  },
  "salarié . régimes spécifiques . intermittents du spectacle . artiste . non cadre": {
    "formule": "contrat . statut cadre = non",
    "remplace": [
      {
        "règle": "plafond sécurité sociale",
        "par": "plafond sécurité sociale",
        "dans": [
          "cotisations . retraite complémentaire",
          "cotisations . CEG",
          "cotisations . CET"
        ]
      },
      {
        "règle": "cotisations . retraite complémentaire . employeur . taux T1",
        "par": "4.45%"
      },
      {
        "règle": "cotisations . retraite complémentaire . employeur . taux T2",
        "par": "10.80%"
      },
      {
        "règle": "cotisations . retraite complémentaire . salarié . taux T1",
        "par": "4.44%"
      },
      {
        "règle": "cotisations . retraite complémentaire . salarié . taux T2",
        "par": "10.79%"
      }
    ],
    "références": {
      "audiens.org": "https://www.audiens.org/solutions/entreprises-la-retraite-complementaire-agirc-arcco-au-1er-janvier-2019.html"
    }
  },
  "salarié . régimes spécifiques . intermittents du spectacle . artiste . activité accessoire": {
    "question": "L'artiste est-il rémunéré pour une activité accessoire (dispense de cours, stages, etc) ?\n",
    "par défaut": "non"
  },
  "salarié . régimes spécifiques . intermittents du spectacle . artiste . réduction de taux": {
    "rend non applicable": "cotisations . exonérations . réduction générale",
    "non applicable si": "activité accessoire",
    "remplace": [
      {
        "règle": "cotisations . maladie . employeur . taux",
        "par": "cotisations . maladie . employeur . taux * réduction de taux"
      },
      {
        "règle": "cotisations . maladie . salarié . taux",
        "par": "cotisations . maladie . salarié . taux * réduction de taux"
      },
      {
        "règle": "cotisations . vieillesse . employeur . plafonnée . taux",
        "par": "cotisations . vieillesse . employeur . plafonnée . taux * réduction de taux"
      },
      {
        "règle": "cotisations . vieillesse . employeur . déplafonnée . taux",
        "par": "cotisations . vieillesse . employeur . déplafonnée . taux * réduction de taux"
      },
      {
        "règle": "cotisations . vieillesse . salarié . plafonnée . taux",
        "par": "cotisations . vieillesse . salarié . plafonnée . taux * réduction de taux"
      },
      {
        "règle": "cotisations . vieillesse . salarié . déplafonnée . taux",
        "par": "cotisations . vieillesse . salarié . déplafonnée . taux * réduction de taux"
      },
      {
        "règle": "cotisations . allocations familiales . taux",
        "par": "cotisations . allocations familiales . taux * réduction de taux"
      },
      {
        "règle": "cotisations . versement mobilité",
        "par": "cotisations . versement mobilité * réduction de taux"
      },
      {
        "règle": "cotisations . FNAL . taux",
        "par": "cotisations . FNAL . taux * réduction de taux"
      }
    ],
    "formule": "70%"
  },
  "salarié . régimes spécifiques . intermittents du spectacle . artiste . réduction de taux . ATMP": {
    "remplace": "cotisations . ATMP . taux",
    "formule": {
      "variations": [
        {
          "si": "régimes spécifiques . alsace moselle",
          "alors": "1.54%"
        },
        {
          "sinon": "1.12%"
        }
      ]
    }
  },
  "salarié . régimes spécifiques . intermittents du spectacle . artiste . nombre jours travaillés": {
    "question": "Pour combien de jours continus l'artiste est-il engagé ?",
    "par défaut": "5 jours"
  },
  "salarié . régimes spécifiques . intermittents du spectacle . artiste . plafond proratisé": {
    "applicable si": "nombre jours travaillés < 5",
    "unité": "€/mois",
    "remplace": {
      "règle": "plafond sécurité sociale",
      "dans": [
        "cotisations . FNAL",
        "cotisations . vieillesse"
      ]
    },
    "formule": {
      "produit": {
        "assiette": "plafond sécurité sociale . horaire",
        "facteur": "12 * nombre jours travaillés"
      }
    }
  },
  "salarié . régimes spécifiques . intermittents du spectacle . artiste . acteur de complément": {
    "non applicable si": "activité accessoire",
    "question": "L'artiste est-il un acteur de complément engagé à la journée pour une production cinématographique ?",
    "par defaut": "non"
  },
  "salarié . régimes spécifiques . intermittents du spectacle . artiste . acteur de complément . nombre jours travaillés": {
    "remplace": "artiste . nombre jours travaillés",
    "formule": 1
  },
  "salarié . régimes spécifiques . intermittents du spectacle . artiste . acteur de complément . assiette forfaitaire": {
    "applicable si": "rémunération . brut < 6% * plafond sécurité sociale",
    "remplace": [
      "salarié . cotisations . assiette forfaitaire",
      {
        "règle": "nombre jours travaillés",
        "par": 1
      }
    ],
    "formule": {
      "produit": {
        "assiette": "SMIC . horaire",
        "facteur": 9
      }
    }
  },
  "salarié . convention collective . sport": {
    "formule": "convention collective = 'sport'",
    "titre": "Sport",
    "icônes": "🎽",
    "description": "L'entreprise dépend de la convention collective nationale des sportifs (CCNS)\nLes disciplines concernées sont tous les sports pour lesquels il existe une fédération française agréée par le ministère de la Jeunesse et des Sports.\n"
  },
  "salarié . convention collective . sport . cotisations": "oui",
  "salarié . convention collective . sport . cotisations . employeur": {
    "remplace": "salarié . cotisations . employeur",
    "somme": [
      "salarié . cotisations . employeur",
      "financement du paritarisme"
    ]
  },
  "salarié . convention collective . sport . cotisations . financement du paritarisme": {
    "non applicable si": "entreprise . salariés . effectif = 0",
    "note": "se calcule sur la masse salariale",
    "formule": {
      "produit": {
        "assiette": "cotisations . assiette",
        "taux": "0.06%"
      },
      "plancher": "3 €.employé/an / entreprise . salariés . effectif"
    }
  },
  "salarié . convention collective . sport . cotisations . prévoyance": {
    "produit": {
      "assiette": {
        "valeur": "cotisations . assiette",
        "plafond": "8 * temps de travail . plafond sécurité sociale"
      },
      "composantes": [
        {
          "attributs": {
            "remplace": "cotisations . prévoyances . conventionnelle . employeur",
            "nom": "employeur"
          },
          "taux": "0.29%"
        },
        {
          "attributs": {
            "remplace": "cotisations . prévoyances . conventionnelle . salarié",
            "nom": "salarié"
          },
          "taux": "0.29%"
        }
      ]
    },
    "références": {
      "Article 10.8 de la CCNS (IDCC 2511)": "https://www.legifrance.gouv.fr/affichIDCCArticle.do;?idArticle=KALIARTI000033304755&cidTexte=KALITEXT000017577657&dateTexte=29990101&categorieLien=id"
    }
  },
  "salarié . convention collective . sport . cotisations . régime frais de santé": {
    "remplace": "cotisations . prévoyances . santé . montant",
    "produit": {
      "assiette": "plafond sécurité sociale",
      "taux": "taux"
    }
  },
  "salarié . convention collective . sport . cotisations . régime frais de santé . taux": {
    "variations": [
      {
        "si": "régimes spécifiques . alsace moselle",
        "alors": {
          "variations": [
            {
              "si": "option . R1",
              "alors": "0.59%"
            },
            {
              "si": "option . R2",
              "alors": "0.77%"
            },
            {
              "si": "option . R3",
              "alors": "0.89%"
            }
          ]
        }
      },
      {
        "sinon": {
          "variations": [
            {
              "si": "option . R1",
              "alors": "0.92%"
            },
            {
              "si": "option . R2",
              "alors": "1.17%"
            },
            {
              "si": "option . R3",
              "alors": "1.32%"
            }
          ]
        }
      }
    ],
    "référence": {
      "unamens.fr": "https://www.umanens.fr/reglementation-couverture-sante-obligatoire/ccn-sport",
      "unamens (notice pdf)": "https://www.umanens.fr/documents/doc-offres-2018/sport/juin-2019/CCN_SPORT_PLAQ_EMPLOYEUR_2019.pdf"
    }
  },
  "salarié . convention collective . sport . cotisations . régime frais de santé . option": {
    "question": "Quel option a été choisi pour le régime des frais de santé ?",
    "formule": {
      "une possibilité": {
        "choix obligatoire": "oui",
        "possibilités": [
          "R1",
          "R2",
          "R3"
        ]
      }
    },
    "par défaut": "'R1'",
    "références": {
      "unamens.fr": "https://www.umanens.fr/reglementation-couverture-sante-obligatoire/ccn-sport"
    }
  },
  "salarié . convention collective . sport . cotisations . régime frais de santé . option . R1": {
    "formule": "option = 'R1'"
  },
  "salarié . convention collective . sport . cotisations . régime frais de santé . option . R2": {
    "formule": "option = 'R2'"
  },
  "salarié . convention collective . sport . cotisations . régime frais de santé . option . R3": {
    "formule": "option = 'R3'"
  },
  "salarié . convention collective . sport . cotisations . formation professionnelle": {
    "remplace": "cotisations . formation professionnelle",
    "formule": {
      "somme": [
        "plan de formation",
        "professionnalisation",
        "CIF CDI",
        "CIF CDD"
      ]
    },
    "références": {
      "Article 8.6 de la CCNS (IDCC2511)": "https://www.legifrance.gouv.fr/affichIDCCArticle.do;?idArticle=KALIARTI000034406905&cidTexte=KALITEXT000017577657&dateTexte=29990101&categorieLien=id"
    }
  },
  "salarié . convention collective . sport . cotisations . formation professionnelle . plan de formation": {
    "formule": {
      "produit": {
        "assiette": "cotisations . assiette",
        "taux": {
          "variations": [
            {
              "si": "entreprise . salariés . effectif < 20",
              "alors": "1.45%"
            },
            {
              "si": "entreprise . salariés . effectif >= 20",
              "alors": "0.90%"
            }
          ]
        }
      },
      "plancher": "versement minimum"
    }
  },
  "salarié . convention collective . sport . cotisations . formation professionnelle . plan de formation . versement minimum": {
    "applicable si": "entreprise . salariés . effectif < 10",
    "formule": "30 €/mois"
  },
  "salarié . convention collective . sport . cotisations . formation professionnelle . professionnalisation": {
    "formule": {
      "produit": {
        "assiette": "cotisations . assiette",
        "taux": {
          "variations": [
            {
              "si": "entreprise . salariés . effectif < 20",
              "alors": "0.15%"
            },
            {
              "si": "entreprise . salariés . effectif >= 20",
              "alors": "0.50%"
            }
          ]
        }
      },
      "plancher": "versement minimum"
    }
  },
  "salarié . convention collective . sport . cotisations . formation professionnelle . professionnalisation . versement minimum": {
    "applicable si": "entreprise . salariés . effectif < 10",
    "formule": "5 €/mois"
  },
  "salarié . convention collective . sport . cotisations . formation professionnelle . CIF CDI": {
    "applicable si": {
      "toutes ces conditions": [
        "contrat . CDI",
        "entreprise . salariés . effectif >= 20"
      ]
    },
    "formule": {
      "produit": {
        "assiette": "cotisations . assiette",
        "taux": "0.20%"
      }
    }
  },
  "salarié . convention collective . sport . cotisations . formation professionnelle . CIF CDD": {
    "applicable si": "contrat . CDD",
    "formule": {
      "produit": {
        "assiette": "cotisations . assiette",
        "taux": "1%"
      }
    }
  },
  "salarié . convention collective . sport . cotisations . assiette franchisée": {
    "formule": {
      "valeur": "cotisations . assiette",
      "abattement": "franchise"
    }
  },
  "salarié . convention collective . sport . joueur entraineur": {
    "question": "Le joueur est-il aussi entraineur ?",
    "par défaut": "non"
  },
  "salarié . convention collective . sport . exonération cotisation AT": {
    "non applicable si": {
      "une de ces conditions": [
        "joueur entraineur",
        "refus"
      ]
    },
    "rend non applicable": "cotisations . ATMP"
  },
  "salarié . convention collective . sport . exonération cotisation AT . refus": {
    "titre": "refus exonération AT",
    "question": "L'employeur a-t'il refusé d'être exonéré de cotisations AT ?",
    "par défaut": "non"
  },
  "salarié . convention collective . sport . cotisations . assiette forfaitaire": {
    "applicable si": "assiette franchisée < SMIC . horaire * 115 heures/mois",
    "remplace": "salarié . cotisations . assiette forfaitaire",
    "formule": {
      "grille": {
        "assiette": "assiette franchisée",
        "multiplicateur": "SMIC . horaire / 1 mois",
        "unité": "€/mois",
        "tranches": [
          {
            "montant": "5 * SMIC . horaire",
            "plafond": "45 heures"
          },
          {
            "montant": "15 * SMIC . horaire",
            "plafond": "60 heures"
          },
          {
            "montant": "25 * SMIC . horaire",
            "plafond": "80 heures"
          },
          {
            "montant": "35 * SMIC . horaire",
            "plafond": "100 heures"
          },
          {
            "montant": "50 * SMIC . horaire",
            "plafond": "115 heures"
          }
        ]
      }
    }
  },
  "salarié . convention collective . sport . primes . nombre de manifestations": {
    "question": "Combien de manifestations rémunérées le joueur a-t'il effectué ?",
    "par défaut": "0 manifestations"
  },
  "salarié . convention collective . sport . primes": {
    "titre": "primes de manifestation",
    "remplace": "rémunération . primes . activité . conventionnelles",
    "unité": "€/mois",
    "formule": {
      "somme": [
        "manifestation 1",
        "manifestation 2",
        "manifestation 3",
        "manifestation 4",
        "manifestation 5",
        "autres manifestations"
      ]
    }
  },
  "salarié . convention collective . sport . primes . manifestation 1": {
    "question": "Quelle prime pour la première manifestation ?",
    "applicable si": "nombre de manifestations > 0",
    "par défaut": "100 €"
  },
  "salarié . convention collective . sport . primes . manifestation 1 . franchise": {
    "titre": "franchise manifestation 1",
    "formule": {
      "valeur": "manifestation 1",
      "plafond": "70% * plafond sécurité sociale . journalier"
    }
  },
  "salarié . convention collective . sport . primes . manifestation 2": {
    "question": "Quelle prime pour la deuxième manifestation ?",
    "applicable si": "nombre de manifestations > 1",
    "par défaut": "100 €"
  },
  "salarié . convention collective . sport . primes . manifestation 2 . franchise": {
    "titre": "franchise manifestation 2",
    "formule": {
      "valeur": "manifestation 2",
      "plafond": "70% * plafond sécurité sociale . journalier"
    }
  },
  "salarié . convention collective . sport . primes . manifestation 3": {
    "question": "Quelle prime pour la troisième manifestation ?",
    "applicable si": "nombre de manifestations > 2",
    "par défaut": "100 €"
  },
  "salarié . convention collective . sport . primes . manifestation 3 . franchise": {
    "titre": "franchise manifestation 3",
    "formule": {
      "valeur": "manifestation 3",
      "plafond": "70% * plafond sécurité sociale . journalier"
    }
  },
  "salarié . convention collective . sport . primes . manifestation 4": {
    "question": "Quelle prime pour la quatrième manifestation ?",
    "applicable si": "nombre de manifestations > 3",
    "par défaut": "100 €"
  },
  "salarié . convention collective . sport . primes . manifestation 4 . franchise": {
    "titre": "franchise manifestation 4",
    "formule": {
      "valeur": "manifestation 4",
      "plafond": "70% * plafond sécurité sociale . journalier"
    }
  },
  "salarié . convention collective . sport . primes . manifestation 5": {
    "question": "Quelle prime pour la cinquième manifestation ?",
    "applicable si": "nombre de manifestations > 4",
    "par défaut": "100 €"
  },
  "salarié . convention collective . sport . primes . manifestation 5 . franchise": {
    "titre": "franchise manifestation 5",
    "formule": {
      "valeur": "manifestation 5",
      "plafond": "70% * plafond sécurité sociale . journalier"
    }
  },
  "salarié . convention collective . sport . primes . autres manifestations": {
    "question": "Quelles primes pour les autres manifestations ?",
    "applicable si": "nombre de manifestations > 5",
    "par défaut": "100 €"
  },
  "salarié . convention collective . sport . cotisations . franchise": {
    "applicable si": "entreprise . salariés . effectif < 10",
    "unité": "€/mois",
    "formule": {
      "somme": [
        "primes . manifestation 1 . franchise",
        "primes . manifestation 2 . franchise",
        "primes . manifestation 3 . franchise",
        "primes . manifestation 4 . franchise",
        "primes . manifestation 5 . franchise"
      ]
    }
  },
  "salarié . cotisations": {
    "description": "Total des cotisations et contributions à la sécurité sociales versées pour ce salarié. Il comprends une part employeur et une part employé.",
    "somme": [
      {
        "nom": "employeur",
        "titre": "part employeur",
        "somme": [
          "maladie . employeur",
          "CSA",
          "ATMP",
          "vieillesse . employeur",
          "retraite complémentaire . employeur",
          "CEG . employeur",
          "CET . employeur",
          "allocations familiales",
          "chômage . employeur",
          "APEC . employeur",
          "AGS",
          "FNAL",
          "PEEC",
          "contribution au dialogue social",
          "formation professionnelle",
          "versement mobilité",
          "taxe d'apprentissage",
          "CPF CDD",
          "forfait social",
          "prévoyances . employeur"
        ],
        "abattement": "exonérations . employeur"
      },
      {
        "nom": "salarié",
        "titre": "part salarié",
        "somme": [
          "vieillesse . salarié",
          "maladie . salarié",
          "retraite complémentaire . salarié",
          "CEG . salarié",
          "chômage . salarié",
          "CSG-CRDS",
          "APEC . salarié",
          "prévoyances . salarié"
        ],
        "abattement": "exonérations . salarié"
      }
    ]
  },
  "salarié . cotisations . exonérations": {
    "titre": "Réductions et exonérations",
    "formule": {
      "somme": [
        {
          "nom": "employeur",
          "titre": "part employeur",
          "description": "À l'exception de la déduction heure supplémentaire, les dispositifs de réduction de cotisations patronales sont mutuellement exclusif.",
          "somme": [
            "heures supplémentaires . employeur",
            {
              "le maximum de": [
                "réduction générale",
                "lodeom . montant",
                "JEI . montant"
              ]
            }
          ],
          "références": {
            "urssaf.fr (cumul réduction générale)": "https://www.urssaf.fr/portail/home/employeur/beneficier-dune-exoneration/exonerations-generales/la-reduction-generale/les-regles-relatives-au-cumul.html",
            "urssaf.fr (cumul JEI)": "https://www.urssaf.fr/portail/home/employeur/beneficier-dune-exoneration/exonerations-ou-aides-liees-au-s/jeunes-entreprises-innovantes/regles-de-cumul.html"
          }
        },
        {
          "nom": "salarié",
          "titre": "part salarié",
          "valeur": "heures supplémentaires . salarié"
        }
      ]
    }
  },
  "salarié . cotisations . exonérations . heures supplémentaires": {
    "somme": [
      {
        "nom": "salarié",
        "non applicable si": "assiette = 0",
        "titre": "réduction de cotisations heures supplémentaires",
        "produit": {
          "assiette": "rémunération . heures supplémentaires",
          "taux": {
            "nom": "taux des cotisations réduites",
            "description": "le taux effectif des cotisations d'assurance vieillesse à la charge du salarié",
            "unité": "%",
            "produit": {
              "assiette": {
                "somme": [
                  "vieillesse . salarié",
                  "retraite complémentaire . salarié",
                  "CEG . salarié"
                ]
              },
              "facteur": "1 / assiette"
            },
            "plafond": "11.31%"
          }
        },
        "références": {
          "urssaf.fr": "https://www.urssaf.fr/portail/home/employeur/beneficier-dune-exoneration/exonerations-generales/la-reduction-de-cotisations-sala/modalites-de-calcul-et-de-declar.html",
          "Circulaire DSS/5B/2019/71": "http://circulaire.legifrance.gouv.fr/pdf/2019/04/cir_44492.pdf",
          "Code de la sécurité sociale - Article D241-21": "https://www.legifrance.gouv.fr/affichCodeArticle.do?idArticle=LEGIARTI000038056813&cidTexte=LEGITEXT000006073189"
        }
      },
      {
        "nom": "employeur",
        "applicable si": "entreprise . salariés . effectif < 250",
        "titre": "déduction forfaitaire pour heures supplémentaires",
        "produit": {
          "assiette": "temps de travail . heures supplémentaires",
          "facteur": {
            "variations": [
              {
                "si": "entreprise . salariés . effectif >= 20",
                "alors": {
                  "applicable si": "date >= 10/2022",
                  "valeur": "0.50 €/heures"
                }
              },
              {
                "sinon": "1.50 €/heures"
              }
            ]
          }
        },
        "note": "La déduction ne s’applique pas aux heures complémentaires",
        "références": {
          "La déduction forfaitaire patronale pour heures supplémentaires": "https://www.urssaf.fr/portail/home/employeur/beneficier-dune-exoneration/exonerations-generales/la-deduction-forfaitaire-patrona/employeurs-concernes.html",
          "Heures supplémentaires : une nouvelle exonération pour les entreprises de 20 à 249 salariés": "https://www.urssaf.fr/portail/home/actualites/toute-lactualite-employeur/heures-supplementaires--une-nouv.html"
        }
      }
    ]
  },
  "salarié . cotisations . exonérations . lodeom": {
    "experimental": "oui",
    "applicable si": {
      "par défaut": "non",
      "nom": "zone un",
      "titre": "Zone géographique 1 (Guadeloupe, Martinique, La Réunion, Guyane)",
      "références": {
        "fiche Urssaf": "https://www.urssaf.fr/portail/home/outre-mer/employeur/exoneration-de-cotisations-di-1/employeurs-situes-en-guadeloupe.html"
      },
      "une de ces conditions": [
        "établissement . commune . département = 'Guadeloupe'",
        "établissement . commune . département = 'La Réunion'",
        "établissement . commune . département = 'Martinique'",
        "établissement . commune . département = 'Guyane'"
      ]
    },
    "description": "Un ensemble assez complexe de réductions de cotisation est disponible pour les salariés d'outre-mer.\nLeur fonctionnement est similaire à celui de la réduction générale sur les bas salaires : pour un certain salaire donné, 100% de réduction.\nPour un autre salaire plus élevé, 0% de réduction. Entre les deux, on trace une ligne droite.\n",
    "avec": {
      "barème compétitivité": {
        "titre": "Eligibilité au barème de compétitivité",
        "non applicable si": {
          "une de ces conditions": [
            "barème compétitivité renforcée",
            "barème innovation et croissance"
          ]
        },
        "une de ces conditions": [
          "entreprise . salariés . effectif < 11",
          {
            "nom": "secteurs d'activité éligible",
            "question": "Votre entreprise appartient-elle à l'un des secteurs éligible LODEOM ?",
            "description": "Pour être éligible au 1er barème de l'exonération LODEOM, dit barème de compétitivité, votre entreprise doit appartenir à l'un des secteurs suivants :\n\n- ✈ transport aérien assurant les liaisons entre les départements et régions d’Outre-mer et entre la métropole et ces territoires, ainsi que les dessertes intérieures\n- ⛵ dessertes maritimes, fluviales ou les liaisons entre départements et régions d’Outre-mer\n- 🏗 bâtiment et travaux publics\n- 📰 la presse\n- 🎥 la production audiovisuelle\n- les secteurs éligibles aux régimes de compétitivité renforcée (barème 2) ou d’innovation et de croissance (barème 3), qui ne respectent pas les conditions d’effectifs (moins de 250 salariés) ou de chiffres d’affaires annuel (moins de 50 millions d’euros).\n",
            "par défaut": "non",
            "références": {
              "Fiche Urssaf": "https://www.urssaf.fr/portail/home/outre-mer/employeur/exoneration-de-cotisations-di-1/employeurs-situes-en-guadeloupe/bareme-dit-de-competitivite.html"
            }
          }
        ]
      },
      "barème compétitivité renforcée": {
        "applicable si": "entreprise . salariés . effectif < 250",
        "non applicable si": "barème innovation et croissance",
        "question": "Êtes-vous éligibles au barème compétitivité renforcée ?",
        "description": "- Chiffre d'affaires de moins de 50 millions d'euros\n- Les employeurs relevant des secteurs de l’industrie, de la restauration, de l’environnement, de l’agro nutrition, des énergies renouvelables, des nouvelles technologies de l’information et de la communication et des centres d’appel, de la pêche, des cultures marines, de l’aquaculture, de l’agriculture, du tourisme y compris les activités de loisirs s’y rapportant, du nautisme, de l’hôtellerie, de la recherche et du développement ;\n- Les entreprises bénéficiaires du régime de perfectionnement actif défini à l’article 256 du règlement (UE) n° 952/2013 du parlement européen et du conseil du 9 octobre 2013 établissant le code des douanes de l’Union\n- En Guyane, les employeurs ayant une activité principale relevant de l’un des secteurs d’activité éligibles à la réduction d’impôt prévue à l’article 199 undecies B du code général des impôts, ou correspondant à l’une des activités suivantes : comptabilité, conseil aux entreprises, ingénierie ou études techniques.\n",
        "par défaut": "non",
        "références": {
          "Fiche Urssaf": "https://www.urssaf.fr/portail/home/outre-mer/employeur/exoneration-de-cotisations-di-1/employeurs-situes-en-guadeloupe/bareme-dit-de-competitivite-renf.html"
        }
      },
      "barème innovation et croissance": {
        "applicable si": "entreprise . salariés . effectif < 250",
        "question": "Êtes-vous éligibles au barème innovation et croissance ?",
        "description": "- Sont éligibles à ce barème les employeurs occupant moins de 250 salariés et ayant réalisé un chiffre d’affaires annuel inférieur à 50 millions d’euros, au titre de la rémunération des salariés concourant essentiellement à la réalisation de projets innovants dans le domaine des technologies de l’information et de la communication.\n- Les projets innovants se définissent comme des projets ayant pour but l’introduction d’un bien, d’un service, d’une méthode de production ou de distribution nouveau ou sensiblement amélioré sur le plan des caractéristiques et de l’usage auquel il est destiné. Ces projets doivent être réalisés dans les domaines suivants :\n  - 📱 télécommunication ;\n  - informatique, dont notamment programmation, conseil en systèmes et logiciels, tierce maintenance de systèmes et d’applications, gestion d‘installations, traitement des données, hébergement et activités connexes ;\n  - édition de portails internet et de logiciels;\n  - infographie, notamment conception de contenus visuels et numériques ;\n  - conception d’objets connectés.\n- Si ces conditions sont réunies, l’exonération s’applique aux rémunérations versées aux salariés occupés principalement à la réalisation de projets innovants.\n- Sont donc exclues les fonctions supports : tâches administratives financières, logistiques et de ressources humaines.\n",
        "par défaut": "non",
        "références": {
          "Fiche Urssaf": "https://www.urssaf.fr/portail/home/outre-mer/employeur/exoneration-de-cotisations-di-1/employeurs-situes-en-guadeloupe/bareme-dit-innovation-et-croissa.html"
        }
      }
    }
  },
  "salarié . cotisations . exonérations . lodeom . montant": {
    "rend non applicable": "réduction générale",
    "références": {
      "Estimateur Urssaf": "https://www.urssaf.fr/portail/home/utile-et-pratique/estimateur-exoneration-lodeom.html?ut="
    },
    "produit": {
      "assiette": "cotisations . assiette",
      "facteur": "coefficient"
    },
    "avec": {
      "coefficient": {
        "non applicable si": "cotisations . assiette = 0",
        "privé": "oui",
        "variations": [
          {
            "si": "barème compétitivité",
            "alors": "1.3 * T / 0.9 * (2.2 * temps de travail . SMIC / cotisations . assiette - 1)"
          },
          {
            "si": "barème compétitivité renforcée",
            "alors": "2 * T / 0.7 * (2.7 * temps de travail . SMIC / cotisations . assiette - 1)"
          },
          {
            "si": "barème innovation et croissance",
            "alors": "1.7 * T * (3.5 * temps de travail . SMIC / cotisations . assiette - 1)"
          }
        ],
        "plancher": "0%",
        "arrondi": "4 décimales",
        "références": {
          "urssaf.fr": "https://www.urssaf.fr/portail/home/employeur/beneficier-dune-exoneration/exonerations-generales/la-reduction-generale/le-calcul-de-la-reduction/etape-1--determination-du-coeffi.html",
          "Code de la sécurité sociale": "https://www.legifrance.gouv.fr/affichCodeArticle.do?idArticle=LEGIARTI000025103779&cidTexte=LEGITEXT000006073189"
        }
      },
      "imputation sécurité sociale": {
        "privé": "oui",
        "produit": {
          "assiette": "réduction générale",
          "facteur": "T . sécurité sociale et chômage / T"
        }
      },
      "imputation retraite complémentaire": {
        "privé": "oui",
        "valeur": "réduction générale - imputation sécurité sociale"
      }
    }
  },
  "salarié . cotisations . exonérations . JEI": {
    "question": {
      "variations": [
        {
          "si": "dirigeant",
          "alors": {
            "texte": "Bénéficiez-vous de l'exonération Jeune Entreprise Innovante (JEI) ?"
          }
        },
        {
          "sinon": {
            "texte": "Le salarié bénéficie-t-il de l'exonération Jeune Entreprise Innovante (JEI) ?"
          }
        }
      ]
    },
    "description": "Le statut de jeune entreprise innovante (JEI) a été créé par la loi de finances pour 2004 et permet aux PME de moins de 8 ans consacrant 15% au moins de leurs charges à de la Recherche et Développement de bénéficier d'une exonération de cotisations sociales.\n\nL’exonération peut s’appliquer sur les rémunérations versées :\n- aux salariés pour lesquels l’employeur est soumis à l’obligation d’assurance chômage\n- aux mandataires sociaux qui participent, à titre principal, au projet de recherche et de développement de l’entreprise\n\nPar simplification, le bénéfice de l’exonération au titre d’un salarié sera considéré comme acquis dès lors que la moitié de son temps de travail au moins est consacrée à un ou des projets de recherche et de développement et l’exonération ne pourra être remise en cause.",
    "par défaut": "non",
    "rend non applicable": [
      "réduction générale",
      "allocations familiales . taux réduit",
      "salarié . cotisations . maladie . employeur . taux réduit",
      "lodeom"
    ]
  },
  "salarié . cotisations . exonérations . JEI . montant": {
    "titre": "Exonération JEI",
    "description": "Exonération pour les jeunes entreprises innovantes (JEI).\n",
    "références": {
      "description": "https://www.service-public.fr/professionnels-entreprises/vosdroits/F31188",
      "calcul": "https://www.urssaf.fr/portail/home/employeur/beneficier-dune-exoneration/exonerations-ou-aides-liees-au-s/jeunes-entreprises-innovantes/quelle-exoneration.html",
      "cumuls": "https://www.legisocial.fr/actualites-sociales/2068-comment-declarer-les-cotisations-dallocations-familiales-si-lentreprise-beneficie-du-regime-jei.html"
    },
    "unité": "€/mois",
    "somme": [
      "allocations familiales",
      "maladie . employeur",
      "vieillesse . employeur"
    ],
    "plafond": {
      "recalcul": {
        "avec": {
          "contrat . salaire brut": "4.5 * temps de travail . SMIC"
        }
      }
    }
  },
  "salarié . cotisations . exonérations . réduction générale": {
    "description": "Dans le cadre du pacte de responsabilité et de solidarité, le dispositif zéro cotisation Urssaf permet à l'employeur d'un salarié au Smic de ne plus payer aucune cotisation. Le montant de l'allègement est égal au produit de la rémunération annuelle brute par un coefficient. Il n'y a pas de formalité particulière à effectuer.\n",
    "références": {
      "description": "https://www.service-public.fr/professionnels-entreprises/vosdroits/F24542",
      "urssaf.fr": "https://www.urssaf.fr/portail/home/employeur/beneficier-dune-exoneration/exonerations-generales/la-reduction-generale.html",
      "calcul": "https://www.urssaf.fr/portail/home/employeur/beneficier-dune-exoneration/exonerations-generales/la-reduction-generale/le-calcul-de-la-reduction.html",
      "cumuls": "https://www.legisocial.fr/actualites-sociales/2068-comment-declarer-les-cotisations-dallocations-familiales-si-lentreprise-beneficie-du-regime-jei.html"
    },
    "produit": {
      "assiette": "cotisations . assiette",
      "facteur": "coefficient"
    },
    "plafond": "plafond avec application de la DFS",
    "non applicable si": "cotisations . assiette = 0",
    "avec": {
      "coefficient": {
        "privé": "oui",
        "produit": {
          "assiette": "temps de travail . SMIC / cotisations . assiette * 1.6 - 1",
          "facteur": "T / 0.6"
        },
        "plancher": "0%",
        "plafond": "T",
        "arrondi": "4 décimales",
        "références": {
          "urssaf.fr": "https://www.urssaf.fr/portail/home/employeur/beneficier-dune-exoneration/exonerations-generales/la-reduction-generale/le-calcul-de-la-reduction/etape-1--determination-du-coeffi.html",
          "Code de la sécurité sociale": "https://www.legifrance.gouv.fr/affichCodeArticle.do?idArticle=LEGIARTI000025103779&cidTexte=LEGITEXT000006073189"
        }
      },
      "imputation sécurité sociale": {
        "privé": "oui",
        "produit": {
          "assiette": "réduction générale",
          "facteur": "T . sécurité sociale et chômage / T"
        }
      },
      "imputation retraite complémentaire": {
        "privé": "oui",
        "valeur": "réduction générale - imputation sécurité sociale"
      },
      "plafond avec application de la DFS": {
        "privé": "oui",
        "applicable si": "régimes spécifiques . DFS",
        "unité": "€/mois",
        "produit": {
          "taux": "130%",
          "assiette": {
            "recalcul": {
              "règle": "réduction générale",
              "avec": {
                "régimes spécifiques . DFS": "non"
              }
            }
          }
        }
      }
    }
  },
  "salarié . cotisations . exonérations . T": {
    "privé": "oui",
    "titre": "Coefficient T",
    "unité": "%",
    "somme": [
      "sécurité sociale et chômage",
      {
        "valeur": "retraite complémentaire . employeur . taux T1",
        "plafond": "4.72%"
      },
      {
        "valeur": "CEG . employeur . taux T1",
        "plafond": "1.29%"
      }
    ],
    "avec": {
      "sécurité sociale et chômage": {
        "somme": [
          "maladie . employeur . taux",
          "allocations familiales . taux",
          "vieillesse . employeur . déplafonnée . taux",
          "vieillesse . employeur . plafonnée . taux",
          "CSA . taux",
          "ATMP . taux minimum",
          "FNAL . taux",
          "chômage . employeur . taux"
        ]
      }
    }
  },
  "salarié . cotisations . assiette": {
    "description": "L'assiette des cotisations sociales est la base de calcul d'un grand nombre de cotisations sur le travail salarié. Elle comprend notamment les rémunérations en espèces (salaire de base, indemnité, primes...) et les avantages en nature (logement, véhicule...).\n",
    "références": {
      "Fiche Urssaf": "https://www.urssaf.fr/portail/home/employeur/calculer-les-cotisations/la-base-de-calcul.html"
    },
    "somme": [
      {
        "nom": "sans prévoyance",
        "description": "L'assiette des cotisations avant la réintégration de la part non déductible de la prévoyance employeur. C'est elle qui sert de base au calcul des prévoyances proportionnelles au revenu.",
        "valeur": "rémunération . brut",
        "abattement": {
          "somme": [
            "rémunération . frais professionnels . déductible",
            "contrat . stage . gratification minimale"
          ]
        }
      },
      "prévoyances . employeur . non déductible socialement"
    ]
  },
  "salarié . cotisations . CPF CDD": {
    "description": "Contribution au financement du compte personnel de formation (CPF) spécifique aux CDD.",
    "applicable si": "contrat . CDD",
    "non applicable si": {
      "une de ces conditions": [
        "contrat . apprentissage",
        "contrat . CDD . motif = 'classique . saisonnier'",
        "contrat . CDD . motif . contrat aidé"
      ]
    },
    "produit": {
      "assiette": "cotisations . assiette",
      "taux": "1%"
    },
    "références": {
      "Code du travail - Article L6322-37": "https://www.legifrance.gouv.fr/affichCodeArticle.do?idArticle=LEGIARTI000022234996&cidTexte=LEGITEXT000006072050"
    }
  },
  "salarié . cotisations . CEG": {
    "titre": "contribution d'équilibre général",
    "description": "Cette cotisation créée en 2019 permet à la fois de compenser les charges résultant des départs à la retraite avant 67 ans et d’honorer les engagements retraite des personnes qui ont cotisé à la GMP, une ancienne cotisation de compensation pour les cadres.",
    "acronyme": "CEG",
    "cotisation": {
      "branche": "retraite"
    },
    "barème": {
      "assiette": "cotisations . assiette",
      "multiplicateur": "temps de travail . plafond sécurité sociale",
      "composantes": [
        {
          "attributs": {
            "nom": "employeur",
            "titre": "part employeur"
          },
          "tranches": [
            {
              "taux": {
                "valeur": "1.29%",
                "nom": "taux T1"
              },
              "plafond": 1
            },
            {
              "taux": "1.62%",
              "plafond": 8
            }
          ]
        },
        {
          "attributs": {
            "nom": "salarié",
            "titre": "part salarié"
          },
          "tranches": [
            {
              "taux": "0.86%",
              "plafond": 1
            },
            {
              "taux": "1.08%",
              "plafond": 8
            }
          ]
        }
      ]
    },
    "références": {
      "Comment calculer les cotisations de retraite complémentaire": "https://www.agirc-arrco.fr/mon-entreprise/calculer-et-declarer/calculer-les-cotisations-de-retraite-complementaire/"
    }
  },
  "salarié . cotisations . CET": {
    "titre": "contribution d'équilibre technique",
    "acronyme": "CET",
    "cotisation": {
      "branche": "retraite"
    },
    "applicable si": "cotisations . assiette > temps de travail . plafond sécurité sociale",
    "produit": {
      "assiette": "cotisations . assiette",
      "plafond": "8 * temps de travail . plafond sécurité sociale",
      "composantes": [
        {
          "attributs": {
            "nom": "employeur",
            "titre": "part employeur"
          },
          "taux": {
            "nom": "taux",
            "valeur": "0.21%"
          }
        },
        {
          "attributs": {
            "nom": "salarié",
            "titre": "part salarié"
          },
          "taux": "0.14%"
        }
      ]
    },
    "références": {
      "Comment calculer les cotisations de retraite complémentaire": "https://www.agirc-arrco.fr/mon-entreprise/calculer-et-declarer/calculer-les-cotisations-de-retraite-complementaire/"
    }
  },
  "salarié . cotisations . retraite complémentaire": {
    "cotisation": {
      "branche": "retraite"
    },
    "description": "Cotisations de retraite complémentaire.\n",
    "barème": {
      "assiette": "cotisations . assiette",
      "multiplicateur": "temps de travail . plafond sécurité sociale",
      "composantes": [
        {
          "attributs": {
            "nom": "employeur",
            "titre": "part employeur"
          },
          "tranches": [
            {
              "taux": {
                "valeur": "4.72%",
                "nom": "taux T1"
              },
              "plafond": 1
            },
            {
              "taux": {
                "valeur": "12.95%",
                "nom": "taux T2"
              },
              "plafond": 8
            }
          ]
        },
        {
          "attributs": {
            "nom": "salarié",
            "titre": "part salarié"
          },
          "tranches": [
            {
              "taux": {
                "valeur": "3.15%",
                "nom": "taux T1"
              },
              "plafond": 1
            },
            {
              "taux": {
                "valeur": "8.64%",
                "nom": "taux T2"
              },
              "plafond": 8
            }
          ]
        }
      ]
    },
    "références": {
      "Comment calculer les cotisations de retraite complémentaire": "https://www.agirc-arrco.fr/mon-entreprise/calculer-et-declarer/calculer-les-cotisations-de-retraite-complementaire/",
      "régimes des impatriés": "https://www.legifrance.gouv.fr/affichTexteArticle.do;jsessionid=D2C4F8F0A5E19693ADF9F440120B748A.tplgfr31s_2?idArticle=JORFARTI000038496272&cidTexte=JORFTEXT000038496102&dateTexte=29990101&categorieLien=id"
    }
  },
  "salarié . cotisations . AGS": {
    "titre": "Régime de garanti des salaires (AGS)",
    "description": "Cette cotisations permet de garantir les salaires des employés en cas de difficultés de l'entreprise (sauvegarde, redressement, liquidation). Elle paie les salaires sur les 60 derniers jours de travail. Elle permet de payer des préavis et des indemnités de fin de contrat.",
    "cotisation": {
      "branche": "assurance chômage"
    },
    "references": {
      "calcul": "https://www.service-public.fr/professionnels-entreprises/vosdroits/F31409"
    },
    "produit": {
      "assiette": "cotisations . assiette",
      "taux": "0.15%",
      "plafond": "4 * temps de travail . plafond sécurité sociale"
    }
  },
  "salarié . cotisations . allocations familiales": {
    "cotisation": {
      "dû par": "employeur",
      "branche": "famille"
    },
    "produit": {
      "assiette": "cotisations . assiette",
      "taux": {
        "nom": "taux",
        "variations": [
          {
            "si": "taux réduit",
            "alors": "3.45%"
          },
          {
            "sinon": "5.25%"
          }
        ]
      }
    },
    "références": {
      "calcul": "https://www.urssaf.fr/portail/home/employeur/calculer-les-cotisations/les-taux-de-cotisations/la-cotisation-dallocations-famil.html"
    },
    "avec": {
      "taux réduit": "cotisations . assiette < temps de travail . SMIC * 3.5"
    }
  },
  "salarié . cotisations . APEC": {
    "titre": "Association pour l’emploi des cadres",
    "acronymes": "APEC",
    "description": "Cotisation spécifique aux cadre pour le fonctionnement de l'APEC\n(Association Pour l’Emploi des Cadres)\n",
    "références": {
      "chiffres clés": "http://www.agirc-arrco.fr/l-agirc-et-larrco/chiffres-cles"
    },
    "applicable si": "contrat . statut cadre",
    "produit": {
      "assiette": "cotisations . assiette",
      "plafond": "4 * temps de travail . plafond sécurité sociale",
      "composantes": [
        {
          "attributs": {
            "nom": "employeur",
            "titre": "part employeur"
          },
          "taux": "0.036%"
        },
        {
          "attributs": {
            "nom": "salarié",
            "titre": "part salarié"
          },
          "taux": "0.024%"
        }
      ]
    }
  },
  "salarié . cotisations . chômage": {
    "cotisation": {
      "branche": "assurance chômage"
    },
    "description": "Cotisation d’assurance chômage",
    "références": {
      "Taux de l'assurance chômage et de l'AGS": "https://www.urssaf.fr/portail/home/employeur/calculer-les-cotisations/les-taux-de-cotisations/lassurance-chomage-et-lags/les-taux.html"
    },
    "produit": {
      "assiette": "cotisations . assiette",
      "plafond": "4 * temps de travail . plafond sécurité sociale",
      "composantes": [
        {
          "attributs": {
            "nom": "salarié",
            "titre": "part salarié"
          },
          "taux": {
            "nom": "taux",
            "valeur": "0%"
          }
        },
        {
          "attributs": {
            "nom": "employeur",
            "titre": "part employeur"
          },
          "taux": {
            "nom": "taux",
            "valeur": "4.05%"
          }
        }
      ]
    }
  },
  "salarié . cotisations . ATMP": {
    "experimental": "oui",
    "titre": "Accidents du Travail et Maladies Professionnelles",
    "description": "Cotisation due au titre des Accidents du Travail et Maladies Professionnelles.",
    "produit": {
      "assiette": "cotisations . assiette",
      "taux": {
        "nom": "taux",
        "variations": [
          {
            "si": "taux fonctions support",
            "alors": "taux fonctions support . montant"
          },
          {
            "sinon": "établissement . taux ATMP"
          }
        ]
      }
    },
    "références": {
      "Comment calculer les cotisations accidents du travail et maladies professionnelles (AT/MP) ?": "https://entreprendre.service-public.fr/vosdroits/F33665#:~:text=La%20cotisation%20AT%2FMP%20couvre,Activit%C3%A9%20principale"
    },
    "avec": {
      "taux minimum": {
        "description": "Le taux minimum existant pour la cotisation ATMP. Utilisé notamment pour le calcul de la réduction générale de cotisations",
        "variations": [
          {
            "si": "date >= 01/2022",
            "alors": "0.59%"
          },
          {
            "si": "date >= 01/2021",
            "alors": "0.70 %"
          }
        ],
        "références": {
          "Article D241-2-4": "https://www.legifrance.gouv.fr/affichCodeArticle.do?idArticle=LEGIARTI000041460928&cidTexte=LEGITEXT000006073189&dateTexte=20200101"
        }
      },
      "taux moyen": {
        "valeur": "2.23%",
        "références": {
          "Article 2 de l'arrêté du 24 décembre 2021 Relatif à la tarification des risques d'accidents du travail et de maladies professionnelles pour l'année 2022": "https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000044616004"
        }
      },
      "taux fonctions support": {
        "applicable si": "entreprise . salariés . effectif < seuil taux mixte ou individuel",
        "description": "Le taux « fonctions support » permet à l’employeur qui le demande de bénéficier d’un taux de cotisation AT/MP réduit pour les salariés non exposés au risque principal de l’établissement. Il est réservé aux salariés occupant à titre principal une fonction support de nature administrative.\n\nSont considérées comme fonctions supports de nature administrative :\n\n- le secrétariat ;\n- l’accueil ;\n- la comptabilité ;\n- les affaires juridiques ;\n- la gestion financière ;\n- les ressources humaines.\n",
        "question": "Le salarié occupe-t-il une fonction support de nature administrative ?",
        "par défaut": "non",
        "références": {
          "Taux fonctions support": "https://www.ameli.fr/entreprise/votre-entreprise/cotisation-atmp/calcul-taux-atmp-tpe-moins-20-salaries#text_66210",
          "Comprendre et expliquer : le taux fonctions support (PDF)": "https://cramif.fr/sites/default/files/inline-files/comprendre-expliquer-le-taux-fonctions-supports-VDEF.pdf",
          "Annexe 2 de l'Arrêté du 24 décembre 2021 Relatif à la tarification des risques d'accidents du travail et de maladies professionnelles pour l'année 2022": "https://www.legifrance.gouv.fr/jorf/article_jo/JORFARTI000044616026"
        },
        "avec": {
          "montant": "0.83%"
        }
      },
      "seuil taux mixte ou individuel": "20 employés"
    }
  },
  "salarié . cotisations . contribution au dialogue social": {
    "description": "Contribution patronale destinée à abonder un fonds paritaire dédié au financement des organisations syndicales et des organisations professionnelles d’employeurs.\n\nAnciennement 'contribution patronale au financement des organisations syndicales'\n",
    "références": {
      "urssaf.fr": "https://www.urssaf.fr/portail/home/employeur/calculer-les-cotisations/les-taux-de-cotisations/la-contribution-patronale-au-dia.html",
      "service-public.fr": "https://www.service-public.fr/professionnels-entreprises/vosdroits/F33308"
    },
    "produit": {
      "assiette": "cotisations . assiette",
      "taux": "0.016%"
    }
  },
  "salarié . cotisations . CSG-CRDS": {
    "description": "La CSG et la CRDS sont dues par tous les salariés remplissant les deux conditions suivantes :\n- ils sont domiciliés fiscalement en France, - ils sont à la charge d’un régime français d’assurance maladie obligatoire.\nSi l’un des deux critères n’est pas rempli, la CSG et la CRDS ne sont pas dues, à la condition d’en apporter la preuve (justificatif fiscal ou carte d’assuré social).",
    "somme": [
      "CSG",
      "CRDS"
    ]
  },
  "salarié . cotisations . CSG-CRDS . assiette de base": {
    "références": {
      "Les revenus salariaux soumis à la CSG et à la CRDS": "https://www.urssaf.fr/portail/home/employeur/calculer-les-cotisations/les-taux-de-cotisations/la-csg-crds/les-revenus-salariaux-soumis-a-l.html",
      "Les revenus exclus de l’abattement d’assiette": "https://www.urssaf.fr/portail/home/employeur/calculer-les-cotisations/les-taux-de-cotisations/la-csg-crds/abattement-et-deductions/les-revenus-exclus-de-labattemen.html",
      "heures supplémentaires": "https://dsn-info.custhelp.com/app/answers/detail/a_id/2110"
    },
    "somme": [
      "assiette abattue",
      "prévoyances . employeur"
    ],
    "abattement": "assiette heures supplémentaires et complémentaires défiscalisées",
    "avec": {
      "assiette abattue": {
        "barème": {
          "assiette": "cotisations . assiette . sans prévoyance",
          "multiplicateur": "temps de travail . plafond sécurité sociale",
          "tranches": [
            {
              "taux": "98.25%",
              "plafond": 4
            },
            {
              "taux": "100%"
            }
          ]
        }
      }
    }
  },
  "salarié . cotisations . CSG-CRDS . assiette revenu remplacements": {
    "privé": "oui",
    "produit": {
      "taux": "98.25%",
      "assiette": "rémunération . revenus de remplacement"
    }
  },
  "salarié . cotisations . CSG-CRDS . assiette heures supplémentaires et complémentaires défiscalisées": {
    "privé": "oui",
    "produit": {
      "assiette": "rémunération . net . imposable . heures supplémentaires et complémentaires défiscalisées",
      "taux": "98.25%"
    },
    "références": {
      "DSN": "https://dsn-info.custhelp.com/app/answers/detail/a_id/2110"
    }
  },
  "salarié . cotisations . CSG-CRDS . non déductible": {
    "titre": "CSG non déductible et CRDS",
    "formule": {
      "somme": [
        "CSG . non déductible",
        "CRDS",
        "revenus de remplacement . CSG non déductible",
        "revenus de remplacement . CRDS"
      ]
    }
  },
  "salarié . cotisations . CSG-CRDS . CSG": {
    "non applicable si": "établissement . commune . département . outre-mer . Mayotte",
    "description": "La contribution sociale généralisée (CSG) est un impôt destiné à participer au financement de la protection sociale.\nA la différence des cotisations sociales qui ne portent que sur les revenus d’activité, la CSG concerne, outre les revenus d’activité et de remplacement (allocations chômage, indemnités journalières…), les revenus du patrimoine, les produits de placement ou les sommes engagées ou redistribuées par les jeux.\nElle est prélevée à la source sur la plupart des revenus. Elle est recouvrée par les Urssaf sur les revenus d’activité et par l’administration fiscale sur les revenus du patrimoine.\nLe produit de la CSG est reversé à la Cnam et à la Cnaf, il finance également le fonds de solidarité vieillesse",
    "multiplication": {
      "assiette": "assiette de base",
      "composantes": [
        {
          "attributs": {
            "nom": "déductible"
          },
          "taux": {
            "nom": "taux",
            "valeur": "6.8%"
          }
        },
        {
          "attributs": {
            "nom": "non déductible"
          },
          "composantes": [
            {
              "taux": {
                "nom": "taux",
                "valeur": "2.4%"
              }
            },
            {
              "attributs": {
                "nom": "heures supplémentaires et complémentaires défiscalisées",
                "privé": "oui"
              },
              "assiette": "assiette heures supplémentaires et complémentaires défiscalisées",
              "taux": "déductible . taux + non déductible . taux"
            }
          ]
        }
      ]
    },
    "références": {
      "urssaf.fr": "https://www.urssaf.fr/portail/home/employeur/calculer-les-cotisations/la-base-de-calcul/assiette-csg-crds.html",
      "heures supplémentaires": "https://dsn-info.custhelp.com/app/answers/detail/a_id/2110"
    }
  },
  "salarié . cotisations . CSG-CRDS . CRDS": {
    "description": "Contribution pour le remboursement de la dette sociale",
    "produit": {
      "assiette": {
        "somme": [
          "assiette de base",
          "assiette heures supplémentaires et complémentaires défiscalisées"
        ]
      },
      "taux": {
        "nom": "taux",
        "valeur": "0.5%"
      }
    }
  },
  "salarié . cotisations . CSG-CRDS . revenus de remplacement": {
    "titre": "CSG-CRDS revenus de remplacement",
    "description": "La CSG-CRDS prélevées sur les revenus de remplacement.",
    "note": "Le prélèvement de la CSG et de la CRDS ne peut pas avoir pour effet de réduire le montant de la rémunération d’activité et des allocations de chômage à un seuil inférieur au Smic brut.",
    "somme": [
      {
        "nom": "CSG déductible",
        "titre": "CSG déductible revenus de remplacement",
        "produit": {
          "assiette": "CSG-CRDS . assiette revenu remplacements",
          "taux": "3.8%"
        },
        "plafond": {
          "nom": "plafond",
          "somme": [
            "rémunération . net . sans revenus de remplacement",
            "rémunération . revenus de remplacement",
            "(- SMIC)"
          ],
          "plancher": "0€/mois"
        }
      },
      {
        "nom": "CSG non déductible",
        "titre": "CSG non déductible revenus de remplacement",
        "produit": {
          "assiette": "CSG-CRDS . assiette revenu remplacements",
          "taux": "CSG . non déductible . taux"
        },
        "plafond": {
          "nom": "plafond",
          "valeur": "CSG déductible . plafond - CSG déductible"
        }
      },
      {
        "nom": "CRDS",
        "titre": "CRDS revenus de remplacement",
        "produit": {
          "assiette": "assiette revenu remplacements",
          "taux": "CRDS . taux"
        },
        "plafond": "CSG non déductible . plafond - CSG non déductible"
      }
    ]
  },
  "salarié . cotisations . FNAL": {
    "titre": "Contribution au Fonds National d’Aide au Logement",
    "description": "Le fonds national d’aide au logement (Fnal) est une contribution qui assure le financement de l’allocation logement.\n",
    "cotisation": {
      "branche": "famille"
    },
    "références": {
      "calcul": "https://www.urssaf.fr/portail/home/employeur/calculer-les-cotisations/les-taux-de-cotisations/la-contribution-au-fonds-nationa.html"
    },
    "produit": {
      "assiette": {
        "valeur": "cotisations . assiette",
        "plafond": {
          "applicable si": "éligible taux réduit",
          "valeur": "temps de travail . plafond sécurité sociale"
        }
      },
      "taux": {
        "nom": "taux",
        "variations": [
          {
            "si": "éligible taux réduit",
            "alors": "0.1%"
          },
          {
            "sinon": "0.5%"
          }
        ]
      }
    },
    "avec": {
      "privé": "oui",
      "éligible taux réduit": "entreprise . salariés . effectif < 50"
    }
  },
  "salarié . cotisations . formation professionnelle": {
    "cotisation": {
      "branche": "formation"
    },
    "description": "Cette contribution obligatoire est collectée par l'OPCO (opérateurs de compétences) désigné par la branche conventionnelle de l'entreprise, ou à défaut à un OPCO interprofessionnel.",
    "note": "Une part supplémentaire peut-être obligatoire en fonction des accords collectifs d'une entreprise.\n\n> Par exemple pour la convention collective Syntec, un supplément de 0.025% est obligatoire.\n\nLe taux est porté à 1,3 % pour les entreprises de travail temporaire. Par ailleurs en cas de franchissement du seuil d'effectifs de 10 salariés, des taux spécifiques s'appliquent afin de limiter la hausse de la contribution à la formation professionnelle :\n\n- taux de **0,55 %** pour le franchissement en année **N, N+1 et N+2**\n- taux de **0,70 %** pour le franchissement en année **N+3**  (1,3 % pour les entreprises de travail temporaire)\n- taux de **0,90 %** pour le franchissement en année **N+4** (1,3 % pour les entreprises de travail temporaire)\n- taux de **1 %** pour le franchissement en année **N+5** (1,3 % pour les entreprises de travail temporaire)\n",
    "non applicable si": {
      "toutes ces conditions": [
        "entreprise . salariés . effectif < 11",
        "contrat . apprentissage"
      ]
    },
    "produit": {
      "assiette": "cotisations . assiette",
      "variations": [
        {
          "si": "entreprise . salariés . effectif < 11",
          "alors": {
            "taux": "0.55%"
          }
        },
        {
          "sinon": {
            "taux": "1%"
          }
        }
      ]
    },
    "références": {
      "fiche Ministère du travail": "https://travail-emploi.gouv.fr/formation-professionnelle/entreprises-et-formation/article/participation-financiere-des-entreprises-au-developpement-de-la-formation",
      "Bercy infos": "https://www.economie.gouv.fr/entreprises/contribution-formation-professionnelle",
      "Taux réduit": "https://www.legifrance.gouv.fr/affichCodeArticle.do?idArticle=LEGIARTI000037387044&cidTexte=LEGITEXT000006072050&dateTexte=20190101"
    }
  },
  "salarié . cotisations . maladie": {
    "description": "La cotisation d’assurance maladie-maternité-invalidité finance les prestations versées par le régime général de Sécurité sociale en cas d’incapacité de travail. Elle permet le versement des prestations en nature et en espèces.",
    "cotisation": {
      "branche": "maladie"
    },
    "synonymes": [
      "Cotisation maladie - maternité - invalidité - décès"
    ],
    "références": {
      "Fiche Urssaf sur la cotisation maladie": "https://www.urssaf.fr/portail/home/employeur/calculer-les-cotisations/les-taux-de-cotisations/la-cotisation-maladie---maternit.html",
      "Cas particuliers": "https://www.urssaf.fr/portail/home/employeur/calculer-les-cotisations/les-taux-de-cotisations/la-cotisation-maladie---maternit/cas-particuliers.html",
      "Le régime local Alsace-Moselle": "https://regime-local.fr",
      "Décret n° 2017-1891 relatif au taux des cotisations d'assurance maladie": "https://www.legifrance.gouv.fr/eli/decret/2017/12/30/CPAS1732212D/jo/texte"
    },
    "produit": {
      "assiette": "cotisations . assiette",
      "composantes": [
        {
          "attributs": {
            "nom": "employeur",
            "titre": "part employeur",
            "avec": {
              "taux réduit": "cotisations . assiette < 2.5 * temps de travail . SMIC"
            }
          },
          "taux": {
            "nom": "taux",
            "variations": [
              {
                "si": "taux réduit",
                "alors": "7%"
              },
              {
                "sinon": "13%"
              }
            ]
          }
        },
        {
          "attributs": {
            "nom": "salarié",
            "titre": "part salarié"
          },
          "taux": {
            "nom": "taux",
            "variations": [
              {
                "si": "régimes spécifiques . alsace moselle",
                "alors": {
                  "variations": [
                    {
                      "si": "date >= 01/04/2022",
                      "alors": "1.3%"
                    },
                    {
                      "sinon": "1.5%"
                    }
                  ]
                }
              },
              {
                "si": "situation personnelle . domiciliation fiscale à l'étranger",
                "alors": "5.50%"
              }
            ]
          }
        }
      ]
    }
  },
  "salarié . cotisations . CSA": {
    "titre": "Contribution solidarité autonomie",
    "cotisation": {
      "branche": "maladie"
    },
    "acronyme": "CSA",
    "produit": {
      "assiette": "cotisations . assiette",
      "taux": {
        "nom": "taux",
        "valeur": "0.3%"
      }
    },
    "références": {
      "Fiche Urssaf": "https://www.urssaf.fr/portail/home/employeur/calculer-les-cotisations/les-taux-de-cotisations/la-contribution-solidarite-auton.html",
      "Fiche service-public": "https://www.service-public.fr/professionnels-entreprises/vosdroits/F32872"
    }
  },
  "salarié . cotisations . PEEC": {
    "titre": "Participation à l'effort de construction",
    "alias": "Dispositif du 1% logement",
    "acronyme": "PEEC",
    "description": "Participation des employeurs à l'effort de construction",
    "cotisation": {
      "branche": "logement"
    },
    "références": {
      "fiche": "https://www.service-public.fr/professionnels-entreprises/vosdroits/F22583"
    },
    "note": "L'employeur a le choix entre verser cet impôt à un \"organisme du 1% patronal\" agréé, investir la somme dans le logement de ses salariés, ou accorder à eux et leur famille des prêts de construction à taux réduit.\n",
    "non applicable si": "entreprise . salariés . effectif < 50",
    "produit": {
      "assiette": "cotisations . assiette",
      "taux": "0.45%"
    }
  },
  "salarié . cotisations . prévoyances": {
    "titre": "prévoyances complémentaires",
    "possiblement non applicable": "oui",
    "cotisation": {
      "branche": "maladie"
    },
    "somme": [
      {
        "nom": "employeur",
        "titre": "part employeur",
        "somme": [
          "santé . employeur",
          "conventionnelle . employeur",
          {
            "nom": "cadres",
            "applicable si": "contrat . statut cadre",
            "description": "prévoyance obligatoire pour les cadres",
            "privé": "oui",
            "produit": {
              "assiette": "cotisations . assiette . sans prévoyance",
              "plafond": "plafond sécurité sociale",
              "taux": "1.5%"
            }
          }
        ],
        "avec": {
          "non déductible socialement": {
            "titre": "Prévoyance employeur non déductible",
            "description": "Montant de la part employeur des prévoyances à réintégrer pour le calcul de l'assiette des cotisations",
            "valeur": "employeur",
            "abattement": {
              "somme": [
                "6% * plafond sécurité sociale",
                "1.5% * rémunération . brut"
              ],
              "plafond": "12% * plafond sécurité sociale"
            },
            "références": {
              "La limite de l'exonération sociale": "https://www.urssaf.fr/portail/home/employeur/calculer-les-cotisations/les-elements-a-prendre-en-compte/la-prevoyance-complementaire/la-limite-de-lexoneration-social.html"
            }
          }
        }
      },
      {
        "nom": "salarié",
        "titre": "part salarié",
        "somme": [
          "santé . salarié",
          "conventionnelle . salarié"
        ],
        "avec": {
          "non déductible": {
            "titre": "Prévoyance salarié non déductible",
            "valeur": "salarié",
            "abattement": {
              "somme": [
                "5% * plafond sécurité sociale",
                "2% * rémunération . brut"
              ],
              "plafond": "2% * 8 * plafond sécurité sociale"
            }
          },
          "références": {
            "Bopfip § 120": "https://bofip.impots.gouv.fr/bofip/5956-PGP.html"
          }
        }
      }
    ],
    "avec": {
      "conventionnelle": {
        "somme": [
          {
            "nom": "employeur",
            "titre": "part employeur",
            "non applicable si": "oui"
          },
          {
            "nom": "salarié",
            "titre": "part salarié",
            "non applicable si": "oui"
          }
        ]
      }
    }
  },
  "salarié . cotisations . prévoyances . santé": {
    "avec": {
      "montant": {
        "titre": "prévoyance complémentaire santé (mutuelle)",
        "synonymes": [
          "mutuelle",
          "prévoyance . santé"
        ],
        "cotisation": {
          "branche": "maladie"
        },
        "description": "En complément des garanties de base de la Sécurité sociale, un salarié peut bénéficier de prestations de la complémentaire santé de son entreprise (ou de l'association qui l'emploie). C'est l'employeur qui négocie le contrat et assure son suivi auprès de l'organisme assureur. La complémentaire santé d'entreprise doit prendre en charge un minimum de garanties.\n",
        "question": "Quel est le montant mensuel total (salarié et employeur) de la complémentaire santé de l'entreprise (mutuelle) ?",
        "par défaut": "40 €/mois",
        "suggestions": {
          "basique": "40 €/mois",
          "élevé": "100 €/mois",
          "alsace moselle basique": "30 €/mois"
        },
        "références": {
          "Complémentaire santé d'entreprise": "https://www.service-public.fr/particuliers/vosdroits/F20739",
          "les obligations de l'employeur": "https://www.service-public.fr/professionnels-entreprises/vosdroits/F33754"
        }
      },
      "taux employeur": {
        "description": "Part de la complémentaire santé payée par l'employeur. Doit être de 50% minimum",
        "question": "Quelle est la part de la complémentaire santé payée par l'employeur ?",
        "suggestions": {
          "50%": "50%",
          "100%": "100%"
        },
        "par défaut": "50%",
        "avec": {
          "contrôle min": {
            "type": "notification",
            "sévérité": "avertissement",
            "valeur": "taux employeur < 50%",
            "description": "La part employeur de la complémentaire santé doit être de 50% au minimum"
          }
        }
      },
      "employeur": "montant * taux employeur",
      "salarié": "montant - taux employeur"
    }
  },
  "salarié . cotisations . vieillesse": {
    "cotisation": {
      "branche": "retraite"
    },
    "description": "Cotisation vieillesse pour le régime de retraite de base des salariés.",
    "produit": {
      "assiette": "cotisations . assiette",
      "composantes": [
        {
          "attributs": {
            "nom": "salarié",
            "titre": "part salarié"
          },
          "composantes": [
            {
              "attributs": {
                "nom": "déplafonnée"
              },
              "taux": {
                "nom": "taux",
                "valeur": "0.4%"
              }
            },
            {
              "attributs": {
                "nom": "plafonnée"
              },
              "taux": {
                "nom": "taux",
                "valeur": "6.90%"
              },
              "plafond": "temps de travail . plafond sécurité sociale"
            }
          ]
        },
        {
          "attributs": {
            "nom": "employeur",
            "titre": "part employeur"
          },
          "composantes": [
            {
              "attributs": {
                "nom": "déplafonnée"
              },
              "taux": {
                "nom": "taux",
                "valeur": "1.9%"
              }
            },
            {
              "attributs": {
                "nom": "plafonnée"
              },
              "taux": {
                "nom": "taux",
                "valeur": "8.55%"
              },
              "plafond": "temps de travail . plafond sécurité sociale"
            }
          ]
        }
      ]
    },
    "références": {
      "Article L727-2 du Code de la sécurité sociale": "https://www.legifrance.gouv.fr/codes/id/LEGISCTA000038510929"
    }
  },
  "salarié . cotisations . taxe d'apprentissage": {
    "cotisation": {
      "branche": "formation"
    },
    "description": "La taxe d'apprentissage permet de financer par les entreprises les dépenses de l'apprentissage et des formations technologiques et professionnelles",
    "applicable si": {
      "une de ces conditions": [
        "entreprise . salariés . effectif > 10",
        "contrat . apprentissage = non"
      ]
    },
    "références": {
      "description": "https://www.service-public.fr/professionnels-entreprises/vosdroits/F22574"
    },
    "note": "Taxe complexe, comportant notamment des exonérations non prises en compte ici.",
    "somme": [
      {
        "nom": "base",
        "privé": "oui",
        "produit": {
          "assiette": "assiette",
          "taux": {
            "variations": [
              {
                "si": "régimes spécifiques . alsace moselle",
                "alors": "0.44%"
              },
              {
                "sinon": "0.68%"
              }
            ]
          }
        }
      },
      "contribution supplémentaire"
    ],
    "avec": {
      "assiette": {
        "titre": "assiette de la taxe d'apprentissage",
        "privé": "oui",
        "description": "Le salaire des apprentis est partiellement exonéré dans la base de calcul de la taxe d'apprentissage.",
        "variations": [
          {
            "si": "contrat . apprentissage",
            "alors": {
              "valeur": "cotisations . assiette",
              "abattement": {
                "variations": [
                  {
                    "si": "établissement . commune . département . outre-mer",
                    "alors": "20% * temps de travail . SMIC"
                  },
                  {
                    "sinon": "11% * temps de travail . SMIC"
                  }
                ]
              }
            }
          },
          {
            "sinon": "cotisations . assiette"
          }
        ]
      },
      "contribution supplémentaire": {
        "privé": "oui",
        "applicable si": {
          "toutes ces conditions": [
            "entreprise . salariés . effectif >= 250",
            "entreprise . salariés . ratio alternants < 5%"
          ]
        },
        "produit": {
          "assiette": "assiette",
          "variations": [
            {
              "si": "CSA au taux majoré",
              "alors": {
                "taux": "0.6%"
              }
            },
            {
              "si": "entreprise . salariés . ratio alternants < 1%",
              "alors": {
                "taux": "0.4%"
              }
            },
            {
              "si": "entreprise . salariés . ratio alternants < 2%",
              "alors": {
                "taux": "0.2%"
              }
            },
            {
              "si": "entreprise . salariés . ratio alternants < 3%",
              "alors": {
                "taux": "0.1%"
              }
            },
            {
              "si": "entreprise . salariés . ratio alternants < 5%",
              "alors": {
                "taux": "0.05%"
              }
            }
          ]
        },
        "avec": {
          "CSA au taux majoré": {
            "toutes ces conditions": [
              "entreprise . salariés . effectif >= 2000",
              "entreprise . salariés . ratio alternants < 1%"
            ]
          }
        }
      }
    }
  },
  "salarié . cotisations . versement mobilité": {
    "description": "Contribution sur les salaires destinée au financement des transports publics.",
    "applicable si": "entreprise . salariés . effectif > 10",
    "cotisation": {
      "branche": "transport"
    },
    "produit": {
      "assiette": "cotisations . assiette",
      "taux": "établissement . commune . taux versement mobilité"
    },
    "références": {
      "Recherchez le taux de versement mobilité applicable dans votre ville": "https://www.urssaf.fr/portail/home/taux-et-baremes/versement-mobilite.html",
      "Le versement mobilité, ça vous concerne ?": "https://www.economie.gouv.fr/entreprises/versement-mobilite-transport",
      "Article wikipedia": "https://fr.wikipedia.org/wiki/Versement_transport"
    }
  },
  "salarié . cotisations . forfait social": {
    "titre": "Forfait social",
    "description": "Le forfait social est une contribution versée par l'employeur. Elle est prélevée sur les rémunérations ou gains non soumis aux cotisations et contributions sociales, mais assujettis à la CSG.\n",
    "applicable si": "entreprise . salariés . effectif > 10",
    "cotisation": {
      "branche": "retraite"
    },
    "références": {
      "Fiche Urssaf": "https://www.urssaf.fr/portail/home/employeur/calculer-les-cotisations/les-taux-de-cotisations/le-forfait-social.html",
      "Fiche service-public.fr": "https://www.service-public.fr/professionnels-entreprises/vosdroits/F31532",
      "Code du travail - Article L137-15": "https://www.legifrance.gouv.fr/codes/id/LEGISCTA000019950196"
    },
    "produit": {
      "assiette": "prévoyances . employeur",
      "taux": "8%"
    }
  },
  "salarié . cotisations . assiette forfaitaire": {
    "applicable si": "non",
    "avec": {
      "rémunération réelle": {
        "question": "Voulez-vous calculer les cotisations sur la rémunération réelle (au lieu de la base forfaitaire) ?",
        "par défaut": "non"
      },
      "montant": {
        "privé": "oui",
        "titre": "assiette forfaitaire de cotisations",
        "non applicable si": "rémunération réelle",
        "rend non applicable": [
          "exonérations . réduction générale",
          "exonérations . lodeom"
        ],
        "remplace": [
          {
            "règle": "cotisations . assiette",
            "sauf dans": [
              "chômage",
              "retraite complémentaire",
              "CEG",
              "CET",
              "convention collective",
              "vieillesse"
            ]
          },
          {
            "règle": "CSG-CRDS . assiette de base . assiette abattue"
          },
          {
            "règle": "temps de travail . plafond sécurité sociale",
            "par": "plafond sécurité sociale",
            "sauf dans": [
              "chômage",
              "retraite complémentaire",
              "CEG",
              "CET",
              "convention collective"
            ]
          }
        ],
        "valeur": "assiette forfaitaire",
        "plancher": {
          "applicable si": "rémunération . brut >= 1.5 * plafond sécurité sociale",
          "valeur": "70% * rémunération . brut"
        },
        "références": {
          "exception agirc-arco (fiche 3)": "https://www.agirc-arrco.fr/fileadmin/agircarrco/documents/circulaires/agirc_arrco/2019/2019-1-DRJ_Reglementation__applicable_aux_entreprises.pdf",
          "CSG-CRDS": "https://www.urssaf.fr/portail/home/employeur/calculer-les-cotisations/la-base-de-calcul/assiette-csg-crds.html",
          "Cas particuliers : bases forfaitaires et franchises de cotisations ": "https://www.urssaf.fr/portail/home/employeur/calculer-les-cotisations/la-base-de-calcul/cas-particuliers--bases-forfaita.html",
          "Montant des assiettes forfaitaires": "https://www.urssaf.fr/portail/home/taux-et-baremes/assiettes-forfaitaires-et-franch.html"
        },
        "note": "Il existe une règle générale d'encadrement des assiettes forfaitaires. Lorsque la rémunération est supérieure ou égale à\n1,5 fois le plafond de la sécurité sociale, l'assiette forfaitaire retenue ne peut être inférieure à 70% de la rémunération\n"
      }
    }
  },
  "salarié . rémunération": {
    "icônes": "💶",
    "description": "Ce sont tous les éléments qui composent la rémunération du salarié. Ils ne sont pas forcément inscrits dans le contrat de travail et peuvent varier d'un mois à l'autre ou en fonction de la législation.\n"
  },
  "salarié . rémunération . net . imposable": {
    "titre": "Salaire net imposable",
    "description": "C'est la base utilisée pour calculer l'impôt sur le revenu.\n",
    "valeur": {
      "nom": "sans déductions",
      "description": "Le net imposable avant les exonérations et déductions",
      "somme": [
        "net",
        "cotisations . CSG-CRDS . non déductible",
        "cotisations . prévoyances . employeur",
        "cotisations . prévoyances . salarié . non déductible"
      ]
    },
    "abattement": {
      "somme": [
        "frais professionnels . déductible",
        "exonération prime d'impatriation",
        "exonération stagiaires et apprentis",
        "heures supplémentaires et complémentaires défiscalisées"
      ]
    },
    "références": {
      "DSN": "https://dsn-info.custhelp.com/app/answers/detail/a_id/2110"
    },
    "avec": {
      "heures supplémentaires et complémentaires défiscalisées": {
        "unité": "€/mois",
        "somme": [
          "heures supplémentaires",
          "heures complémentaires"
        ],
        "plafond": {
          "produit": {
            "assiette": {
              "variations": [
                {
                  "si": "date >= 01/01/2022",
                  "alors": "7500 €/an"
                },
                {
                  "sinon": "5000 €/an"
                }
              ]
            },
            "taux": "1 / (1 - (98.25 / 100) * (6.8 / 100))"
          },
          "unité": "€/an",
          "arrondi": "oui"
        },
        "arrondi": "oui",
        "références": {
          "DSN": "https://dsn-info.custhelp.com/app/answers/detail/a_id/2110"
        }
      },
      "exonération stagiaires et apprentis": {
        "privé": "oui",
        "description": "Les salaires versés aux apprentis ainsi que les gratifications de stages sont exonérés d'impôt sur le revenu dans la limite d'un SMIC annuel.\n",
        "références": {
          "Article 81 bis du Code général des impôts": "https://www.legifrance.gouv.fr/affichCodeArticle.do?idArticle=LEGIARTI000029236245&cidTexte=LEGITEXT000006069577"
        },
        "applicable si": {
          "une de ces conditions": [
            "contrat . apprentissage",
            "contrat . stage"
          ]
        },
        "valeur": "SMIC"
      },
      "exonération prime d'impatriation": {
        "description": "La prime d'impatriation est une partie de la rémunération exonérée d'impôt sur le revenu.",
        "applicable si": "régimes spécifiques . impatriés",
        "produit": {
          "assiette": "rémunération . net . imposable . sans déductions",
          "taux": "30%"
        },
        "références": {
          "Article 155B du Code général des impôts": "https://www.legifrance.gouv.fr/affichCodeArticle.do?cidTexte=LEGITEXT000006069577&idArticle=LEGIARTI000006307476&dateTexte=&categorieLien=cid",
          "Bofip": "https://bofip.impots.gouv.fr/bofip/5677-PGP"
        }
      }
    }
  },
  "salarié . rémunération . net . à payer avant impôt": {
    "titre": "Salaire net",
    "identifiant court": "salaire-net",
    "unité": "€/mois",
    "question": "Quel est votre salaire net ?",
    "résumé": "Salaire net avant impôt",
    "description": "C'est le montant que le salarié touche à la fin du mois avant de payer l'impôt sur le revenu.\nAussi appelé salaire net à payer avant impôt.\nCette somme peut varier en fonction de décisions politiques (augmentation ou diminution des cotisations) alors que le salaire brut est contractuel (pour le changer, il faut signer un avenant au contrat).",
    "somme": [
      "net",
      "(- avantages en nature . montant)",
      "(- frais professionnels . titres-restaurant . montant)"
    ]
  },
  "salarié . rémunération . net": {
    "description": "C'est la rémunération nette de cotisations. Elle inclut le salaire net, mais également des éléments de rémunération en nature comme les avantages en nature, les titres restaurants ou les prévoyances payées par employeur.",
    "somme": [
      {
        "nom": "sans revenus de remplacement",
        "valeur": "brut",
        "abattement": "cotisations . salarié"
      },
      "revenus de remplacement . net"
    ]
  },
  "salarié . rémunération . net . payé après impôt": {
    "titre": "Salaire net après impôt",
    "identifiant court": "salaire-net-apres-impot",
    "résumé": "Le salaire net payé",
    "question": "Quel est le revenu net du salarié après impôt ?",
    "type": "salaire",
    "unité": "€/mois",
    "description": "C'est le salaire versé sur le compte bancaire du salarié, une fois les cotisations et l'impôt prélevées.\n",
    "références": {
      "Explication de l'impôt à la source": "https://www.economie.gouv.fr/prelevement-a-la-source"
    },
    "somme": [
      "à payer avant impôt",
      "(- impôt . montant)"
    ]
  },
  "salarié . rémunération . taux horaire": {
    "unité": "€/heures",
    "formule": "assiette de vérification du SMIC / temps de travail"
  },
  "salarié . rémunération . taux horaire . heures supplémentaires": {
    "titre": "taux horaire (heure supplémentaire)",
    "description": "Le taux horaire utilisé pour calculer la rémunération liée au heures supplémentaires. Il intègre les avantages en nature et les primes constituant la contrepartie d'un travail fourni.\n",
    "unité": "€/heures",
    "formule": "(assiette de vérification du SMIC + primes . fin d'année) / contrat . temps de travail",
    "références": {
      "e-Paye (privé)": "https://e-paye.com/faq/les-heures-supplementaires-quelles-primes-inclure-dans-la-base-de-calcul-de-la-majoration-pour-heure-supplementaire/",
      "rfPaye (privé)": "https://rfpaye.grouperf.com/article/0168/ms/rfpayems0168_2027146.html",
      "legisocial": "https://www.legisocial.fr/actualites-sociales/1074-avantage-en-nature-et-heures-supplementaires-les-consequences-sur-le-bulletin-de-paie.html"
    }
  },
  "salarié . rémunération . assiette de vérification du SMIC": {
    "description": "C'est le salaire pris en compte pour vérifier que le SMIC est atteint.\n",
    "unité": "€/mois",
    "somme": [
      "contrat . salaire brut",
      "avantages en nature . montant",
      "primes . activité"
    ],
    "note": "Les primes de fin d'année ou de 13ième mois sont prises en compte dans l'assiette de vérification du SMIC mais seulement le mois où elles sont payées (et non de manière lissée sur l'année), c'est pourquoi nous ne les incluons pas dans cette formule.\n",
    "références": {
      "Assiette minimale de cotisations": "https://www.urssaf.fr/portail/home/employeur/calculer-les-cotisations/la-base-de-calcul/lassiette-minimale-des-cotisatio/lassiette-minimale-soumise-a-cot.html",
      "Comment vérifier que le SMIC est atteint ?": "https://travail-emploi.gouv.fr/droit-du-travail/la-remuneration/article/le-smic"
    },
    "avec": {
      "contrôle": {
        "type": "notification",
        "sévérité": "avertissement",
        "description": "Le salaire saisi est inférieur au SMIC.",
        "valeur": "assiette de vérification du SMIC < contrat . temps de travail . SMIC"
      }
    }
  },
  "salarié . rémunération . primes": {
    "description": "Les primes sont des compléments de salaire versés au salarié en vertu du\ncontrat de travail, de la convention collective, d'un usage d'entreprise, ou\nbien à titre bénévole par l'employeur.\n\nSauf exception, elles sont soumises aux cotisations sociales et à l'impôt\nsur le revenu.\n",
    "somme": [
      "activité",
      "primes . ancienneté",
      "fin d'année . montant"
    ],
    "avec": {
      "activité": {
        "unité": "€/mois",
        "titre": "primes d'activité",
        "description": "Primes et gratifications versées en contrepartie, ou à l’occasion du travail, directement liées à l’exécution par le salarié de sa prestation de travail. Tel est le cas, par exemple, d’une prime de vente exclusivement basée sur les résultats du salarié.\nCes primes sont prises en compte pour le calcul du salaire minimum\n",
        "somme": [
          {
            "nom": "base",
            "titre": "primes d'activité",
            "question": "Quel est le montant des primes liées à l'activité du salarié ?",
            "par défaut": "0 €/mois"
          },
          {
            "nom": "conventionnelles",
            "valeur": "0 €/mois"
          }
        ]
      },
      "ancienneté": "0 €/mois",
      "fin d'année": {
        "titre": "Prime de fin d'année ou de treizième mois",
        "question": "Le salarié bénéficie-t-il d'un treizième mois ?",
        "description": "La prime de treizième mois est un avantage accordé au salarié qui peut être prévu par la convention collective ou le contrat de travail. Elle est généralement versée en fin d'année.\n",
        "par défaut": "non",
        "avec": {
          "montant": {
            "titre": "Prime de fin d'année ou de treizième mois",
            "description": "Cette prime est le plus souvent versée en une seule fois à la fin de\nl'année.\n\nLes salariés à temps partiel ont dont à la prime de fin d'année dans les\nmêmes conditions que les autres salariés en proportion de leur durée du\ntravail.\n",
            "produit": {
              "assiette": "assiette de vérification du SMIC * contrat . temps de travail . quotité",
              "facteur": "(13 mois - 1 an) / 1 an"
            }
          }
        },
        "note": "Certaines entreprises proposent une prime de fin d'année sur une base de 13,5 mois, 14 mois voire 15 mois.\n"
      }
    }
  },
  "salarié . rémunération . indemnités CDD": {
    "applicable si": "contrat . CDD",
    "note": "Ces indemnités sont versées à la fin du contrat, mais dans le simulateur elles sont réparties sur les salaires mensuels de la durée du contrat. Cela est dû à une limitation du moteur de calcul, qui ne gère pas encore la temporalité.",
    "somme": [
      "fin de contrat",
      "congés payés"
    ],
    "avec": {
      "congés payés": {
        "titre": "indemnité compensatrice de congés payés",
        "description": "Le salarié en CDD bénéficie des mêmes droits à congés payés que le salarié\nen CDI. Il acquiert et prend ses congés payés dans les mêmes conditions.\n\nIl est cependant courant que le salarié ne puisse pas prendre tous ses\ncongés avant le terme de son contrat, il bénéficie alors d'une indemnité\ncompensatrice de congés payés versée par l'employeur.\n\nIl existe deux méthodes pour calculer l'indemnité de congés non pris.\n\n### Méthode \"du dixième\"\n\nCe mode de calcul sera le plus souvent favorable au salarié lorsque celui-ci\na accompli des heures supplémentaires. Une indemnité égale au dixième de la\nrémunération brute totale perçue par le salarié au cours de la période de\nréférence.\n\n### Méthode \"maintien du salaire\"\n\nCette méthode sera le plus souvent favorable au salarié lorsque celui-ci a\nbénéficié d’une augmentation de salaire.\n\nPour effectuer le calcul, l'employeur peut tenir compte soit :\n- de l'horaire réel du mois,\n- du nombre moyen de jours ouvrés (ou ouvrables),\n- du nombre réel de jours ouvrés (ou ouvrables).\n",
        "unité": "€/mois",
        "non applicable si": {
          "une de ces conditions": [
            "salarié . contrat . CDD . congés pris . proportion = 100%",
            "salarié . contrat . CDD . reconduction en CDI"
          ]
        },
        "le maximum de": [
          {
            "nom": "Méthode du dixième",
            "produit": {
              "assiette": "assiette",
              "taux": "10%"
            },
            "abattement": "salarié . contrat . CDD . congés pris . proportion"
          },
          {
            "nom": "Méthode du maintien de salaire",
            "produit": {
              "assiette": "assiette",
              "facteur": "salarié . contrat . CDD . congés pris . proportion par rapport aux jours ouvrés"
            }
          }
        ],
        "note": "L'indemnité est versée à la fin du contrat, sauf si le CDD se poursuit par un CDI.\nÀ noter, la loi El Khomri modifie l'article L3141-12:\n- avant : Les congés peuvent être pris dès l'ouverture des droits\n- maintenant : Les congés peuvent être pris dès l’embauche\n",
        "références": {
          "Comment calculer l'indemnité de congés payés du salarié ?": "https://www.service-public.fr/particuliers/vosdroits/F33359",
          "Code du travail - Article L3141-24": "https://www.legifrance.gouv.fr/affichCodeArticle.do?cidTexte=LEGITEXT000006072050&idArticle=LEGIARTI000006902661&dateTexte=&categorieLien=cid",
          "assiette de l'indemnité, circulaire DRT 18 du 30 octobre 1990": "http://conseillerdusalarie.free.fr/Docs/TextesFrance/19901030Circulaire_DRT_90_18_du_30_octobre_1990_CDD_Travail_temporaire.htm",
          "Méthode du maintien de salaire": "https://www.service-public.fr/particuliers/vosdroits/F33359"
        },
        "avec": {
          "assiette": {
            "privé": "oui",
            "titre": "Assiette pour le calcul de l'indemnité de congés payés",
            "description": "Pendant ses congés, le salarié ne perçoit pas son salaire. Il perçoit une indemnité de congés payés.\nToutes les sommes ayant le caractère de salaire sont prises en compte pour déterminer l'indemnité de congés payés. Les autres sommes ne sont pas prise en compte.",
            "somme": [
              "contrat . salaire brut",
              "heures supplémentaires",
              "heures complémentaires",
              "avantages en nature",
              "primes . ancienneté",
              "primes . activité",
              "indemnités CDD . fin de contrat"
            ],
            "références": null
          }
        }
      },
      "fin de contrat": {
        "titre": "indemnité de fin de contrat",
        "alias": "prime de précarité",
        "applicable si": "contrat . CDD . indemnité de fin de contrat",
        "produit": {
          "assiette": {
            "somme": [
              "contrat . salaire brut",
              "avantages en nature . montant",
              "primes",
              "heures supplémentaires"
            ]
          },
          "taux": "10%"
        },
        "référence": {
          "Code du travail - Article L1243-8": "https://www.legifrance.gouv.fr/codes/id/LEGISCTA000006189459",
          "service-public.fr": "https://www.service-public.fr/particuliers/vosdroits/F40"
        }
      }
    }
  },
  "salarié . rémunération . brut": {
    "description": "Toutes les sommes versées au salarié en échange de son travail.",
    "titre": "Rémunération brute",
    "somme": [
      "contrat . salaire brut",
      "avantages en nature . montant",
      "primes",
      "indemnités CDD",
      "heures supplémentaires",
      "heures complémentaires",
      "frais professionnels"
    ],
    "abattement": "activité partielle . retrait absence"
  },
  "salarié . rémunération . heures supplémentaires": {
    "description": "La rémunération relative aux heures supplémentaires",
    "produit": {
      "assiette": "taux horaire . heures supplémentaires",
      "facteur": {
        "somme": [
          "temps de travail . heures supplémentaires",
          "temps de travail . heures supplémentaires . majoration"
        ]
      }
    }
  },
  "salarié . rémunération . heures complémentaires": {
    "description": "La rémunération relative aux heures complémentaires",
    "produit": {
      "assiette": "taux horaire . heures supplémentaires",
      "facteur": {
        "somme": [
          "temps de travail . heures complémentaires",
          "temps de travail . heures complémentaires . majoration"
        ]
      }
    }
  },
  "salarié . rémunération . frais professionnels": {
    "titre": "remboursement de frais",
    "unité": "€/mois",
    "possiblement non applicable": "oui",
    "description": "Les frais professionnels correspondent à des dépenses engagées par le salarié pour les besoins de son activité professionnelle. Ces frais sont ensuite remboursés par l’employeur.\n\nLe dédommagement de ces frais peut prendre la forme :\n\n  - d’un remboursement des dépenses réelles sur justificatifs ;\n\n  - d’un versement d’allocations forfaitaires ;\n\n  - de l’application d’une déduction forfaitaire spécifique sur le salaire soumis à cotisations ; cette possibilité n’étant ouverte qu’à certaines professions.\n\n\nLes frais professionnels sont généralement exclus de la base de calcul des cotisations de sécurité sociale et de la CSG-CRDS, sauf en cas de dépassement de plafond pour les remboursements forfaitaires ( frais de panier, titres-restaurant, forfait mobilités durables...).",
    "somme": [
      "titres-restaurant . employeur",
      "trajets domicile travail . employeur"
    ]
  },
  "salarié . rémunération . frais professionnels . déductible": {
    "titre": "Part déductibles",
    "description": "Part des frais déduite de l'assiette de cotisation sociale et pour le calcul de l'impôt sur le revenu.",
    "somme": [
      "titres-restaurant . déductible",
      "trajets domicile travail . déductible"
    ]
  },
  "salarié . rémunération . frais professionnels . titres-restaurant": {
    "icônes": "🍽️",
    "description": "Le titre-restaurant est un titre spécial de paiement « des repas » remis par l’employeur au salarié.\n\nLe salarié ne peut utiliser les titres-restaurant en sa possession que pour régler la consommation :\n\n  - d’un repas,\n\n  - de préparations alimentaires directement consommables,\n\n  - de fruits et légumes.\n\nCe titre peut être émis sur support papier ou sous forme dématérialisée.",
    "question": "Le salarié reçoit-il des titres-restaurant ?",
    "par défaut": "non",
    "avec": {
      "montant": {
        "produit": {
          "assiette": "montant unitaire",
          "facteur": "nombre"
        }
      },
      "employeur": "montant * taux employeur",
      "déductible": {
        "titre": "Titre restaurant déductibles",
        "valeur": "employeur",
        "plafond": {
          "produit": {
            "assiette": "nombre",
            "facteur": {
              "nom": "plafond unitaire",
              "valeur": {
                "variations": [
                  {
                    "si": "date >= 09/2022",
                    "alors": "5.92 €/titres-restaurant"
                  },
                  {
                    "si": "date >= 01/2022",
                    "alors": "5.69 €/titres-restaurant"
                  },
                  {
                    "si": "date >= 01/2021",
                    "alors": "5.55 €/titres-restaurant"
                  }
                ]
              }
            }
          }
        },
        "références": {
          "urssaf.fr": "https://www.urssaf.fr/portail/home/taux-et-baremes/frais-professionnels/les-titres-restaurant.html"
        }
      },
      "nombre": {
        "question": "Combien de titres-restaurant sont distribués au salarié ?",
        "arrondi": "oui",
        "par défaut": {
          "produit": {
            "assiette": "19 titres-restaurant/mois",
            "facteur": "temps de travail . quotité"
          }
        },
        "suggestions": {
          "5 repas/semaine": "5 titres-restaurant/semaine * période . semaines par mois",
          "3 repas/semaine": "3 titres-restaurant/semaine * période . semaines par mois"
        }
      },
      "montant unitaire": {
        "question": "Quelle est la valeur unitaire du titre-restaurant ?",
        "description": "Il n'y a pas de valeur maximale ou minimale pour les titres-restaurant. En revanche, pour bénéficier de l'exonération de cotisation, il ne faut pas dépasser 11,38€ par titre en 2021.",
        "par défaut": "8 €/titre-restaurant",
        "suggestions": {
          "faible": "6 €/titre-restaurant",
          "moyenne": "8 €/titre-restaurant",
          "max exonéré": {
            "valeur": "déductible . plafond unitaire / taux employeur",
            "unité": "€ / titre-restaurant"
          }
        }
      },
      "taux employeur": {
        "description": "Part du titre-restaurant payée par l'employeur. Doit être de 50% minimum et de 60% maximum.",
        "question": "Quelle est la participation de l'employeur ?",
        "par défaut": "50 %",
        "suggestions": {
          "50%": "50 %",
          "60%": "60 %"
        },
        "avec": {
          "contrôle min": {
            "type": "notification",
            "sévérité": "avertissement",
            "applicable si": "taux employeur < 50%",
            "description": "La part employeur du titre-restaurant doit être de 50% au minimum"
          },
          "contrôle max": {
            "type": "notification",
            "sévérité": "avertissement",
            "applicable si": "taux employeur > 60%",
            "description": "La part employeur du titre-restaurant doit être de 60% au maximum"
          }
        }
      }
    }
  },
  "salarié . rémunération . frais professionnels . trajets domicile travail": {
    "références": {
      "Frais de transport du trajets domicile travail": "https://www.urssaf.fr/portail/home/employeur/calculer-les-cotisations/les-elements-a-prendre-en-compte/les-frais-professionnels/les-frais-de-transport/trajet-domicilelieu-de-travail.html"
    },
    "avec": {
      "employeur": {
        "somme": [
          "transports publics . employeur",
          "forfait mobilités durables . montant",
          "prime de transport . montant"
        ],
        "abattement": "abattement temps partiel"
      },
      "déductible": {
        "titre": "Part déductible",
        "valeur": {
          "somme": [
            "transports publics . déductible",
            "forfait mobilités durables . montant",
            {
              "valeur": "prime de transport . déductible",
              "plafond": "plafond hors cumul"
            }
          ],
          "plafond": {
            "variations": [
              {
                "si": {
                  "toutes ces conditions": [
                    "date >= 01/2021",
                    "établissement . commune . département . outre-mer"
                  ]
                },
                "alors": "900 €/an"
              },
              {
                "si": "cumul forfait mobilité durable et transports publics",
                "alors": {
                  "variations": [
                    {
                      "si": "date < 01/2022",
                      "alors": "600€/an"
                    },
                    {
                      "sinon": "800€/an"
                    }
                  ]
                }
              },
              {
                "sinon": {
                  "nom": "plafond hors cumul",
                  "privé": "oui",
                  "variations": [
                    {
                      "si": "date < 01/2022",
                      "alors": "500€/an"
                    },
                    {
                      "sinon": "700€/an"
                    }
                  ]
                }
              }
            ]
          },
          "plancher": "transports publics . déductible"
        },
        "abattement": "abattement temps partiel"
      },
      "abattement temps partiel": {
        "privé": "oui",
        "applicable si": "contrat . temps de travail . quotité < 50%",
        "valeur": "100% - (contrat . temps de travail . quotité / 50%)",
        "références": {
          "Article R3261-14 du code du travail, version 11/05/2020": "https://www.legifrance.gouv.fr/codes/id/LEGIARTI000041865023/2020-05-11/"
        }
      },
      "cumul forfait mobilité durable et transports publics": {
        "privé": "oui",
        "toutes ces conditions": [
          "transports publics . montant > 0",
          "forfait mobilités durables . montant > 0"
        ]
      }
    }
  },
  "salarié . rémunération . frais professionnels . trajets domicile travail . transports publics": {
    "icônes": "🚍",
    "avec": {
      "montant": {
        "titre": "Montant abonnement",
        "question": "Quel montant le salarié dépense-t-il en abonnement aux transports publics pour se rendre sur son lieu de travail ?",
        "unité": "€/mois",
        "par défaut": "0 €/mois",
        "description": "La participation de l’employeur aux frais de transports publics est obligatoire.\n\nL’employeur (de droit privé ou public) doit prendre en charge 50 % du prix des titres d’abonnements souscrits par ses salariés pour l’intégralité du trajet entre leur résidence habituelle et leur lieu de travail accompli au moyen de services de transports publics même si plusieurs abonnements sont nécessaires à la réalisation de ce trajet (train + bus par exemple).\nSont également concernés les services publics de location de vélos.\n\nL’employeur peut prendre en charge un part plus importante que les 50% obligatoires. La prise en charge des frais de transports par l’employeur est exonérée de cotisations sociales et d’impôt sur le revenu jusqu'à 75% de participation.\n\nDans le cas d'un temps partiel, le taux de prise en charge sera le même pour un mi-temps ou plus. En dessous, le taux de prise en charge sera proportionnel.\n",
        "références": {
          "Articles R3261-1 à -10 du code du travail, version 01/01/2009": "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000020080272/2009-01-01",
          "Article 81 du code des impôts, version en vigueur au 31/12/2020": "https://www.legifrance.gouv.fr/codes/id/LEGIARTI000042910732/2020-12-31/",
          "Remboursement des frais de transport": "https://www.service-public.fr/particuliers/vosdroits/F19846/personnalisation/resultat?lang=&quest0=0",
          "Prise en charge obligatoire des frais de transport public": "https://www.urssaf.fr/portail/home/employeur/calculer-les-cotisations/les-elements-a-prendre-en-compte/les-frais-professionnels/les-frais-de-transport/trajet-domicilelieu-de-travail/prise-en-charge-obligatoire-des.html#FilAriane"
        },
        "suggestions": {
          "Navigo": "75 €/mois",
          "Técély": "65 €/mois",
          "RTM": "40 €/mois",
          "Tisséo": "42.50 €/mois",
          "TBM": "42.20 €/mois"
        }
      },
      "employeur": {
        "applicable si": "montant > 0",
        "titre": "Part employeur",
        "description": "Montant de l'abonnement aux transports publics prise en charge par l'employeur.",
        "unité": "€/mois",
        "produit": {
          "assiette": "montant",
          "taux": "taux employeur"
        }
      },
      "déductible": {
        "description": "Montant de l'abonnement aux transports publics prise en charge par l'employeur et déductible de cotisations et d'impôts.",
        "produit": {
          "assiette": "montant",
          "taux": {
            "valeur": "taux employeur",
            "plafond": {
              "variations": [
                {
                  "si": "date < 01/2022",
                  "alors": "50%"
                },
                {
                  "sinon": "75%"
                }
              ]
            }
          }
        }
      },
      "taux employeur": {
        "question": "Quel est le taux de prise en charge par l’employeur aux frais de transports du salarié ?",
        "par défaut": "50%",
        "plancher": "50%",
        "suggestions": {
          "Minimum (50%)": "50%",
          "Maximum déductible (75%)": "75%",
          "Totale (100%)": "100%"
        }
      }
    }
  },
  "salarié . rémunération . frais professionnels . trajets domicile travail . prime de transport": {
    "icônes": "🚗",
    "avec": {
      "montant": {
        "titre": "Prime de transport",
        "non applicable si": {
          "applicable si": "date < 01/2022",
          "valeur": "transports publics . montant > 0"
        },
        "question": "Quel montant des frais de carburants / alimentation du véhicule dépensés par le salarié pour se rendre au travail est pris en charge par l'employeur ?",
        "unité": "€/an",
        "par défaut": "0 €/an",
        "description": "Une prise en charge par l’employeur, sous forme de « prime de transport », des frais de carburant et d’alimentation des véhicules électriques, hybrides rechargeables ou à hydrogène engagés par les salariés pour leurs déplacements entre leur résidence habituelle et leur lieu de travail est possible sous certaines conditions.\n\nSi l’employeur (de droit privé ou de droit public) la met en place, elle doit profiter à l’ensemble des salariés selon les mêmes modalités et en fonction de la distance entre le domicile et le lieu de travail.\n\nLe montant, les modalités ainsi que les critères d’attribution de la prime de transport doivent être prévus par accord d’entreprise ou par accord interentreprises, et à défaut, par accord de branche.\nEn l’absence d’accord, l’employeur peut prévoir le versement de la prime de transport par décision unilatérale, après consultation du comité social et économique (CSE), s’il existe.\n\nLe salarié peut prétendre à la prime de transport si :\n\n- sa résidence habituelle ou son lieu de travail est situé en dehors de la région Ile-de-France et d’un périmètre de transports urbains ;\n- l'utilisation d'un véhicule personnel est rendue indispensable par des conditions d'horaires de travail particuliers ne permettant pas d'emprunter un mode collectif de transport.\n\nLa prise en charge n’est pas prévue si :\n\n- le salarié bénéficie d’un véhicule mis à disposition permanente par l’employeur avec prise en charge des dépenses de carburant ou d’alimentation électrique (voiture de fonction ou de service) ;\n- le salarié est logé dans des conditions excluant tous frais de transport pour se rendre au travail (logement de fonction) ;\n- l’employeur assure gratuitement le transport du salarié.\n\n> **Bon à savoir**\n> Aucun justificatif de dépenses de carburant n’est exigé lorsque la prise en charge par l’employeur n’excède pas 200 € pour les frais de carburant, ou 500 € pour les frais d’alimentation des véhicules électriques, hybrides rechargeables ou à hydrogène.\n",
        "références": {
          "Fiche Urssaf sur la prime de transport": "https://www.urssaf.fr/portail/home/employeur/calculer-les-cotisations/les-elements-a-prendre-en-compte/les-frais-professionnels/les-frais-de-transport/trajet-domicilelieu-de-travail/prise-en-charge-facultative-des/prime-de-transport.html",
          "Articles R3261-11 à -13 du code du travail, version 11/05/2020": "https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006072050/LEGISCTA000018487476/2020-05-11",
          "Article 81 du code des impôts, version en vigueur au 31/12/2020": "https://www.legifrance.gouv.fr/codes/id/LEGIARTI000042910732/2020-12-31/"
        }
      },
      "déductible": {
        "applicable si": "montant > 0",
        "titre": "Part déductible",
        "description": "Part déductible de la prise en charge du carburant",
        "valeur": "montant",
        "plafond": {
          "non applicable si": "véhicule electrique hybride hydrogène",
          "variations": [
            {
              "si": "date < 01/2022",
              "alors": "200 €/an"
            },
            {
              "si": "établissement . commune . département . outre-mer",
              "alors": "600 €/an"
            },
            {
              "sinon": "400 €/an"
            }
          ]
        }
      },
      "véhicule electrique hybride hydrogène": {
        "question": "Le salarié utilise-t'il un véhicules électriques, hybrides rechargeables ou à hydrogène ?",
        "par défaut": "non"
      }
    }
  },
  "salarié . rémunération . frais professionnels . trajets domicile travail . forfait mobilités durables": {
    "non applicable si": "régimes spécifiques . DFS",
    "icônes": "🚲️",
    "avec": {
      "montant": {
        "question": "Quel montant des frais de transports de mobilité durable (vélo, covoiturage, mobilité partagée) est pris en charge par l'employeur ?",
        "unité": "€/an",
        "par défaut": "0 €/an",
        "description": "Afin de promouvoir des moyens de transport plus écologiques, le forfait mobilités durables offre aux employeurs la possibilité d’attribuer une indemnité exonérée de cotisations aux salariés privilégiant les modes de transport dits « à mobilité douce » pour effectuer leurs trajets entre leur résidence habituelle et leur lieu de travail.\n\nLe forfait mobilités durables se substitue aux indemnités kilométriques vélo et aux indemnités forfaitaires de covoiturage.\n\nLes conditions et les modalités d’application du forfait mobilités durables diffèrent selon les secteurs visés. Pour connaître les modalités d’application dans le secteur public, consultez la page dédiée.\n\n### Conditions d'application\n\nPour favoriser les transports dits « à mobilité douce », les employeurs ont la possibilité de prendre en charge les frais de trajets des salariés qui se rendent au travail en utilisant les modes de déplacement suivants :\n\n- le vélo, avec ou sans assistance électrique ;\n- le covoiturage en tant que conducteur ou passager ;\n- les transports publics de personnes (autres que ceux concernés par la prise en charge obligatoire des frais d’abonnement) ;\n- les autres services de mobilité partagée.\n",
        "références": {
          "Forfait mobilité durable": "https://entreprendre.service-public.fr/vosdroits/F33808",
          "FAQ : le forfait mobilités durables": "https://www.ecologie.gouv.fr/faq-forfait-mobilites-durables-fmd",
          "Forfait mobilité durable : Comment ça marche ? (pdf)": "https://www.urssaf.fr/portail/files/live/sites/urssaf/files/documents/FMD-Comment-ca-marche.pdf",
          "Articles R3261-13-1 à -13-2 du code du travail, version 11/05/2020": "https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006072050/LEGISCTA000018487476/2020-05-11",
          "Article 81 du code des impôts, version en vigueur au 31/12/2020": "https://www.legifrance.gouv.fr/codes/id/LEGIARTI000042910732/2020-12-31/"
        }
      }
    }
  },
  "salarié . rémunération . avantages en nature": {
    "icônes": "🛏️🚗🥗📱",
    "titre": "Avantages en nature",
    "description": "Les avantages en nature sont constitués par la fourniture par l’entreprise à ses travailleurs d’un bien ou service. La mise à disposition peut être gratuite ou moyennant une participation du bénéficiant inférieure à leur valeur réelle.\n\nL’avantage en nature doit figurer sur le bulletin de paie. Il sera indiqué au niveau du salaire brut pour être soumis à cotisations. Après détermination du salaire net imposable, il sera déduit du salaire net à verser.\n",
    "question": "L'entreprise fournit-elle des avantages en nature (repas, véhicule, téléphone, réductions, logement...) ?",
    "par défaut": "non",
    "avec": {
      "montant": {
        "titre": "Avantages en nature",
        "description": "Les avantages en nature sont soumis aux cotisations et à l'impôt sur le revenu. Ils sont pris en compte pour vérifier que le salaire minimum est atteint.\n",
        "formule": {
          "somme": [
            "nourriture . montant",
            "ntic . montant",
            "autres . montant"
          ]
        }
      },
      "ntic": {
        "icônes": "💻📱",
        "description": "L’usage privé des outils NTIC mis à disposition dans le cadre de l’activité professionnelle à titre permanent est constitutif d’un avantage en nature.\n\n\nCet avantage est inclus dans la base de calcul des cotisations de Sécurité sociale et d’assurance chômage.\n\n\nLa réalité de l’usage privé peut résulter soit d’un document écrit (contrat de travail, accord d’entreprise, règlement intérieur, courrier de la direction de l’entreprise autorisant le salarié à faire un usage privé des outils), soit de l’existence de factures détaillées permettant d’établir une utilisation privée.\n",
        "question": "L'entreprise fournit-elle gratuitement un outil issus des NTIC (ordinateur, téléphone, tablette, etc.) ?\n",
        "par défaut": "oui",
        "avec": {
          "montant": {
            "titre": "outils NTIC",
            "description": "Pour les avantages en nature de type NTIC (ordinateurs, smartphones, tablettes...), il y a une évaluation forfaitaire annuelle correspondant à 10% du prix d'achat. Par exemple, pour un téléphone acheté à 850€ TTC avec un abonnement de 30€ / mois, l'avantage en nature à reporter sur le bulletin de paie sera de :\n\n```\n[10% x (850€ + (30€ x 12 mois)) ] / 12 mois\n```\nsoit 10,08€\n",
            "produit": {
              "assiette": {
                "somme": [
                  "coût appareils",
                  "abonnements * 12 mois"
                ]
              },
              "taux": "10% /an"
            },
            "références": {
              "urssaf.fr": "https://www.urssaf.fr/portail/home/employeur/calculer-les-cotisations/les-elements-a-prendre-en-compte/les-avantages-en-nature/les-outils-issus-des-nouvelles-t/dans-quel-cas-la-mise-a-disposit/levaluation-forfaitaire.html"
            }
          },
          "coût appareils": {
            "question": "Quel est le coût total neuf des appareils mis à disposition ?\n",
            "par défaut": "800 €",
            "suggestions": {
              "📱": "400 €",
              "📱✨ (haut de gamme)": "850 €",
              "💻": "1200 €",
              "💻 + 📱✨": "2050 €"
            }
          },
          "abonnements": {
            "question": "Quel est le coût de l'abonnement (forfait mobile, etc.) pris en charge par l'employeur ?",
            "par défaut": "20 €/mois",
            "suggestions": {
              "aucun": "0 €/mois",
              "standard": "20 €/mois",
              "international": "40 €/mois"
            }
          }
        }
      },
      "nourriture": {
        "icônes": "🍝",
        "question": "L'entreprise fournit-elle gratuitement des repas ?\n",
        "par défaut": "non",
        "description": "Les titres-restaurant ne sont pas considérés comme un avantage en nature mais comme un remboursement de frais.\n",
        "avec": {
          "montant": {
            "titre": "nourriture",
            "unité": "€/mois",
            "formule": {
              "produit": {
                "assiette": {
                  "valeur": "5 €/repas",
                  "nom": "repas forfaitaire"
                },
                "facteur": "repas par mois"
              }
            },
            "références": {
              "urssaf.fr": "https://www.urssaf.fr/portail/home/taux-et-baremes/avantages-en-nature/nourriture.html"
            }
          },
          "repas par mois": {
            "question": "Combien de repas par mois sont payés par l'entreprise ?\n",
            "par défaut": "21 repas/mois",
            "suggestions": {
              "1 par jour": "21 repas/mois",
              "2 par jour": "42 repas/mois"
            }
          }
        }
      },
      "autres": {
        "question": "Y a-t-il d'autres avantages en natures (logement, véhicule, réduction...) ?\n",
        "par défaut": "non",
        "avec": {
          "montant": {
            "titre": "autres",
            "question": "Quel est le montant de ces autres avantages ?\n",
            "par défaut": "0 €/mois",
            "suggestions": {
              "🚗 véhicule": "260 €/mois"
            }
          }
        }
      }
    }
  },
  "salarié": {
    "icônes": "🤝",
    "valeur": "oui"
  },
  "salarié . ancienneté": {
    "durée": {
      "depuis": "contrat . date d'embauche"
    }
  },
  "salarié . convention collective": {
    "experimental": "oui",
    "par défaut": "'droit commun'",
    "question": "Quelle convention collective est applicable à l'entreprise ?",
    "formule": {
      "une possibilité": {
        "choix obligatoire": "oui",
        "possibilités": [
          "droit commun",
          "HCR",
          "BTP",
          "sport",
          "SVP",
          "compta",
          "optique"
        ]
      }
    },
    "avec": {
      "droit commun": "convention collective = 'droit commun'",
      "contrôle décharge": {
        "type": "notification",
        "sévérité": "avertissement",
        "valeur": "convention collective != 'droit commun'",
        "description": "Attention : l'implémentation des conventions collective est encore partielle et non vérifiée. Néanmoins, cela permet d'obtenir une première estimation, plus précise que le régime général."
      }
    }
  },
  "salarié . régimes spécifiques": null,
  "salarié . régimes spécifiques . alsace moselle": {
    "titre": "Régime Alsace-Moselle",
    "description": "Nous considérons qu'un salarié est affilié au régime Alsace-Moselle quand l'établissement dans lequel il travaille est situé dans ces départements.\n\nAttention : c'est une **simplification** : l'affiliation est plus compliquée que celà, voir les conditions exactes [sur le site du régime](https://regime-local.fr/affiliation/).\n",
    "par défaut": "non",
    "une de ces conditions": [
      "établissement . commune . département = 'Bas-Rhin'",
      "établissement . commune . département = 'Haut-Rhin'",
      "établissement . commune . département = 'Moselle'"
    ]
  },
  "salarié . régimes spécifiques . alsace moselle . ATMP": {
    "avec": {
      "seuil taux mixte ou individuel": {
        "remplace": "cotisations . ATMP . seuil taux mixte ou individuel",
        "valeur": "50 employés"
      },
      "taux fonctions support": {
        "référence": {
          "Annexe de l'Arrêté du 24 décembre 2021 Relatif à la tarification des risques d'accidents du travail et de maladies professionnelles pour l'année 2022": "https://www.legifrance.gouv.fr/jorf/article_jo/JORFARTI000044616039"
        },
        "remplace": "cotisations . ATMP . taux fonctions support . montant",
        "valeur": "0.86%"
      }
    }
  },
  "salarié . régimes spécifiques . impatriés": {
    "question": "Le salarié bénéficie-t-il du régime des impatriés ?",
    "non applicable si": "situation personnelle . domiciliation fiscale à l'étranger",
    "par défaut": "non",
    "description": "Si vous êtes salarié ou dirigeant fiscalement assimilé, et si vous avez été appelé par une entreprise étrangère à occuper un emploi dans une entreprise établie en France ayant un lien avec la première ou si vous avez été directement recruté à l’étranger par une entreprise établie en France, vous pouvez bénéficier du régime spécifiques des impatriés.\n\nVous devez en outre ne pas avoir été fiscalement domicilié en France les cinq années civiles précédant celle de la prise de fonctions et fixer en France votre domicile fiscal dès votre prise de fonctions.\n\nLes impatriés sont exonérés de cotisations retraite (régime de base et complémentaire) à condition de justifier d'une contribution minimale versée par ailleurs (par exemple dans une caisse de retraite ou un fond de pension étranger). Ils n’acquièrent aucun droit pendant la durée d’exonération.\n",
    "note": "La durée d’application est fixée au maximum jusqu’au 31 décembre de la huitième année civile suivant la prise de fonctions dans l’entreprise d’accueil.",
    "rend non applicable": [
      "cotisations . vieillesse",
      "cotisations . retraite complémentaire"
    ],
    "références": {
      "impots.gouv.fr": "https://www.impots.gouv.fr/portail/particulier/questions/puis-je-beneficier-du-regime-des-impatries",
      "bofip": "http://bofip.impots.gouv.fr/bofip/5694-PGP",
      "Article 155B du Code général des impôts": "https://www.legifrance.gouv.fr/affichCodeArticle.do?cidTexte=LEGITEXT000006069577&idArticle=LEGIARTI000006307476&dateTexte=&categorieLien=cid"
    },
    "avec": {
      "information": {
        "type": "notification",
        "description": "Pour bénéficier de l'exonération de cotisations vieillesse, il faut remplir les conditions suivantes :\n- Pouvoir justifier d'une contribution minimale versée ailleurs pour une assurance vieillesse\n- Ne pas avoir été affilié, au cours des cinq années civiles précédant celle de la prise de fonctions, à un régime français obligatoire d'assurance vieillesse, sauf pour des activités accessoires, de caractère saisonnier ou pour les études.\n\n[Lire le texte de loi](https://www.legifrance.gouv.fr/codes/id/LEGISCTA000038510929)"
      }
    }
  },
  "salarié . régimes spécifiques . DFS": {
    "titre": "déduction forfaitaire spécifique",
    "acronyme": "DFS",
    "description": "Pour une liste précise de professions, l'employeur peut pratiquer une déduction forfaitaire spécifique (DFS) pour frais professionnels sur la base de calcul des cotisations sociales. spécifique consiste en un abattement sur l'assiette des cotisations sociales. Elle peut s'appliquer si le salarié supporte effectivement des frais lors de son activité professionnelle.\nEn l’absence de frais effectivement engagés, ou si l’employeur prend en charge ou rembourse la totalité des frais professionnels, il est impossible d’appliquer la DFS.",
    "question": "Le salarié bénéficie-t-il d'une déduction forfaitaire spécifique ?",
    "par défaut": "non",
    "remplace": {
      "règle": "cotisations . assiette",
      "par": {
        "valeur": "cotisations . assiette",
        "abattement": {
          "valeur": "taux * cotisations . assiette",
          "plafond": "7600 €/an"
        },
        "plancher": "assiette minimale"
      },
      "sauf dans": "salarié . cotisations . CSG-CRDS"
    },
    "références": {
      "Fiche Urssaf.fr": "https://www.urssaf.fr/portail/home/employeur/calculer-les-cotisations/les-elements-a-prendre-en-compte/les-frais-professionnels/la-deduction-forfaitaire-specifi.html"
    },
    "avec": {
      "taux": {
        "variations": [
          {
            "si": "profession = 'journaliste'",
            "alors": "20%"
          },
          {
            "si": "profession = 'ouvrier du bâtiment'",
            "alors": "10%"
          },
          {
            "si": "profession = 'artiste musicien'",
            "alors": "20%"
          },
          {
            "si": "profession = 'pilote de ligne ou personnel navigant'",
            "alors": "30%"
          },
          {
            "sinon": "0%"
          }
        ],
        "par défaut": "10%",
        "références": {
          "Circulaire DSS": "https://solidarites-sante.gouv.fr/fichiers/bo/2005/05-09/a0090046.htm"
        }
      },
      "assiette minimale": {
        "recalcul": {
          "règle": "rémunération . assiette de vérification du SMIC",
          "avec": {
            "contrat . salaire brut": "SMIC . horaire * temps de travail . effectif"
          }
        }
      }
    }
  },
  "salarié . régimes spécifiques . DFS . profession": {
    "question": "Quelle est la profession du salarié pour l'application de la déduction forfaitaire spécifique ?",
    "formule": {
      "une possibilité": {
        "possibilités": [
          "journaliste",
          "ouvrier du bâtiment",
          "artiste musicien",
          "pilote de ligne ou personnel navigant"
        ],
        "choix obligatoire": "oui"
      }
    },
    "avec": {
      "journaliste": {
        "valeur": "profession = 'journaliste'",
        "icônes": "✒",
        "description": "Concerne les journalistes, rédacteurs, photographes, directeurs de journaux Critiques dramatiques et musicaux."
      },
      "ouvrier du bâtiment": {
        "icônes": "👷‍♂️",
        "description": "Concerne les ouvriers du bâtiment visés aux paragraphes 1er et 2 de l’article 1er du décret du 17 novembre 1936, à l’exclusion de ceux qui travaillent en usine ou en atelier."
      },
      "artiste musicien": {
        "icônes": "🎼",
        "description": "Concerne les artistes musiciens, choristes, chefs d’orchestre, régisseurs de théâtre"
      },
      "pilote de ligne ou personnel navigant": {
        "icônes": "✈",
        "description": "Concerne les pilotes, radios, mécaniciens navigants des compagnies de transports aériens ; pilotes et mécaniciens employés par les maisons de construction d’avions et de moteurs pour l’essai de prototypes ; pilotes moniteurs d’aéro-clubs et des écoles d’aviation civile"
      }
    }
  },
  "salarié . régimes spécifiques . DFS . profession . journaliste . réduction de taux": {
    "remplace": [
      {
        "règle": "cotisations . vieillesse . employeur . plafonnée . taux",
        "par": "cotisations . vieillesse . employeur . plafonnée . taux * réduction de taux"
      },
      {
        "règle": "cotisations . vieillesse . employeur . déplafonnée . taux",
        "par": "cotisations . vieillesse . employeur . déplafonnée . taux * réduction de taux"
      },
      {
        "règle": "cotisations . vieillesse . salarié . plafonnée . taux",
        "par": "cotisations . vieillesse . salarié . plafonnée . taux * réduction de taux"
      },
      {
        "règle": "cotisations . vieillesse . salarié . déplafonnée . taux",
        "par": "cotisations . vieillesse . salarié . déplafonnée . taux * réduction de taux"
      },
      {
        "règle": "cotisations . allocations familiales . taux",
        "par": "cotisations . allocations familiales . taux * réduction de taux"
      },
      {
        "règle": "cotisations . versement mobilité",
        "par": "cotisations . versement mobilité * réduction de taux"
      },
      {
        "règle": "cotisations . ATMP . taux",
        "par": "cotisations . ATMP . taux * réduction de taux"
      },
      {
        "règle": "cotisations . ATMP . taux minimum",
        "par": "cotisations . ATMP . taux minimum * réduction de taux"
      }
    ],
    "valeur": "80%"
  },
  "salarié . régimes spécifiques . DFS . profession . journaliste . abattement fiscal": {
    "remplace": "rémunération . net . imposable",
    "titre": "net imposable journaliste",
    "formule": {
      "valeur": "rémunération . net . imposable",
      "abattement": "7650€/an"
    }
  },
  "salarié . régimes spécifiques . taxe sur les salaires": {
    "applicable si": "entreprise . TVA = non",
    "unité": "€/an",
    "description": "La taxe sur les salaires en France est un impôt progressif créé en 1948 que certains employeurs doivent acquitter sur les salaires qu'ils distribuent.",
    "barème": {
      "assiette": {
        "somme": [
          "cotisations . assiette",
          "cotisations . prévoyances . employeur"
        ],
        "abattement": "rémunération . net . imposable . exonération prime d'impatriation"
      },
      "tranches": [
        {
          "taux": "4.25%",
          "plafond": "8004 €/an"
        },
        {
          "taux": "8.5%",
          "plafond": "15981 €/an"
        },
        {
          "taux": "13.6%"
        }
      ]
    },
    "note": "Nous n'implémentons pas les taux spécifiques pour l'outre-mer, ni la décôte",
    "références": {
      "Taxe sur les salaires": "https://www.service-public.fr/professionnels-entreprises/vosdroits/F22576",
      "Exonérations spécifiques à la taxe sur les salaires": "http://bofip.impots.gouv.fr/bofip/6691-PGP.html"
    }
  },
  "salarié . coût total employeur": {
    "identifiant court": "cout-total-employeur",
    "synonymes": [
      "salaire chargé"
    ],
    "résumé": "Dépensé par l'entreprise",
    "question": "Quel est le coût total de cette embauche ?",
    "description": "Coût total d'embauche d'un salarié en incluant, en plus des éléments de rémunération, les aides différées.\n> C'est donc aussi une mesure de la valeur apportée par le salarié à l'entreprise : l'employeur est prêt à verser cette somme en contrepartie du travail fourni.\n\nÀ ce coût total, il ne faut pas oublier d'ajouter les dépenses spécifiques à votre entreprise : recherche du bon candidat, poste de travail, équipement, formation initiale, médecine du travail, etc.\n",
    "somme": [
      "rémunération . brut",
      "cotisations . employeur",
      "activité partielle . indemnités",
      "régimes spécifiques . taxe sur les salaires"
    ],
    "abattement": "aides",
    "unité": "€/mois"
  },
  "salarié . temps de travail": {
    "icônes": "🕰️",
    "unité": "heures/mois",
    "somme": [
      "contrat . temps de travail",
      "heures supplémentaires",
      "heures complémentaires"
    ],
    "description": "En France, la base légale du travail est de 35h/semaine. Mais un grand nombre de dispositions existantes permettent de faire varier ce nombre. Vous pouvez les retrouver sur la page [service-public.fr](https://www.service-public.fr/particuliers/vosdroits/N458) dédiée.",
    "avec": {
      "quotité": {
        "description": "Temps de travail en proportion du temps complet légal.",
        "valeur": "temps de travail / durée légale . mensuelle",
        "plafond": "100%",
        "unité": "%"
      },
      "SMIC": {
        "description": "Plusieurs réductions de cotisations ([réduction générale](/documentation/contrat-salarié/réduction-générale), taux réduit d'[allocations familiales](/documentation/contrat-salarié/allocations-familiales/taux-réduit) et de [maladie](/documentation/contrat-salarié/maladie/taux-employeur/taux-réduit), réduction outre-mer) reposent sur un paramètre SMIC faisant l'objet de plusieurs ajustements pour prendre en compte le temps de travail effectif.\n\nLes heures supplémentaires et les heures complémentaires sont prises en\ncompte sans tenir compte de la majoration.\n",
        "formule": "temps de travail * SMIC . horaire",
        "références": {
          "Détermination du SMIC": "https://www.urssaf.fr/portail/home/employeur/beneficier-dune-exoneration/exonerations-generales/la-reduction-generale/le-calcul-de-la-reduction/etape-1--determination-du-coeffi/determination-du-smic-a-prendre.html"
        }
      },
      "plafond sécurité sociale": {
        "titre": "plafond sécurité sociale proratisé",
        "acronyme": "PSS",
        "unité": "€/mois",
        "valeur": "plafond sécurité sociale * temps de travail . effectif . quotité",
        "plancher": "1 €/mois"
      }
    }
  },
  "salarié . temps de travail . effectif": {
    "titre": "temps de travail effectif",
    "valeur": "temps de travail",
    "abattement": "activité partielle . heures chômées",
    "avec": {
      "quotité": {
        "description": "Le plafond de la sécurité sociale doit être pro-ratisé en retirant les absences ainsi que les jours passés au chômage partiel.",
        "valeur": "temps de travail . effectif / durée légale . mensuelle",
        "unité": "%"
      }
    }
  },
  "salarié . temps de travail . heures supplémentaires": {
    "description": "Toute heure de travail accomplie, à la demande de l'employeur, au-delà de la durée légale de 35 heures (ou de la durée équivalente) est une heure supplémentaire. Les heures supplémentaires ouvrent droit à une rémunération plus favorable (taux horaire majoré) au salarié.",
    "titre": "Nombre d'heures supplémentaires",
    "non applicable si": "contrat . temps de travail . temps partiel",
    "question": "Combien d'heures supplémentaires (non récupérées en repos) sont effectuées ?",
    "par défaut": "0 heures/mois",
    "suggestions": {
      "aucune": "0 heures/mois",
      "39h / semaine": "17.33 heures/mois",
      "42h / semaine": "30.33 heures/mois"
    },
    "références": {
      "service-public.fr": "https://www.service-public.fr/particuliers/vosdroits/F2391"
    },
    "avec": {
      "contrôle 44h max": {
        "type": "notification",
        "formule": {
          "toutes ces conditions": [
            "heures supplémentaires > 9 heures/semaine * période . semaines par mois",
            "heures supplémentaires <= 13 heures/semaine * période . semaines par mois"
          ]
        },
        "description": "La durée hebdomadaire moyenne de travail ne peut pas dépasser 44h"
      },
      "contrôle 48h max": {
        "type": "notification",
        "sévérité": "avertissement",
        "formule": "heures supplémentaires > 13 heures/semaine * période . semaines par mois",
        "description": "La durée hebdomadaire maximale de travail ne peut pas dépasser 48h"
      }
    }
  },
  "salarié . temps de travail . heures supplémentaires . majoration": {
    "description": "La rémunération des heures supplémentaires fait l'objet d'un ou plusieurs taux de majoration, fixés par convention ou accord collectif d'entreprise ou d'établissement (ou, à défaut, par convention ou accord de branche). Chaque taux est au minimum fixé à 10%.\n\nÀ défaut d'accord ou de convention, les taux de majoration horaire sont fixés à :\n- 25 % pour les 8 premières heures supplémentaires travaillées dans la même semaine (de la 36e à la 43e heure),\n- 50 % pour les heures suivantes.\n",
    "titre": "majoration heures supplémentaires",
    "note": "Pour l'instant, nous implémentons uniquement les taux standards et ceux de la convention HCR (Hôtel café restaurant). Si vous dépendez d'une convention avec des taux spécifiques, merci de nous le signaler à `contact@mon-entreprise.beta.gouv.fr`",
    "unité": "heures/mois",
    "formule": {
      "barème": {
        "assiette": "heures supplémentaires",
        "multiplicateur": "période . semaines par mois",
        "tranches": [
          {
            "taux": "25%",
            "plafond": "8 heures/semaine"
          },
          {
            "taux": "50%"
          }
        ]
      }
    }
  },
  "salarié . temps de travail . heures complémentaires": {
    "description": "Les heures complémentaires sont les heures effectuées par un salarié à temps partiel au delà de son horaire contractuel. Les heures complémentaires ne doivent pas amener le salarié à travailler pour une durée supérieur à la durée légale ou conventionnelle du travail.\n",
    "applicable si": "contrat . temps de travail . temps partiel",
    "question": "Combien d'heures complémentaires (non récupérées en repos) sont effectuées ?",
    "par défaut": "0 heures/mois",
    "avec": {
      "contrôle heures complémentaires 10 pourcents": {
        "type": "notification",
        "formule": "heures complémentaires > seuil légal",
        "description": "Sauf disposition conventionnelle, le nombre d'heures complémentaires ne peut être supérieur à un dixième de la durée contractuelle du temps partiel."
      },
      "contrôle heures complémentaires max": {
        "type": "notification",
        "sévérité": "avertissement",
        "valeur": "contrat . temps de travail + heures complémentaires >= durée légale . mensuelle",
        "description": "Les heures complémentaires ne doivent pas amener le salarié à travailler pour une durée supérieure ou égale à la durée légale du travail (35h)"
      },
      "seuil légal": {
        "description": "Sauf disposition conventionnelle, le nombre d'heures complémentaires ne peut être supérieur à un dixième de la durée contractuelle du temps partiel.\nSi la convention le permet, les heures complémentaire au delà de ce seuil sont rémunérée avec une majoration de 25%",
        "unité": "heures/mois",
        "produit": {
          "assiette": "contrat . temps de travail",
          "taux": "10%"
        },
        "arrondi": "0 décimales"
      }
    }
  },
  "salarié . temps de travail . heures complémentaires . majoration": {
    "description": "La rémunération des heures complémentaire fait l'objet d'un ou plusieurs taux de majoration, fixés par convention ou accord collectif d'entreprise ou d'établissement (ou, à défaut, par convention ou accord de branche). Chaque taux est au minimum fixé à 10%.\nÀ défaut d'accord ou de convention, les taux de majoration horaire sont fixés à : - 10 % pour les heures effectuées dans la limite d'un dixième de la durée contractuelle - 25 % pour les heures suivantes.\n",
    "titre": "majoration heures complémentaires",
    "barème": {
      "assiette": "heures complémentaires",
      "mutliplicateur": null,
      "tranches": [
        {
          "taux": "10%",
          "plafond": "seuil légal"
        },
        {
          "taux": "25%"
        }
      ]
    }
  },
  "salarié . temps de travail . durée légale": {
    "déprécié": "oui",
    "valeur": "durée légale du travail",
    "avec": {
      "mensuelle": "durée légale du travail . mensuelle"
    }
  },
  "situation personnelle": {
    "experimental": "oui"
  },
  "situation personnelle . RSA": {
    "titre": "bénéficiaire RSA ou prime d'activité",
    "question": "Etes-vous bénéficiaire du RSA ou de la prime d’activité ?",
    "par défaut": "non"
  },
  "situation personnelle . domiciliation fiscale à l'étranger": {
    "titre": "Résidence fiscale hors de France",
    "description": "Si la résidence fiscale est située hors de France, les revenus d’activité ne sont pas soumis à la CSG-CRDS.\n\nUne cotisation maladie majorée sera en revanche applicable.\n",
    "question": {
      "variations": [
        {
          "si": "dirigeant",
          "alors": {
            "texte": "Votre résidence fiscale est-elle située hors de France ?"
          }
        },
        {
          "sinon": {
            "texte": "La résidence fiscale du salarié est-elle située hors de France ?"
          }
        }
      ]
    },
    "rend non applicable": [
      "dirigeant . indépendant . cotisations et contributions . CSG-CRDS",
      "salarié . cotisations . CSG-CRDS"
    ],
    "par défaut": "non",
    "références": {
      "urssaf.fr": "https://www.urssaf.fr/portail/home/employeur/calculer-les-cotisations/les-taux-de-cotisations/la-csg-crds/qui-en-est-redevable.html"
    }
  }
}
