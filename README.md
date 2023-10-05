Add below to project.

Style:

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/search-bar-weoja@1.0.16/searchBar/css/autocomplete.css">

Update font-family:

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
Script:

    <script>siteSearchSpecial = 'weoja.com'</script>
    <script src="https://cdn.jsdelivr.net/npm/search-bar-weoja/searchBar@1.0.16/js/autocomplete.js"></script>

<b>siteSearchSpecial variable declaration is required</b>
<b>If you don't have special site to search, let leave it blank</b>
HTML:

    <div class="box">
        <div id="searchBar"></div>
    </div>
    <div id="divBackground" style="display: none;"></div>
