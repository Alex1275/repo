# Convertisseur de Devises Internationales

Application web responsive de conversion de devises avec un focus particulier sur les devises africaines.

## Fonctionnalités

### Conversion de devises
- Conversion en temps réel entre plus de 70 devises internationales
- **Focus sur 40 devises africaines** (le plus complet du marché)
- Taux de change mis à jour quotidiennement
- Conversion Ajax sans rechargement de page
- **Recherche de devises avec Select2** (filtrage en temps réel)
- Affichage du taux de change en temps réel

### Devises Africaines Supportées (40)
- **XOF** - Franc CFA (Afrique de l'Ouest - UEMOA)
- **XAF** - Franc CFA (Afrique Centrale - CEMAC)
- **DZD** - Dinar Algérien
- **AOA** - Kwanza Angolais
- **BWP** - Pula Botswanais
- **BIF** - Franc Burundais
- **CVE** - Escudo Cap-Verdien
- **KMF** - Franc Comorien
- **DJF** - Franc Djiboutien
- **EGP** - Livre Égyptienne
- **ERN** - Nakfa Érythréen
- **SZL** - Lilangeni Eswatinien
- **ETB** - Birr Éthiopien
- **GMD** - Dalasi Gambien
- **GHS** - Cedi Ghanéen
- **GNF** - Franc Guinéen ⭐
- **KES** - Shilling Kényan
- **LSL** - Loti Lesothan
- **LRD** - Dollar Libérien
- **LYD** - Dinar Libyen
- **MGA** - Ariary Malgache
- **MWK** - Kwacha Malawite
- **MUR** - Roupie Mauricienne
- **MAD** - Dirham Marocain
- **MZN** - Metical Mozambicain
- **NAD** - Dollar Namibien
- **NGN** - Naira Nigérian
- **UGX** - Shilling Ougandais
- **RWF** - Franc Rwandais
- **STN** - Dobra Santoméen
- **SCR** - Roupie Seychelloise
- **SLL** - Leone Sierra-Léonais
- **SOS** - Shilling Somalien
- **ZAR** - Rand Sud-Africain
- **SSP** - Livre Sud-Soudanaise
- **SDG** - Livre Soudanaise
- **TZS** - Shilling Tanzanien
- **TND** - Dinar Tunisien
- **ZMW** - Kwacha Zambien
- **MRU** - Ouguiya Mauritanien

### Devises Mondiales Supportées (30+)
- EUR - Euro
- USD - Dollar Américain
- GBP - Livre Sterling
- JPY - Yen Japonais
- CHF - Franc Suisse
- CAD - Dollar Canadien
- AUD - Dollar Australien
- CNY - Yuan Chinois
- INR - Roupie Indienne
- BRL - Real Brésilien
- RUB - Rouble Russe
- KRW - Won Sud-Coréen
- MXN - Peso Mexicain
- SGD - Dollar de Singapour
- HKD - Dollar de Hong Kong
- NOK - Couronne Norvégienne
- SEK - Couronne Suédoise
- DKK - Couronne Danoise
- PLN - Zloty Polonais
- THB - Baht Thaïlandais
- IDR - Roupie Indonésienne
- MYR - Ringgit Malaisien
- PHP - Peso Philippin
- NZD - Dollar Néo-Zélandais
- ARS - Peso Argentin
- CLP - Peso Chilien
- COP - Peso Colombien
- TRY - Livre Turque
- SAR - Riyal Saoudien
- AED - Dirham des Émirats

### Interface Utilisateur
- Design responsive (desktop, tablette, mobile)
- Header fixe avec logo et sélecteur de langue
- Sidebar pour navigation desktop
- Bottom navigation pour mobile
- Animations fluides et transitions
- Interface moderne avec Bootstrap 5

### Fonctionnalités Avancées
- **Recherche intelligente** : Select2 avec filtrage en temps réel par code ou nom de devise
- **Favoris** : Sauvegardez vos conversions fréquentes
- **Historique** : Consultez vos 50 dernières conversions
- **Échange rapide** : Inversez les devises en un clic avec animation
- **Auto-conversion** : Conversion automatique lors de la saisie ou sélection
- **Stockage local** : Vos favoris et historique sont sauvegardés localement
- **Rafraîchissement auto** : Mise à jour des taux toutes les 5 minutes
- **Timeouts API** : Gestion intelligente des erreurs réseau (10s)

## Technologies Utilisées

- **HTML5** : Structure sémantique
- **CSS3** : Styles personnalisés et animations
- **JavaScript ES6** : Logique de l'application
- **jQuery 3.7** : Manipulation du DOM et Ajax
- **Bootstrap 5.3** : Framework CSS responsive
- **Select2 4.1.0** : Recherche et filtrage de devises
- **Font Awesome 6.4** : Icônes
- **ExchangeRate-API** : API gratuite pour les taux de change

## Structure du Projet

```
currency-converter/
├── index.html          # Page principale
├── css/
│   └── style.css      # Styles personnalisés
├── js/
│   └── app.js         # Logique JavaScript
└── assets/            # Ressources (images, etc.)
```

## Installation et Utilisation

### Méthode 1 : Ouverture directe
1. Clonez le dépôt ou téléchargez les fichiers
2. Ouvrez `currency-converter/index.html` dans votre navigateur
3. L'application fonctionne immédiatement (nécessite une connexion Internet)

### Méthode 2 : Serveur local
1. Utilisez un serveur local (Python, Node.js, etc.)
   ```bash
   # Avec Python 3
   cd currency-converter
   python3 -m http.server 8000

   # Avec Node.js (http-server)
   npx http-server currency-converter -p 8000
   ```
2. Ouvrez votre navigateur à `http://localhost:8000`

## API Utilisée

L'application utilise l'API **ExchangeRate-API** (https://www.exchangerate-api.com/)
- API gratuite sans clé d'API requise
- Taux de change mis à jour quotidiennement
- Support de plus de 160 devises
- Pas de limite pour un usage personnel

## Fonctionnement

### Recherche de Devises (Nouveau !)
1. **Cliquez sur un select de devise** → Un champ de recherche apparaît
2. **Tapez pour rechercher** :
   - Par code : "GNF", "XOF", "EUR"
   - Par nom : "Guinéen", "CFA", "Euro"
   - Par pays : "Nigeria", "Ghana", "France"
3. **Les résultats se filtrent en temps réel**
4. **Sélectionnez la devise** → Conversion automatique

### Conversion
1. Saisissez un montant
2. Sélectionnez la devise source avec recherche (40 devises africaines en premier)
3. Sélectionnez la devise cible avec recherche
4. La conversion se fait automatiquement en Ajax
5. Le résultat s'affiche sans rechargement de page
6. Le taux de change est affiché

### Navigation
- **Desktop** : Utilisez la sidebar à gauche
- **Mobile** : Utilisez le menu en bas de l'écran
- Cliquez sur les éléments du menu pour naviguer entre les sections

### Gestion des Favoris
1. Configurez une conversion
2. Cliquez sur "Ajouter aux favoris"
3. Accédez à la section "Favoris" depuis le menu
4. Cliquez sur "Utiliser" pour rappeler une conversion favorite

### Historique
- Toutes vos conversions sont automatiquement sauvegardées
- Consultez l'historique depuis le menu
- Supprimez des éléments individuellement ou effacez tout

## Responsive Design

L'application s'adapte à tous les écrans :

- **Desktop (>992px)** : Sidebar visible, menu complet
- **Tablette (768px-991px)** : Sidebar masquée, bottom navigation
- **Mobile (<768px)** : Interface optimisée, bottom navigation

## Compatibilité Navigateurs

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Opera 76+

## Performances

- Chargement rapide (< 2 secondes)
- Conversion instantanée
- Cache local pour favoris et historique
- Optimisation des requêtes API
- Auto-refresh intelligent des taux

## Améliorations Futures

- [ ] Mode sombre
- [ ] Graphiques historiques des taux
- [ ] Plus de devises africaines
- [ ] Support multilingue (EN, AR, PT)
- [ ] Export PDF des conversions
- [ ] Mode hors ligne avec cache
- [ ] Calculatrice intégrée
- [ ] Alertes de taux

## Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. Forkez le projet
2. Créez une branche (`git checkout -b feature/amelioration`)
3. Committez vos changements (`git commit -m 'Ajout fonctionnalité'`)
4. Poussez vers la branche (`git push origin feature/amelioration`)
5. Ouvrez une Pull Request

## Licence

Ce projet est open source et disponible sous licence MIT.

## Auteur

Développé avec HTML, CSS, JavaScript, Bootstrap, jQuery et Ajax.

## Support

Pour toute question ou problème :
- Ouvrez une issue sur GitHub
- Consultez la section "À propos" dans l'application

## Remerciements

- ExchangeRate-API pour les données de taux de change
- Bootstrap pour le framework CSS
- Font Awesome pour les icônes
- La communauté open source

---

**Note** : Cette application nécessite une connexion Internet pour fonctionner car elle utilise une API externe pour les taux de change en temps réel.
