// Currency Converter Application
// Using ExchangeRate-API (free tier)

$(document).ready(function() {
    // Configuration
    const API_BASE_URL = 'https://api.exchangerate-api.com/v4/latest/';

    // Currency data with African currencies first
    const africanCurrencies = {
        'XOF': { name: 'Franc CFA (Afrique de l\'Ouest)', country: 'UEMOA' },
        'XAF': { name: 'Franc CFA (Afrique Centrale)', country: 'CEMAC' },
        'DZD': { name: 'Dinar Algérien', country: 'Algérie' },
        'AOA': { name: 'Kwanza Angolais', country: 'Angola' },
        'BWP': { name: 'Pula Botswanais', country: 'Botswana' },
        'BIF': { name: 'Franc Burundais', country: 'Burundi' },
        'CVE': { name: 'Escudo Cap-Verdien', country: 'Cap-Vert' },
        'KMF': { name: 'Franc Comorien', country: 'Comores' },
        'DJF': { name: 'Franc Djiboutien', country: 'Djibouti' },
        'EGP': { name: 'Livre Égyptienne', country: 'Égypte' },
        'ERN': { name: 'Nakfa Érythréen', country: 'Érythrée' },
        'SZL': { name: 'Lilangeni Eswatinien', country: 'Eswatini' },
        'ETB': { name: 'Birr Éthiopien', country: 'Éthiopie' },
        'GMD': { name: 'Dalasi Gambien', country: 'Gambie' },
        'GHS': { name: 'Cedi Ghanéen', country: 'Ghana' },
        'GNF': { name: 'Franc Guinéen', country: 'Guinée' },
        'KES': { name: 'Shilling Kényan', country: 'Kenya' },
        'LSL': { name: 'Loti Lesothan', country: 'Lesotho' },
        'LRD': { name: 'Dollar Libérien', country: 'Libéria' },
        'LYD': { name: 'Dinar Libyen', country: 'Libye' },
        'MGA': { name: 'Ariary Malgache', country: 'Madagascar' },
        'MWK': { name: 'Kwacha Malawite', country: 'Malawi' },
        'MUR': { name: 'Roupie Mauricienne', country: 'Maurice' },
        'MAD': { name: 'Dirham Marocain', country: 'Maroc' },
        'MZN': { name: 'Metical Mozambicain', country: 'Mozambique' },
        'NAD': { name: 'Dollar Namibien', country: 'Namibie' },
        'NGN': { name: 'Naira Nigérian', country: 'Nigeria' },
        'UGX': { name: 'Shilling Ougandais', country: 'Ouganda' },
        'RWF': { name: 'Franc Rwandais', country: 'Rwanda' },
        'STN': { name: 'Dobra Santoméen', country: 'Sao Tomé-et-Principe' },
        'SCR': { name: 'Roupie Seychelloise', country: 'Seychelles' },
        'SLL': { name: 'Leone Sierra-Léonais', country: 'Sierra Leone' },
        'SOS': { name: 'Shilling Somalien', country: 'Somalie' },
        'ZAR': { name: 'Rand Sud-Africain', country: 'Afrique du Sud' },
        'SSP': { name: 'Livre Sud-Soudanaise', country: 'Soudan du Sud' },
        'SDG': { name: 'Livre Soudanaise', country: 'Soudan' },
        'TZS': { name: 'Shilling Tanzanien', country: 'Tanzanie' },
        'TND': { name: 'Dinar Tunisien', country: 'Tunisie' },
        'ZMW': { name: 'Kwacha Zambien', country: 'Zambie' },
        'MRU': { name: 'Ouguiya Mauritanien', country: 'Mauritanie' }
    };

    const worldCurrencies = {
        'EUR': { name: 'Euro', region: 'Europe' },
        'USD': { name: 'Dollar Américain', region: 'Amérique du Nord' },
        'GBP': { name: 'Livre Sterling', region: 'Royaume-Uni' },
        'JPY': { name: 'Yen Japonais', region: 'Asie' },
        'CHF': { name: 'Franc Suisse', region: 'Europe' },
        'CAD': { name: 'Dollar Canadien', region: 'Amérique du Nord' },
        'AUD': { name: 'Dollar Australien', region: 'Océanie' },
        'CNY': { name: 'Yuan Chinois', region: 'Asie' },
        'INR': { name: 'Roupie Indienne', region: 'Asie' },
        'BRL': { name: 'Real Brésilien', region: 'Amérique du Sud' },
        'RUB': { name: 'Rouble Russe', region: 'Europe' },
        'KRW': { name: 'Won Sud-Coréen', region: 'Asie' },
        'MXN': { name: 'Peso Mexicain', region: 'Amérique du Nord' },
        'SGD': { name: 'Dollar de Singapour', region: 'Asie' },
        'HKD': { name: 'Dollar de Hong Kong', region: 'Asie' },
        'NOK': { name: 'Couronne Norvégienne', region: 'Europe' },
        'SEK': { name: 'Couronne Suédoise', region: 'Europe' },
        'DKK': { name: 'Couronne Danoise', region: 'Europe' },
        'PLN': { name: 'Zloty Polonais', region: 'Europe' },
        'THB': { name: 'Baht Thaïlandais', region: 'Asie' },
        'IDR': { name: 'Roupie Indonésienne', region: 'Asie' },
        'MYR': { name: 'Ringgit Malaisien', region: 'Asie' },
        'PHP': { name: 'Peso Philippin', region: 'Asie' },
        'NZD': { name: 'Dollar Néo-Zélandais', region: 'Océanie' },
        'ARS': { name: 'Peso Argentin', region: 'Amérique du Sud' },
        'CLP': { name: 'Peso Chilien', region: 'Amérique du Sud' },
        'COP': { name: 'Peso Colombien', region: 'Amérique du Sud' },
        'TRY': { name: 'Livre Turque', region: 'Asie' },
        'SAR': { name: 'Riyal Saoudien', region: 'Moyen-Orient' },
        'AED': { name: 'Dirham des Émirats', region: 'Moyen-Orient' }
    };

    // Local storage keys
    const STORAGE_KEYS = {
        favorites: 'currencyFavorites',
        history: 'currencyHistory'
    };

    // Global variables
    let currentRates = {};
    let conversionHistory = loadFromStorage(STORAGE_KEYS.history) || [];
    let favorites = loadFromStorage(STORAGE_KEYS.favorites) || [];

    // Initialize application
    init();

    function init() {
        initializeSelect2();
        setupEventListeners();
        loadAllRates();
        renderFavorites();
        renderHistory();
        setActivePage();
    }

    // Initialize Select2 for currency selects
    function initializeSelect2() {
        $('.currency-select').select2({
            theme: 'bootstrap-5',
            placeholder: 'Rechercher une devise...',
            allowClear: false,
            width: '100%',
            language: {
                noResults: function() {
                    return "Aucune devise trouvée";
                },
                searching: function() {
                    return "Recherche en cours...";
                }
            }
        });

        // Handle change event for Select2
        $('.currency-select').on('select2:select', function() {
            if ($('#fromAmount').val()) {
                convertCurrency();
            }
        });
    }

    // Event Listeners
    function setupEventListeners() {
        // Sidebar toggle for mobile
        $('#sidebarToggle').on('click', function() {
            $('#sidebar').toggleClass('show');
            if ($('#sidebar').hasClass('show')) {
                $('body').append('<div class="sidebar-overlay show"></div>');
                $('.sidebar-overlay').on('click', function() {
                    $('#sidebar').removeClass('show');
                    $(this).remove();
                });
            }
        });

        // Navigation - Sidebar
        $('.sidebar-link').on('click', function(e) {
            e.preventDefault();
            const target = $(this).attr('href');
            navigateToSection(target);

            // Close sidebar on mobile
            if ($(window).width() < 992) {
                $('#sidebar').removeClass('show');
                $('.sidebar-overlay').remove();
            }
        });

        // Navigation - Mobile bottom nav
        $('.mobile-bottom-nav .nav-item').on('click', function(e) {
            e.preventDefault();
            const target = $(this).attr('href');
            navigateToSection(target);
        });

        // Converter form submit
        $('#converterForm').on('submit', function(e) {
            e.preventDefault();
            convertCurrency();
        });

        // Auto-convert on input change (currency selects handled by Select2 listener)
        $('#fromAmount').on('change input', function() {
            if ($('#fromAmount').val()) {
                convertCurrency();
            }
        });

        // Swap currencies button
        $('#swapBtn').on('click', function() {
            swapCurrencies();
        });

        // Add to favorites
        $('#addToFavorites').on('click', function() {
            addToFavorites();
        });
    }

    // Navigation function
    function navigateToSection(target) {
        const sectionId = target.replace('#', '');

        // Update active section
        $('.section').removeClass('active');
        $('#' + sectionId).addClass('active');

        // Update active nav items
        $('.sidebar ul li').removeClass('active');
        $('.sidebar-link[href="' + target + '"]').parent().addClass('active');

        $('.mobile-bottom-nav .nav-item').removeClass('active');
        $('.mobile-bottom-nav .nav-item[href="' + target + '"]').addClass('active');

        // Scroll to top
        window.scrollTo(0, 0);
    }

    // Set active page on load
    function setActivePage() {
        const hash = window.location.hash || '#converter';
        navigateToSection(hash);
    }

    // Load exchange rates
    function loadAllRates() {
        showLoading();

        $.ajax({
            url: API_BASE_URL + 'EUR',
            method: 'GET',
            dataType: 'json',
            success: function(data) {
                currentRates = data.rates;
                updateLastUpdate(data.date);
                populateAfricanRatesTable();
                populateWorldRatesTable();
                hideLoading();
            },
            error: function(xhr, status, error) {
                console.error('Error loading rates:', error);
                showError('Erreur lors du chargement des taux de change. Veuillez réessayer.');
                hideLoading();
            }
        });
    }

    // Convert currency
    function convertCurrency() {
        const amount = parseFloat($('#fromAmount').val());
        const fromCurrency = $('#fromCurrency').val();
        const toCurrency = $('#toCurrency').val();

        if (!amount || amount <= 0) {
            $('#toAmount').val('');
            return;
        }

        showLoading();

        $.ajax({
            url: API_BASE_URL + fromCurrency,
            method: 'GET',
            dataType: 'json',
            success: function(data) {
                const rate = data.rates[toCurrency];
                const convertedAmount = (amount * rate).toFixed(2);

                $('#toAmount').val(convertedAmount);

                // Display exchange rate
                const rateText = `1 ${fromCurrency} = ${rate.toFixed(4)} ${toCurrency}`;
                $('#rateText').text(rateText);
                $('#rateDisplay').slideDown();

                // Add to history
                addToHistory({
                    from: fromCurrency,
                    to: toCurrency,
                    amount: amount,
                    result: convertedAmount,
                    rate: rate,
                    date: new Date().toISOString()
                });

                hideLoading();
            },
            error: function(xhr, status, error) {
                console.error('Error converting currency:', error);
                showError('Erreur lors de la conversion. Veuillez réessayer.');
                hideLoading();
            }
        });
    }

    // Swap currencies
    function swapCurrencies() {
        const fromCurrency = $('#fromCurrency').val();
        const toCurrency = $('#toCurrency').val();

        $('#fromCurrency').val(toCurrency);
        $('#toCurrency').val(fromCurrency);

        if ($('#fromAmount').val()) {
            convertCurrency();
        }
    }

    // Populate African rates table
    function populateAfricanRatesTable() {
        const tbody = $('#africanRatesTable');
        tbody.empty();

        if (Object.keys(currentRates).length === 0) {
            tbody.append('<tr><td colspan="4" class="text-center">Aucune donnée disponible</td></tr>');
            return;
        }

        $.each(africanCurrencies, function(code, info) {
            if (currentRates[code]) {
                const rate = currentRates[code].toFixed(4);
                const row = `
                    <tr>
                        <td><strong>${info.name}</strong></td>
                        <td><span class="badge bg-primary">${code}</span></td>
                        <td>${info.country}</td>
                        <td>${rate}</td>
                    </tr>
                `;
                tbody.append(row);
            }
        });
    }

    // Populate World rates table
    function populateWorldRatesTable() {
        const tbody = $('#worldRatesTable');
        tbody.empty();

        if (Object.keys(currentRates).length === 0) {
            tbody.append('<tr><td colspan="4" class="text-center">Aucune donnée disponible</td></tr>');
            return;
        }

        $.each(worldCurrencies, function(code, info) {
            if (currentRates[code]) {
                const rate = currentRates[code].toFixed(4);
                const row = `
                    <tr>
                        <td><strong>${info.name}</strong></td>
                        <td><span class="badge bg-success">${code}</span></td>
                        <td>${info.region}</td>
                        <td>${rate}</td>
                    </tr>
                `;
                tbody.append(row);
            }
        });
    }

    // Add to history
    function addToHistory(conversion) {
        conversionHistory.unshift(conversion);

        // Keep only last 50 conversions
        if (conversionHistory.length > 50) {
            conversionHistory = conversionHistory.slice(0, 50);
        }

        saveToStorage(STORAGE_KEYS.history, conversionHistory);
        renderHistory();
    }

    // Render history
    function renderHistory() {
        const container = $('#historyContainer');

        if (conversionHistory.length === 0) {
            container.html(`
                <div class="alert alert-info">
                    <i class="fas fa-info-circle"></i> Aucune conversion dans l'historique.
                </div>
            `);
            return;
        }

        let html = '<div class="row">';

        conversionHistory.forEach(function(item, index) {
            const date = new Date(item.date);
            const dateStr = date.toLocaleDateString('fr-FR') + ' ' + date.toLocaleTimeString('fr-FR');

            html += `
                <div class="col-12 col-md-6 col-lg-4 mb-3">
                    <div class="history-item">
                        <h6 class="mb-2">
                            <span class="badge bg-primary">${item.from}</span>
                            <i class="fas fa-arrow-right mx-2"></i>
                            <span class="badge bg-success">${item.to}</span>
                        </h6>
                        <p class="mb-1">
                            ${item.amount} ${item.from} = ${item.result} ${item.to}
                        </p>
                        <small class="text-muted">
                            <i class="far fa-clock"></i> ${dateStr}
                        </small>
                        <button class="btn btn-sm btn-outline-danger float-end" onclick="removeFromHistory(${index})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `;
        });

        html += '</div>';

        // Add clear all button
        html += `
            <div class="text-center mt-3">
                <button class="btn btn-danger" onclick="clearHistory()">
                    <i class="fas fa-trash-alt"></i> Effacer tout l'historique
                </button>
            </div>
        `;

        container.html(html);
    }

    // Add to favorites
    function addToFavorites() {
        const fromCurrency = $('#fromCurrency').val();
        const toCurrency = $('#toCurrency').val();

        // Check if already in favorites
        const exists = favorites.some(fav => fav.from === fromCurrency && fav.to === toCurrency);

        if (exists) {
            alert('Cette conversion est déjà dans vos favoris !');
            return;
        }

        favorites.push({
            from: fromCurrency,
            to: toCurrency,
            date: new Date().toISOString()
        });

        saveToStorage(STORAGE_KEYS.favorites, favorites);
        renderFavorites();

        // Show success message
        const btn = $('#addToFavorites');
        const originalHtml = btn.html();
        btn.html('<i class="fas fa-check"></i> Ajouté !').prop('disabled', true);

        setTimeout(function() {
            btn.html(originalHtml).prop('disabled', false);
        }, 2000);
    }

    // Render favorites
    function renderFavorites() {
        const container = $('#favoritesContainer');

        if (favorites.length === 0) {
            container.html(`
                <div class="alert alert-info">
                    <i class="fas fa-info-circle"></i> Aucune conversion favorite pour le moment. Ajoutez vos conversions fréquentes depuis le convertisseur.
                </div>
            `);
            return;
        }

        let html = '<div class="row">';

        favorites.forEach(function(fav, index) {
            html += `
                <div class="col-12 col-md-6 col-lg-4 mb-3">
                    <div class="favorite-item">
                        <h6 class="mb-3">
                            <span class="badge bg-primary">${fav.from}</span>
                            <i class="fas fa-exchange-alt mx-2"></i>
                            <span class="badge bg-success">${fav.to}</span>
                        </h6>
                        <button class="btn btn-sm btn-primary" onclick="useFavorite('${fav.from}', '${fav.to}')">
                            <i class="fas fa-calculator"></i> Utiliser
                        </button>
                        <button class="btn btn-sm btn-outline-danger" onclick="removeFromFavorites(${index})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `;
        });

        html += '</div>';
        container.html(html);
    }

    // Use favorite
    window.useFavorite = function(from, to) {
        $('#fromCurrency').val(from);
        $('#toCurrency').val(to);
        navigateToSection('#converter');
        if ($('#fromAmount').val()) {
            convertCurrency();
        }
    };

    // Remove from favorites
    window.removeFromFavorites = function(index) {
        if (confirm('Voulez-vous supprimer ce favori ?')) {
            favorites.splice(index, 1);
            saveToStorage(STORAGE_KEYS.favorites, favorites);
            renderFavorites();
        }
    };

    // Remove from history
    window.removeFromHistory = function(index) {
        conversionHistory.splice(index, 1);
        saveToStorage(STORAGE_KEYS.history, conversionHistory);
        renderHistory();
    };

    // Clear history
    window.clearHistory = function() {
        if (confirm('Voulez-vous effacer tout l\'historique ?')) {
            conversionHistory = [];
            saveToStorage(STORAGE_KEYS.history, conversionHistory);
            renderHistory();
        }
    };

    // Update last update time
    function updateLastUpdate(date) {
        const dateObj = new Date(date);
        const dateStr = dateObj.toLocaleDateString('fr-FR');
        $('#lastUpdate').html(`<i class="fas fa-sync-alt"></i> Dernière mise à jour: ${dateStr}`);
    }

    // Show loading spinner
    function showLoading() {
        $('#loadingSpinner').show();
    }

    // Hide loading spinner
    function hideLoading() {
        $('#loadingSpinner').hide();
    }

    // Show error message
    function showError(message) {
        alert(message);
    }

    // Local storage helpers
    function saveToStorage(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
        } catch (e) {
            console.error('Error saving to localStorage:', e);
        }
    }

    function loadFromStorage(key) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch (e) {
            console.error('Error loading from localStorage:', e);
            return null;
        }
    }

    // Auto-refresh rates every 5 minutes
    setInterval(function() {
        loadAllRates();
    }, 5 * 60 * 1000);

    // Handle browser back/forward buttons
    $(window).on('hashchange', function() {
        setActivePage();
    });
});
