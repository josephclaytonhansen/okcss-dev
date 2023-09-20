import { ref } from "vue"

/* ---------------------- Make changes here or from API --------------------- */

const weaselLoc = ref("http://localhost:5186/")
const seabassLoc = ref("http://localhost:5920/")

const ig_link = ref("https://www.instagram.com/okcsouthstake/")
const fb_link = ref("https://www.facebook.com/okcsouthstake")
const phone = ref("405-555-5555")
const email = ref("communications@okcsouthstake.org")

const blurb = ref('A Christian church servicing the areas of Choctaw, Moore, Midwest City, Mustang, and Oklahoma City.')

const wards = ref(["Choctaw", "Midwest City", "OKC 2nd", "Moore", "OKC 6th Branch", "Mustang 2nd", "Mustang 1st"])

const blogsPerPage = ref(8);

const contentURLMappings = {
    "/": "home",
    "/home": "home",
    "/blog": "news",
    "/news": "news",
    "/about": "contact-us",
    "/contact": "contact-us",
    "contact-us": "contact-us",
    "/calendar": "events",
    "/events": "events",
    "/classes": "classes",
    "/temple-prep": "classes",
    "/self-reliance": "classes",
    "/beliefs": "beliefs",
    "/our-beliefs": "beliefs",
    "/what-we-believe": "beliefs",
    "/missionaries": "missionaries",
    "/service": "service",
    "/service-opportunities": "service",
    "/temple": "okc-temple",
    "/temple-info": "okc-temple",
    "/okc-temple": "okc-temple",
    "/what-are-temples": "what-are-temples",
    "/what-is-a-temple": "what-are-temples",
    "/what-is-the-temple": "what-are-temples",
}

const externalURLMappings = {
    "/weasel": weaselLoc.value+"weasel",
    "/weasel/login": weaselLoc.value+"weasel/login",
    "/seabass": seabassLoc.value,
    "/instagram": ig_link.value,
    "/facebook": fb_link.value,
    "/phone": "tel:"+phone.value,
    "/email": "mailto:"+email.value,
    "/choctaw": weaselLoc.value+"choctaw",
    "/midwest-city": weaselLoc.value+"midwest-city",
    "/okc-2nd": weaselLoc.value+"okc-2nd",
    "/moore": weaselLoc.value+"moore",
    "/okc-6th-branch": weaselLoc.value+"okc-6th-branch",
    "/mustang-2nd": weaselLoc.value+"mustang-2nd",
    "/mustang-1st": weaselLoc.value+"mustang-1st",
    "/stake": weaselLoc.value+"stake",
}

export { contentURLMappings, externalURLMappings, weaselLoc, seabassLoc, ig_link, fb_link, phone, email, blurb, wards, blogsPerPage }