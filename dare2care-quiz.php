<?php
/**
 * Plugin Name: Dare2Care Quiz
 * Description: A plugin designed specifically for the relationship quiz for the Dare2Care project
 * Version: 1.0.1
 * Author: Karina Klinkevičiūtė, Asociacija Lygiai, Dingusių žmonių šeimų paramos centras
 */

function dare2care( $atts, $content, $tag ) {

    // wp_register_style( 'dare2care', 'https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css' );

    wp_enqueue_style('dare2care-style', plugins_url('dare2care-quiz.css', __FILE__));

    wp_enqueue_script('dare2care-quiz', plugins_url( 'dare2care-quiz.js', __FILE__ ), '', '', true);

    $image_base_url = plugins_url( 'images/', __FILE__ );
    $image_intro_base_url = plugins_url( 'assets/intro.jpg', __FILE__ );

 $content = '<div id="d2c-quiz" class="d2c-quiz-container">
    <div id="d2c-intro" class="d2c-block d2c-quiz-intro"> 
        <img src="'.$image_intro_base_url.'" alt="Meilė nėra kontrolė">
        <div class="d2c-box d2c-quiz-box">
        <h3 class="d2c-quiz-title">Meilė nėra kontrolė</h3>
        Sveiki! Kviečiam atlikti santykių testą, kuris padės įvertinti jūsų santykių sveikumą.
        Testą sudaro 9 klausimai, kurie turi po tris galimus atsakymų variantus. Visos situacijos yra numanomos, nebūtinai jums realiai nutikusios, o atsakydami rinkitės atsakymą pagal tai, kaip galvojate, jog sureaguotų jūsų partneris/partnerė. Kiekvienas klausimas turi po vieną pasirinkimo galimybę.
        Mes suprantame, jog porų gali būti įvairių, tad pavaizduoti personažai yra tik maža dalis porų įvairovės.
        Pabaigę testą, gausite rezultatą, kuris parinktas pagal susumuotus jūsų atsakymų taškus. Po aprašymo pamatysite trumpą kiekvieno jūsų pasirinkto atsakymo komentarą.
        Testą galite kartoti kelis kartus, nes jo klausimai gali skirtis.

        </div>
        <button id="d2c-start" class="d2c-button d2c-block">Pradėti testą</button>
    </div>
    <div id="d2c-situation" d2c-hidden class="d2c-tile d2c-is-ancestor">
        <div class="d2c-tile d2c-is-vertical d2c-is-8 d2c-quiz-tile">
            <div id="d2c-image" class="d2c-quiz-tile__image d2c-image d2c-is-4by3"><img id="d2c-image-tag" src="'.$image_base_url.'" alt=""></div>
            <div class="d2c-quiz-tile__content">
            <div id="d2c-description" class="d2c-tile d2c-is-parent d2c-quiz-question"></div>
            <ul id="d2c-choices" class="d2c-tile d2c-is-parent d2c-quiz-choices">
                <li id="A" class="d2c-box d2c-quiz-answer-box"></li>
                <li id="B" class="d2c-box d2c-quiz-answer-box"></li>
                <li id="C" class="d2c-box d2c-quiz-answer-box"></li>
            </ul>
            <button id="d2c-submit" class="d2c-button">Pateikti</button>
            </div>
        </div>
    </div>
    <div id="d2c-results" class="d2c-tile d2c-is-ancestor d2c-quiz-results">
    </div>
    <div class="d2c-explanations" id="d2c-explanations" hidden>
        <span class="d2c-explanations-title">Atsakymų komentarai:</span>
        <div id = "d2c-explanation" class="d2c-explanation d2c-hidden" style="display:none">
            <div id="d2c-explanation-image" class="d2c-image d2c-is-4by3 d2c-explanation-image"></div>
                <div id="d2c-explanation-description" class="d2c-tile d2c-is-parent d2c-explanation-description"></div>
                <ul id="d2c-explanation-choices" class="d2c-tile d2c-is-parent d2c-explanation-choices">
                    <li id="explanation-A" class="d2c-box d2c-quiz-explanation-box"></li>
                    <li id="explanation-B" class="d2c-box d2c-quiz-explanation-box"></li>
                    <li id="explanation-C" class="d2c-box d2c-quiz-explanation-box"></li>
                </ul>
            <div id="d2c-explanation-text" class="d2c-explanation-text"></div>
        </div>
    </div>
    <div class="d2c-restart-area" hidden><button id="d2c-restart">Pradėti iš naujo</button></div>
</div>';

return $content;

};

// add_shortcode('d2c', 'dare2care');

function register_shortcodes() {
    add_shortcode('d2c', 'dare2care');
};

add_action( 'init', 'register_shortcodes');