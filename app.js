// LINE LIFF Configuration
// IMPORTANT: Replace this ID with your actual LIFF ID from LINE Developers Console
const LIFF_ID = "2010450809-BimBJ7uV"; 
let isLiffInitialized = false;
let userProfile = null;

// 40 Symptoms Data Structure (10 questions per element)
const allQuestions = [
    // ธาตุดิน (din)
    { id: "din_1", text: "รู้สึกตัวหนักอึ้ง หรือร่างกายอึดอัดเฉื่อยช้าลงอย่างเห็นได้ชัด", element: "din", weight: 2 },
    { id: "din_2", text: "มีอาการตึง แข็งเกร็งของกล้ามเนื้อ เส้นเอ็น หรือข้อยึดตึงบ่อย ๆ", element: "din", weight: 2 },
    { id: "din_3", text: "ท้องผูกบ่อยครั้ง ขับถ่ายลำบาก หรืออุจจาระแข็งตัวมาก", element: "din", weight: 2 },
    { id: "din_4", text: "ผิวพรรณแห้งกร้าน ตกสะเก็ด หรือแผลตามตัวตกสะเก็ดหายยากกว่าปกติ", element: "din", weight: 1 },
    { id: "din_5", text: "ร่างกายเมื่อยตึงลึก ๆ ตามแนวโครงสร้างกระดูก หรือข้อต่อมีเสียงดังเมื่อเคลื่อนไหว", element: "din", weight: 1 },
    { id: "din_6", text: "รู้สึกแน่นจุกหน้าอกหรืออึดอัดในท้องแบบตื้อ ๆ ตลอดเวลาไม่ว่าจะทานอาหารหรือไม่", element: "din", weight: 1 },
    { id: "din_7", text: "รู้สึกคอแห้งตึง กลืนอาหารลำบาก หรือกล้ามเนื้อเหนื่อยตึงง่าย", element: "din", weight: 1 },
    { id: "din_8", text: "นอนหลับลึกมาก ปลุกตื่นยาก ตื่นแล้วยังรู้สึกตื้อหนักศีรษะ", element: "din", weight: 1 },
    { id: "din_9", text: "รู้สึกกล้ามเนื้อหนาแข็งตัว หรือเส้นเอ็นตึงขมวดเป็นปมตามจุดต่าง ๆ", element: "din", weight: 1 },
    { id: "din_10", text: "มีอาการเสียวฟันง่าย ฟันเปราะบาง หรือเล็บเปราะหักง่าย", element: "din", weight: 1 },

    // ธาตุน้ำ (nam)
    { id: "nam_1", text: "มีเสมหะคั่งในลำคอหรือน้ำมูกใสบ่อย ๆ โดยไม่มีอาการไข้หวัด", element: "nam", weight: 2 },
    { id: "nam_2", text: "มีอาการบวมน้ำตามข้อ มือ หรือเท้า สังเกตเห็นได้ง่ายหลังนั่งหรือนอนนาน ๆ", element: "nam", weight: 2 },
    { id: "nam_3", text: "รู้สึกหนาวสะท้านลึก ๆ จากข้างใน ร่างกายไม่ทนต่ออากาศเย็นหรือห้องแอร์", element: "nam", weight: 2 },
    { id: "nam_4", text: "รู้สึกปัสสาวะบ่อยผิดปกติและปัสสาวะมีสีใสไม่มีสีปน", element: "nam", weight: 1 },
    { id: "nam_5", text: "มีเหงื่อซึมออกมากตามฝ่ามือฝ่าเท้าแม้ไม่ได้ออกแรง และเหนอะหนะตัวง่าย", element: "nam", weight: 1 },
    { id: "nam_6", text: "ผิวหนังอ่อนไหวแพ้ง่าย คัน หรือเป็นตุ่มแผลพุพองมีน้ำใสเยิ้มบ่อย ๆ", element: "nam", weight: 1 },
    { id: "nam_7", text: "ท้องอืดแน่น ท้องตึง ท้องมีเสียงน้ำระบายช้าหลังอาหาร", element: "nam", weight: 1 },
    { id: "nam_8", text: "ระคายเคืองตา มีน้ำตาซึม หรือมีขี้ตาบ่อยผิดปกติ รวมถึงมีอาการหูอื้อบ่อย", element: "nam", weight: 1 },
    { id: "nam_9", text: "มีผื่นคันแดงหรือมีความอับชื้นได้ง่ายบริเวณข้อพับต่าง ๆ", element: "nam", weight: 1 },
    { id: "nam_10", text: "รู้สึกอั้นปัสสาวะลำบาก หรือต้องลุกปัสสาวะกลางดึกมากกว่าปกติ", element: "nam", weight: 1 },

    // ธาตุลม (lom)
    { id: "lom_1", text: "ท้องอืดแน่น มีแก๊สในท้องมาก ท้องร้องโครกคราก เรอหรือผายลมบ่อย", element: "lom", weight: 2 },
    { id: "lom_2", text: "รู้สึกเวียนศีรษะ บ้านหมุน หรือวูบหน้ามืดบ่อยครั้งเมื่อเปลี่ยนท่าทางเร็ว ๆ", element: "lom", weight: 2 },
    { id: "lom_3", text: "ใจสั่นหวิว หายใจติดขัดไม่อิ่มอก หรือเหนื่อยล้าฉับพลันเป็นบางช่วง", element: "lom", weight: 2 },
    { id: "lom_4", text: "นอนหลับยาก หลับไม่ลึก ฝันเยอะ สะดุ้งตื่นกลางดึกแล้วกลับไปหลับยาก", element: "lom", weight: 1 },
    { id: "lom_5", text: "คิดฟุ้งซ่าน วิตกกังวลง่าย ความคิดวิ่งเร็วตลอดเวลาจนตึงขมวดที่บ่าสะบัก", element: "lom", weight: 1 },
    { id: "lom_6", text: "มีอาการชาตื้อ ๆ หรือเป็นตะคริวบ่อยครั้งตามฝ่ามือ ฝ่าเท้า หรือน่อง", element: "lom", weight: 1 },
    { id: "lom_7", text: "มีอาการสะอึกบ่อย หรือกล้ามเนื้อตากระตุกยิบ ๆ กล้ามเนื้อกระตุกสั่นง่าย", element: "lom", weight: 1 },
    { id: "lom_8", text: "ผิวพรรณแห้งกร้าน ขาดความชุ่มชื้น ผมแห้งชี้ฟู หรือเล็บฉีกง่าย", element: "lom", weight: 1 },
    { id: "lom_9", text: "ระบบขับถ่ายแปรปรวน ท้องเสียสลับท้องผูกเวลาเครียดหรือตื่นเต้น", element: "lom", weight: 1 },
    { id: "lom_10", text: "มีอาการเจ็บปวดเสียดแปลบ ปวดเสียวร้าว ย้ายที่เจ็บปวดไปเรื่อย ๆ ตามร่างกาย", element: "lom", weight: 1 },

    // ธาตุไฟ (fai)
    { id: "fai_1", text: "รู้สึกร้อนวูบวาบจากภายในร่างกาย หรือเหงื่อออกง่ายมากแม้คนอื่นรู้สึกเย็นสบาย", element: "fai", weight: 2 },
    { id: "fai_2", text: "ร้อนในบ่อย มีแผลเปื่อยอักเสบในปาก หรือผิวหนังระอุมักตัวร้อนรุม ๆ เสมอ", element: "fai", weight: 2 },
    { id: "fai_3", text: "รู้สึกหิวโซเร็ว ทานอาหารเสร็จไม่นานก็หิวใหม่ คอแห้งกระหายน้ำเย็นบ่อย", element: "fai", weight: 2 },
    { id: "fai_4", text: "รู้สึกหงุดหงิดหม่นหมองทนอากาศร้อนไม่ค่อยได้ และขี้ร้อนง่ายกว่าปกติ", element: "fai", weight: 1 },
    { id: "fai_5", text: "รู้สึกอุณหภูมิร่างกายสูง ลมหายใจมีความอุ่นร้อน หรือลมหายใจมีกลิ่นง่ายเมื่อร้อน", element: "fai", weight: 1 },
    { id: "fai_6", text: "แสบร้อนกลางอก แสนกระเพาะอาหาร หรือกรดเกินหลังรับประทานอาหาร", element: "fai", weight: 1 },
    { id: "fai_7", text: "ตาแดงระคายเคือง แสบตา หรือตาร้อนผ่าวบ่อยครั้งเมื่อเจอแสงจ้า", element: "fai", weight: 1 },
    { id: "fai_8", text: "ระบบขับถ่ายแปรปรวน ท้องเสียง่ายเมื่อทานอาหารรสเผ็ดร้อน หรือมีความร้อนรุ่มในช่องท้อง", element: "fai", weight: 1 },
    { id: "fai_9", text: "ผิวหนังแสบร้อนอักเสบแดงได้ง่ายเมื่อโดนแสงแดด หรือมีสิวอักเสบขึ้นบ่อย ๆ", element: "fai", weight: 1 },
    { id: "fai_10", text: "ช่วงเย็นหรือกลางคืนมักตัวร้อนรุม ๆ หรือรู้สึกร้อนผ่าวตามฝ่ามือฝ่าเท้า", element: "fai", weight: 1 }
];

// Rating Options & Multipliers
const ratingOptions = [
    { label: "ไม่ใช่เลย", val: 0 },
    { label: "เป็นบางครั้ง", val: 0.5 },
    { label: "เป็นบ่อย", val: 1.0 },
    { label: "เป็นประจำ หรือ ชัดมาก", val: 1.5 }
];

// Element details for recommendations
const elementDetails = {
    din: {
        name: "ธาตุดิน",
        color: "var(--color-din)",
        advice: `
            <div class="recom-section">
                <span class="recom-title">🌱 ลักษณะเด่นของธาตุดิน</span>
                <p class="recom-text">คนธาตุดินมีร่างกายที่มั่นคง แข็งแรง ทนทาน และมีน้ำหนักตัวคงที่ ระบบโครงสร้างกล้ามเนื้อเด่นชัด แต่มีแนวโน้มที่จะอึดแน่น ท้องผูก หรือปวดเมื่อยตึงตัวได้ง่ายเนื่องจากธาตุดินขาดความยืดหยุ่น</p>
            </div>
            <div class="recom-section">
                <span class="recom-title">🥗 คำแนะนำด้านอาหารเพื่อการปรับสมดุล</span>
                <p class="recom-text">ควรทานอาหารที่มีรส **ฝาด รสหวานธรรมชาติ รสมัน และรสเค็มอมเปรี้ยวอ่อน ๆ** เพื่อบำรุงเส้นเอ็นและเนื้อเยื่อ เช่น กล้วยดิบ ยอดผัก มะระ มะเขือเทศ ฝรั่ง ข้าวกล้อง เมล็ดธัญพืชต่าง ๆ หลีกเลี่ยงอาหารที่ทอดมันจัด ๆ หรือเนื้อสัตว์ย่อยยาก เพื่อลดภาระของระบบขับถ่าย</p>
            </div>
            <div class="recom-section">
                <span class="recom-title">🧘 การปฏิบัติตนเพื่อสุขภาพ</span>
                <p class="recom-text">เน้นการยืดเหยียดร่างกาย (Stretching) เช่น โยคะ หรือการเดินเบา ๆ เพื่อบรรเทาความตึงแข็งของเอ็นและข้อต่อ หลีกเลี่ยงพฤติกรรมการนั่งนิ่ง ๆ เป็นเวลานาน หรือการนอนกลางวันเพราะจะกระตุ้นความอืดและเฉื่อยช้า</p>
            </div>
        `
    },
    nam: {
        name: "ธาตุน้ำ",
        color: "var(--color-nam)",
        advice: `
            <div class="recom-section">
                <span class="recom-title">💧 ลักษณะเด่นของธาตุน้ำ</span>
                <p class="recom-text">คนธาตุน้ำมีผิวพรรณดี ชุ่มชื้น อารมณ์เย็นและสุขุม แต่ร่างกายมักสะสมความชื้นได้ง่าย เสี่ยงต่อปัญหาระบบน้ำเหลือง เสมหะคั่ง บวมน้ำ และอาการง่วงนอนเฉื่อยชาผิดปกติในช่วงอากาศเปลี่ยน</p>
            </div>
            <div class="recom-section">
                <span class="recom-title">🥗 คำแนะนำด้านอาหารเพื่อการปรับสมดุล</span>
                <p class="recom-text">ควรทานอาหารรส **เปรี้ยว รสขม และรสเผ็ดร้อนปานกลาง** เพื่อช่วยขับน้ำมูก เสมหะ และกระตุ้นการไหลเวียนโลหิต เช่น ขิง ข่า ตะไคร้ มะนาว ยอดสะเดา ใบกะเพรา แกงป่า แกงส้ม ควรหลีกเลี่ยงนม เนย ไอศกรีม น้ำเย็นจัด และอาหารรสหวานมันจัดซึ่งจะเพิ่มปริมาณของเสมหะในร่างกาย</p>
            </div>
            <div class="recom-section">
                <span class="recom-title">🧘 การปฏิบัติตนเพื่อสุขภาพ</span>
                <p class="recom-text">ควรรักษาร่างกายให้อบอุ่นเสมอ โดยเฉพาะในช่วงฤดูฝนหรือฤดูหนาว ออกกำลังกายแบบคาร์ดิโอเบา ๆ ให้มีเหงื่อออกเพื่อขับความชื้นส่วนเกิน และหลีกเลี่ยงการนอนในห้องที่อับชื้นหรือเย็นจัด</p>
            </div>
        `
    },
    lom: {
        name: "ธาตุลม",
        color: "var(--color-lom)",
        advice: `
            <div class="recom-section">
                <span class="recom-title">🍃 ลักษณะเด่นของธาตุลม</span>
                <p class="recom-text">คนธาตุลมมีความคล่องแคล่วว่องไว คิดเร็วทำเร็ว แต่ระบบย่อยมักไวต่อแรงกดดัน ส่งผลให้ท้องอืด มีแก๊สในกระเพาะอาหาร นอนหลับยาก อารมณ์แปรปรวน และมีอาการปวดเวียนศีรษะเมื่อร่างกายขาดน้ำหรือพักผ่อนน้อย</p>
            </div>
            <div class="recom-section">
                <span class="recom-title">🥗 คำแนะนำด้านอาหารเพื่อการปรับสมดุล</span>
                <p class="recom-text">ควรเน้นทานอาหารรส **เผ็ดร้อนและรสสุขุม** เพื่อช่วยขับลมในท้อง กระตุ้นลมเบื้องล่าง และบำรุงประสาท เช่น ขิง กระเทียม พริกไทย โหระพา ยี่หร่า กานพลู แกงเผ็ดร้อน เลี่ยงอาหารดิบ อาหารที่มีลักษณะแห้งกรอบ เย็นจัด หรือถั่วที่ทำให้เกิดแก๊สในกระเพาะอาหาร</p>
            </div>
            <div class="recom-section">
                <span class="recom-title">🧘 การปฏิบัติตนเพื่อสุขภาพ</span>
                <p class="recom-text">รักษาสมดุลด้วยการทานอาหารให้ตรงเวลา นอนหลับพักผ่อนให้เพียงพอ ทำสมาธิหรือฝึกหายใจช้า ๆ เพื่อสงบระบบประสาท หลีกเลี่ยงที่ที่มีลมโกรกแรง การเดินทางบ่อยครั้ง และหลีกเลี่ยงความเครียดสะสม</p>
            </div>
        `
    },
    fai: {
        name: "ธาตุไฟ",
        color: "var(--color-fai)",
        advice: `
            <div class="recom-section">
                <span class="recom-title">🔥 ลักษณะเด่นของธาตุไฟ</span>
                <p class="recom-text">คนธาตุไฟมีอุณหภูมิร่างกายสูง เผาผลาญดี หิวเร็ว และขี้ร้อน แต่ธาตุไฟที่ร้อนเกินไปมักทำให้เกิดอาการร้อนใน แผลอักเสบ ผิวหนังแพ้ง่าย และระบบการย่อยอาหารแปรปรวนจนแสบท้องหรือกระเพาะอักเสบ</p>
            </div>
            <div class="recom-section">
                <span class="recom-title">🥗 คำแนะนำด้านอาหารเพื่อการปรับสมดุล</span>
                <p class="recom-text">ควรทานอาหารรส **ขม รสเย็น รสจืด และรสจืดอมฝาด** เพื่อดับร้อนและระบายพิษไข้ เช่น แตงกวา ฟักเขียว ใบบัวบก รากบัว ใบย่านาง เก๊กฮวย มะระจีน ผลไม้เนื้อเย็น เช่น แตงโม เมล่อน เลี่ยงอาหารเผ็ดจัด แอลกอฮอล์ กาแฟ เนื้อสัตว์ใหญ่ย่อยยาก และของปิ้งย่างที่ไหม้เกรียม</p>
            </div>
            <div class="recom-section">
                <span class="recom-title">🧘 การปฏิบัติตนเพื่อสุขภาพ</span>
                <p class="recom-text">หลีกเลี่ยงการทำกิจกรรมกลางแดดจัดหรืออยู่ในสถานที่ที่อากาศร้อนอับชื้น พยายามอย่านอนดึกเนื่องจากเวลาเที่ยงคืนเป็นช่วงที่ธาตุไฟกำเริบตามธรรมชาติ และฝึกการควบคุมอารมณ์ คลายความตึงเครียดด้วยกิจกรรมที่รื่นรมย์</p>
            </div>
        `
    }
};

// Application State
let shuffledQuestions = [];
let currentQuestionIndex = 0;
const userAnswers = {}; // key: question.id, val: multiplier value (0, 0.5, 1.0, 1.5)

// DOM Elements
const birthMonthSelect = document.getElementById("birth-month");
const btnStart = document.getElementById("btn-start");
const btnPrev = document.getElementById("btn-prev");
const btnNext = document.getElementById("btn-next");
const btnRestart = document.getElementById("btn-restart");
const btnLiffShare = document.getElementById("btn-liff-share");

const stepWelcome = document.getElementById("step-welcome");
const stepAssessment = document.getElementById("step-assessment");
const stepResult = document.getElementById("step-result");

const progressBar = document.getElementById("assessment-progress");
const stepIndicator = document.getElementById("progress-step-indicator");
const questionTextEl = document.getElementById("question-text");
const ratingContainer = document.getElementById("rating-container");

// Initialize LINE LIFF SDK (Hybrid mode)
function initLiff() {
    if (typeof liff === "undefined") {
        console.warn("LINE LIFF SDK is not loaded. Working in browser-only mode.");
        return;
    }
    if (!LIFF_ID || LIFF_ID === "YOUR_LIFF_ID") {
        console.warn("LIFF_ID is not configured. Running in guest/local mode.");
        return;
    }

    liff.init({ liffId: LIFF_ID })
        .then(() => {
            isLiffInitialized = true;
            console.log("LINE LIFF Initialized successfully!");
            
            // Check check-in status
            if (liff.isLoggedIn()) {
                liff.getProfile()
                    .then(profile => {
                        userProfile = profile;
                        // Dynamically update welcome title with customer's name
                        const welcomeTitle = document.getElementById("welcome-title");
                        if (welcomeTitle) {
                            welcomeTitle.textContent = `ยินดีต้อนรับ คุณ ${profile.displayName}`;
                        }
                    })
                    .catch(err => console.error("Error getting profile:", err));
            } else {
                // Force login everywhere except for local development (localhost)
                const isLocalhost = window.location.hostname === "localhost" || 
                                    window.location.hostname === "127.0.0.1";
                if (!isLocalhost) {
                    // Clean URL to match the exact registered Endpoint URL on LINE Dev Console
                    const baseUri = window.location.origin + window.location.pathname;
                    const cleanRedirectUri = baseUri.replace(/\/index\.html$/, "").replace(/\/$/, "");
                    
                    liff.login({ redirectUri: cleanRedirectUri });
                } else {
                    console.log("Localhost detected: skipping enforced login for development convenience.");
                }
            }
        })
        .catch(err => {
            console.error("LIFF initialization failed:", err);
        });
}

// Trigger LIFF Init on load
window.addEventListener("DOMContentLoaded", () => {
    initLiff();
});

// Fisher-Yates Shuffle Algorithm
function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// Enable start button on birth month select
birthMonthSelect.addEventListener("change", () => {
    if (birthMonthSelect.value) {
        btnStart.removeAttribute("disabled");
    } else {
        btnStart.setAttribute("disabled", "true");
    }
});

// START button handler
btnStart.addEventListener("click", () => {
    // Shuffle the 40 questions dynamically
    shuffledQuestions = shuffleArray(allQuestions);
    currentQuestionIndex = 0;
    
    // Clear previous answers
    allQuestions.forEach(q => delete userAnswers[q.id]);
    
    transitionToStep(stepWelcome, stepAssessment);
    loadQuestion();
});

// PREV button handler
btnPrev.addEventListener("click", () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion();
    } else {
        transitionToStep(stepAssessment, stepWelcome);
    }
});

// NEXT button handler
btnNext.addEventListener("click", () => {
    if (currentQuestionIndex < shuffledQuestions.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    } else {
        calculateAndDisplayResults();
        transitionToStep(stepAssessment, stepResult);
    }
});

// RESTART button handler
btnRestart.addEventListener("click", () => {
    birthMonthSelect.value = "";
    btnStart.setAttribute("disabled", "true");
    transitionToStep(stepResult, stepWelcome);
});

// Share button handler
if (btnLiffShare) {
    btnLiffShare.addEventListener("click", (e) => {
        e.preventDefault();
        shareLiffResult();
    });
}

// Transition slide utility
function transitionToStep(fromStep, toStep) {
    fromStep.classList.remove("active");
    setTimeout(() => {
        fromStep.style.display = "none";
        toStep.style.display = "flex";
        setTimeout(() => {
            toStep.classList.add("active");
        }, 50);
    }, 400);
}

// Load individual question
function loadQuestion() {
    const question = shuffledQuestions[currentQuestionIndex];
    
    // 1. Update Progress indicators
    const totalQuestions = shuffledQuestions.length;
    const progressPercent = (currentQuestionIndex / totalQuestions) * 100;
    progressBar.style.width = `${progressPercent}%`;
    stepIndicator.textContent = `คำถามข้อที่ ${currentQuestionIndex + 1} จาก ${totalQuestions}`;
    
    // 2. Set question text
    questionTextEl.textContent = question.text;
    
    // 3. Clear container
    ratingContainer.innerHTML = "";
    
    // Get previously saved answer if exists
    const savedVal = userAnswers[question.id];
    
    // Enable/Disable next button based on selection state
    if (savedVal !== undefined) {
        btnNext.removeAttribute("disabled");
    } else {
        btnNext.setAttribute("disabled", "true");
    }
    
    // 4. Generate rating radio cards
    ratingOptions.forEach((opt, idx) => {
        const isSelected = savedVal === opt.val;
        
        const card = document.createElement("label");
        card.className = `rating-card ${isSelected ? "active-card" : ""}`;
        
        const radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "rating";
        radio.value = opt.val;
        radio.checked = isSelected;
        
        // When user selects a rating card
        radio.addEventListener("change", () => {
            // Highlight selected card
            document.querySelectorAll(".rating-card").forEach(c => c.classList.remove("active-card"));
            card.classList.add("active-card");
            
            // Save selection
            userAnswers[question.id] = opt.val;
            btnNext.removeAttribute("disabled");
            
            // Auto-advance with subtle delay for smooth UX
            setTimeout(() => {
                // Perform advance if it is still the same question and not last
                if (currentQuestionIndex < shuffledQuestions.length - 1) {
                    currentQuestionIndex++;
                    loadQuestion();
                } else {
                    // Last question answered - calculate and show results screen
                    calculateAndDisplayResults();
                    transitionToStep(stepAssessment, stepResult);
                }
            }, 300);
        });
        
        const labelText = document.createElement("span");
        labelText.className = "rating-label";
        labelText.textContent = opt.label;
        
        const customCircle = document.createElement("span");
        customCircle.className = "radio-circle-custom";
        
        card.appendChild(radio);
        card.appendChild(labelText);
        card.appendChild(customCircle);
        
        ratingContainer.appendChild(card);
    });
    
    // Scroll container to top
    document.querySelector(".main-card").scrollTop = 0;
}

// Map month to Element Key & Name
function getBirthElement(monthNum) {
    const m = parseInt(monthNum);
    if (m >= 1 && m <= 3) {
        return { key: "fai", name: "ธาตุไฟ (เตโช)" };
    } else if (m >= 4 && m <= 6) {
        return { key: "lom", name: "ธาตุลม (วาโย)" };
    } else if (m >= 7 && m <= 9) {
        return { key: "nam", name: "ธาตุน้ำ (อาโป)" };
    } else if (m >= 10 && m <= 12) {
        return { key: "din", name: "ธาตุดิน (ปถวี)" };
    }
    return { key: "", name: "-" };
}

// Calculate scores and render final Results screen
function calculateAndDisplayResults() {
    const scores = { din: 0, nam: 0, lom: 0, fai: 0 };
    
    // 1. Add birth element baseline (+2 points)
    const birthInfo = getBirthElement(birthMonthSelect.value);
    if (birthInfo.key) {
        scores[birthInfo.key] += 2;
    }
    
    // 2. Add quiz symptom scores (weight * multiplier)
    shuffledQuestions.forEach((q) => {
        const val = userAnswers[q.id];
        if (val !== undefined) {
            scores[q.element] += (q.weight * val);
        }
    });
    
    // 3. Update legend text with formatted decimals (rounded to 1 decimal place)
    document.getElementById("score-din").textContent = scores.din.toFixed(1);
    document.getElementById("score-nam").textContent = scores.nam.toFixed(1);
    document.getElementById("score-lom").textContent = scores.lom.toFixed(1);
    document.getElementById("score-fai").textContent = scores.fai.toFixed(1);
    
    // 4. Set birth element display
    document.getElementById("result-birth-element").textContent = birthInfo.name;
    
    // 5. Determine current dominant element
    let highestElement = "din";
    let maxVal = -1;
    for (const el in scores) {
        if (scores[el] > maxVal) {
            maxVal = scores[el];
            highestElement = el;
        } else if (scores[el] === maxVal) {
            // Tie breaker: prefer birth month element if it matches one of ties
            if (el === birthInfo.key) {
                highestElement = el;
            }
        }
    }
    
    let currentElementText = "";
    if (highestElement === birthInfo.key) {
        currentElementText = `${elementDetails[highestElement].name}เด่น (สมดุลตามธรรมชาติ)`;
    } else {
        currentElementText = `${elementDetails[highestElement].name}เด่น (อาจมีภาวะกำเริบหรือเสียสมดุล)`;
    }
    document.getElementById("result-current-element").textContent = currentElementText;
    
    // 6. Draw / Animate the Radar Chart
    const maxScoreVal = 21.5;
    const maxChartRadius = 80;
    
    const lenDin = Math.min((scores.din / maxScoreVal) * maxChartRadius, maxChartRadius);
    const lenNam = Math.min((scores.nam / maxScoreVal) * maxChartRadius, maxChartRadius);
    const lenLom = Math.min((scores.lom / maxScoreVal) * maxChartRadius, maxChartRadius);
    const lenFai = Math.min((scores.fai / maxScoreVal) * maxChartRadius, maxChartRadius);
    
    const pDin = { x: 100, y: 100 - lenDin };
    const pNam = { x: 100 + lenNam, y: 100 };
    const pLom = { x: 100, y: 100 + lenLom };
    const pFai = { x: 100 - lenFai, y: 100 };
    
    const polyString = `${pDin.x},${pDin.y} ${pNam.x},${pNam.y} ${pLom.x},${pLom.y} ${pFai.x},${pFai.y}`;
    document.getElementById("chart-poly").setAttribute("points", polyString);
    
    // 7. Render dynamic HTML recommendations
    const adviceBox = document.getElementById("recommendation-content");
    let recomHTML = `
        <div style="border-bottom: 2px solid rgba(17, 109, 255, 0.08); padding-bottom: 12px; margin-bottom: 16px;">
            <h4 style="font-size:1.25rem; font-weight:700; color:var(--brand-primary)">คำแนะนำเฉพาะบุคคลสำหรับผู้มี ${elementDetails[highestElement].name}เด่น</h4>
        </div>
        ${elementDetails[highestElement].advice}
    `;
    
    // Imbalance warning if current dominant element differs from birth element
    if (highestElement !== birthInfo.key) {
        recomHTML += `
            <div class="recom-section" style="margin-top:20px; padding-top:16px; border-top:1.5px dashed rgba(255, 94, 94, 0.25);">
                <span class="recom-title" style="color:var(--color-fai)">⚠️ ข้อสังเกตเพิ่มเติมเรื่องธาตุกำเริบ</span>
                <p class="recom-text" style="font-style: italic;">เนื่องจากธาตุเจ้าเรือนเกิดดั้งเดิมของคุณคือ <strong>${elementDetails[birthInfo.key].name}</strong> แต่ผลประเมินในปัจจุบันบ่งชี้ว่าคุณมี <strong>${elementDetails[highestElement].name}เด่นกว่า</strong> แสดงว่าร่างกายของคุณอาจตกอยู่ในภาวะเสียสมดุล หรือเรียกว่า <strong>"${elementDetails[highestElement].name}กำเริบ"</strong> ซึ่งมักเกิดจากพฤติกรรมสะสม ความเครียด หรือการเปลี่ยนแปลงของฤดูกาล ควรเน้นปรับสมดุลสุขภาพโดยหลีกเลี่ยงปัจจัยกระตุ้นของธาตุที่กำเริบนี้เป็นสำคัญ</p>
            </div>
        `;
    }
    
    adviceBox.innerHTML = recomHTML;

    // 8. Show LINE Share button unconditionally
    if (btnLiffShare) {
        btnLiffShare.style.display = "inline-flex";
    }

    // 9. Send Flex Message if inside active LINE Chat context
    if (isLiffInitialized && liff.isLoggedIn() && liff.isInClient()) {
        try {
            sendFlexResult(scores, birthInfo, currentElementText);
        } catch (err) {
            console.error("Error sending Flex Result via LIFF:", err);
        }
    }
}

// Generate the Flex Message Payload for LINE
function generateFlexMessage(scores, birthInfo, currentElementText) {
    const liffUrl = isLiffInitialized ? liff.getLiffUrl() : "https://www.bangkoktip.com";
    
    return {
        type: "flex",
        altText: "ผลวิเคราะห์ธาตุเจ้าเรือนของคุณจากกรุงเทพทิพโอสถ",
        contents: {
            type: "bubble",
            styles: {
                header: { backgroundColor: "#116DFF" },
                footer: { separator: true }
            },
            header: {
                type: "box",
                layout: "vertical",
                contents: [
                    {
                        type: "text",
                        text: "กรุงเทพทิพโอสถ",
                        color: "#FFFFFF",
                        weight: "bold",
                        size: "sm",
                        align: "center"
                    },
                    {
                        type: "text",
                        text: "ผลวิเคราะห์ธาตุเจ้าเรือนของท่าน",
                        color: "#FFFFFF",
                        weight: "bold",
                        size: "md",
                        align: "center",
                        margin: "xs"
                    }
                ]
            },
            body: {
                type: "box",
                layout: "vertical",
                spacing: "md",
                contents: [
                    {
                        type: "box",
                        layout: "vertical",
                        spacing: "xs",
                        contents: [
                            {
                                type: "text",
                                text: "ธาตุเจ้าเรือนเกิด (เดือนเกิด):",
                                size: "xs",
                                color: "#888888"
                            },
                            {
                                type: "text",
                                text: birthInfo.name,
                                size: "md",
                                weight: "bold",
                                color: "#116DFF"
                            }
                        ]
                    },
                    {
                        type: "box",
                        layout: "vertical",
                        spacing: "xs",
                        contents: [
                            {
                                type: "text",
                                text: "ธาตุปัจจุบันที่วิเคราะห์ได้:",
                                size: "xs",
                                color: "#888888"
                            },
                            {
                                type: "text",
                                text: currentElementText,
                                size: "md",
                                weight: "bold",
                                color: "#FF5E5E"
                            }
                        ]
                    },
                    {
                        type: "separator",
                        margin: "md"
                    },
                    {
                        type: "box",
                        layout: "vertical",
                        margin: "md",
                        spacing: "xs",
                        contents: [
                            {
                                type: "text",
                                text: "คะแนนสัดส่วนความสมดุลธาตุ:",
                                size: "xs",
                                color: "#888888",
                                weight: "bold"
                            },
                            {
                                type: "box",
                                layout: "horizontal",
                                contents: [
                                    { "type": "text", "text": "🟫 ธาตุดิน: ", "size": "xs", "color": "#555555" },
                                    { "type": "text", "text": `${scores.din.toFixed(1)} / 21.5`, "size": "xs", "align": "end", "weight": "bold", "color": "#8c6239" }
                                ]
                            },
                            {
                                type: "box",
                                layout: "horizontal",
                                contents: [
                                    { "type": "text", "text": "🟦 ธาตุน้ำ: ", "size": "xs", "color": "#555555" },
                                    { "type": "text", "text": `${scores.nam.toFixed(1)} / 21.5`, "size": "xs", "align": "end", "weight": "bold", "color": "#29abe2" }
                                ]
                            },
                            {
                                type: "box",
                                layout: "horizontal",
                                contents: [
                                    { "type": "text", "text": "🟧 ธาตุลม: ", "size": "xs", "color": "#555555" },
                                    { "type": "text", "text": `${scores.lom.toFixed(1)} / 21.5`, "size": "xs", "align": "end", "weight": "bold", "color": "#fbb03b" }
                                ]
                            },
                            {
                                type: "box",
                                layout: "horizontal",
                                contents: [
                                    { "type": "text", "text": "🟥 ธาตุไฟ: ", "size": "xs", "color": "#555555" },
                                    { "type": "text", "text": `${scores.fai.toFixed(1)} / 21.5`, "size": "xs", "align": "end", "weight": "bold", "color": "#ff5e5e" }
                                ]
                            }
                        ]
                    }
                ]
            },
            footer: {
                type: "box",
                layout: "vertical",
                spacing: "sm",
                contents: [
                    {
                        type: "button",
                        action: {
                            type: "uri",
                            "label": "วิเคราะห์ธาตุเจ้าเรือนฟรี",
                            "uri": liffUrl
                        },
                        "style": "primary",
                        "color": "#116DFF"
                    }
                ]
            }
        }
    };
}

// Send result Flex Message directly to chat
function sendFlexResult(scores, birthInfo, currentElementText) {
    const statusBox = document.getElementById("liff-status-msg");
    const statusText = statusBox ? statusBox.querySelector(".liff-text") : null;
    const statusIcon = statusBox ? statusBox.querySelector(".liff-icon") : null;

    try {
        // Defensive check: Ensure liff and sendMessages API are available
        if (typeof liff === "undefined" || !liff.sendMessages) {
            console.warn("liff.sendMessages API is not available in this environment.");
            if (statusBox) statusBox.style.display = "none";
            return;
        }

        const flexMessage = generateFlexMessage(scores, birthInfo, currentElementText);
        
        liff.sendMessages([flexMessage])
            .then(() => {
                console.log("Result Flex Message sent to LINE chat successfully!");
                if (statusBox) {
                    statusBox.style.display = "flex";
                    statusBox.style.borderColor = "rgba(6, 199, 85, 0.25)";
                    statusBox.style.backgroundColor = "rgba(6, 199, 85, 0.05)";
                    if (statusIcon) statusIcon.textContent = "📬";
                    if (statusText) {
                        statusText.textContent = "ระบบได้ส่งผลการวิเคราะห์ในรูปแบบการ์ดสรุปผลสุขภาพเข้าแชท LINE ของคุณเรียบร้อยแล้ว!";
                        statusText.style.color = "#05b04b";
                    }
                }
            })
            .catch((err) => {
                console.error("Failed to send Flex Message:", err);
                if (statusBox) {
                    statusBox.style.display = "flex";
                    statusBox.style.borderColor = "rgba(217, 119, 6, 0.25)";
                    statusBox.style.backgroundColor = "rgba(217, 119, 6, 0.05)";
                    if (statusIcon) statusIcon.textContent = "⚠️";
                    if (statusText) {
                        statusText.innerHTML = `ไม่สามารถส่งการ์ดสรุปผลเข้าแชทอัตโนมัติได้ (${err.message || "เปิดอยู่นอกห้องแชท"}) แต่คุณสามารถใช้ปุ่ม <strong>"ชวนเพื่อนมาวิเคราะห์ธาตุเจ้าเรือน"</strong> ด้านล่างเพื่อส่งผลลัพธ์เข้าแชทหรือแชร์ต่อได้ครับ`;
                        statusText.style.color = "#d97706";
                    }
                }
            });
    } catch (e) {
        console.error("Synchronous error inside sendFlexResult:", e);
        if (statusBox) statusBox.style.display = "none";
    }
}

// Share results with friends via LINE Scheme
function shareLiffResult() {
    if (!birthMonthSelect.value) {
        alert("กรุณาเลือกเดือนเกิดและประเมินอาการให้เสร็จสิ้นก่อนครับ");
        return;
    }
    
    // We need to calculate scores and info for generating the message.
    const birthInfo = getBirthElement(birthMonthSelect.value);
    const scores = { din: 0, nam: 0, lom: 0, fai: 0 };
    
    if (birthInfo.key) {
        scores[birthInfo.key] += 2;
    }
    
    shuffledQuestions.forEach((q) => {
        const val = userAnswers[q.id];
        if (val !== undefined) {
            scores[q.element] += (q.weight * val);
        }
    });

    let highestElement = "din";
    let maxVal = -1;
    for (const el in scores) {
        if (scores[el] > maxVal) {
            maxVal = scores[el];
            highestElement = el;
        } else if (scores[el] === maxVal) {
            if (el === birthInfo.key) {
                highestElement = el;
            }
        }
    }
    
    let currentElementText = "";
    if (highestElement === birthInfo.key) {
        currentElementText = `${elementDetails[highestElement].name}เด่น (สมดุลตามธรรมชาติ)`;
    } else {
        currentElementText = `${elementDetails[highestElement].name}เด่น (อาจมีภาวะกำเริบหรือเสียสมดุล)`;
    }

    const shareText = `ผลวิเคราะห์ธาตุเจ้าเรือนของฉันจากกรุงเทพทิพโอสถ:\n` +
                      `🌱 ธาตุเจ้าเรือนเกิด: ${birthInfo.name}\n` +
                      `✨ ธาตุเด่นปัจจุบัน: ${currentElementText}\n\n` +
                      `มาลองเช็คธาตุเจ้าเรือนและแนวทางการปรับสมดุลสุขภาพของคุณได้ฟรีที่นี่เลย! 👇\n` +
                      `https://liff.line.me/${LIFF_ID}`;

    const shareUrl = `https://line.me/R/share?text=${encodeURIComponent(shareText)}`;

    // If inside LINE client (LIFF), open using liff.openWindow internally, otherwise open via window.open
    if (typeof liff !== "undefined" && isLiffInitialized && liff.isInClient()) {
        liff.openWindow({
            url: shareUrl,
            external: false
        });
    } else {
        window.open(shareUrl, "_blank");
    }
}
