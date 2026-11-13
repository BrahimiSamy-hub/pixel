// SHARED CATALOG: source of truth lives in the website repo (pixel/src/shared/catalog).
// The mobile app gets a copy with `npm run sync:catalog`; edit here, never in the app copy.
/** Screen texts shared by app and website, each leaf in fr / en / ar. */
import type { L10n } from './core'

type Tree = { [key: string]: L10n | Tree }

export const quoteText = {
  "onQuote": {
    "fr": "Sur devis",
    "en": "On quote",
    "ar": "حسب الطلب"
  },
  "from": {
    "fr": "À partir de {amount} DA",
    "en": "From {amount} DA",
    "ar": "ابتداءً من {amount} دج"
  },
  "price": {
    "fr": "{amount} DA",
    "en": "{amount} DA",
    "ar": "{amount} دج"
  },
  "unit": {
    "m2": {
      "fr": "m²",
      "en": "m²",
      "ar": "m²"
    },
    "unit": {
      "fr": "unité",
      "en": "unit",
      "ar": "وحدة"
    },
    "piece": {
      "fr": "pièce",
      "en": "piece",
      "ar": "قطعة"
    },
    "page": {
      "fr": "page",
      "en": "page",
      "ar": "صفحة"
    }
  },
  "total": {
    "fr": "Total estimé",
    "en": "Estimated total",
    "ar": "المجموع التقديري"
  },
  "ticket": {
    "fr": "Votre demande",
    "en": "Your request",
    "ar": "طلبك"
  },
  "empty": {
    "fr": "Rien de sélectionné pour l’instant.",
    "en": "Nothing selected yet.",
    "ar": "لم يتم اختيار أي شيء بعد."
  },
  "estimateNote": {
    "fr": "Estimation indicative : le devis final est confirmé par Pixel.",
    "en": "Indicative estimate: Pixel confirms the final quote.",
    "ar": "تقدير أولي: Pixel تؤكد السعر النهائي."
  },
  "send": {
    "fr": "Envoyer sur WhatsApp",
    "en": "Send on WhatsApp",
    "ar": "أرسل عبر واتساب"
  },
  "msgHello": {
    "fr": "Bonjour Pixel, demande de devis : {service}",
    "en": "Hello Pixel, quote request: {service}",
    "ar": "السلام عليكم Pixel، طلب عرض سعر: {service}"
  },
  "msgTotal": {
    "fr": "Total estimé : {total}",
    "en": "Estimated total: {total}",
    "ar": "المجموع التقديري: {total}"
  },
  "notes": {
    "fr": "Précisions",
    "en": "Details",
    "ar": "تفاصيل"
  },
  "contactTitle": {
    "fr": "Vos coordonnées",
    "en": "Your details",
    "ar": "معلوماتك"
  },
  "requiredHint": {
    "fr": "Les champs marqués * sont obligatoires.",
    "en": "Fields marked * are required.",
    "ar": "الحقول المميزة بـ * إلزامية."
  },
  "name": {
    "fr": "Nom du contact",
    "en": "Contact name",
    "ar": "الاسم"
  },
  "phone": {
    "fr": "Téléphone / WhatsApp",
    "en": "Phone / WhatsApp",
    "ar": "الهاتف / واتساب"
  },
  "city": {
    "fr": "Wilaya / ville",
    "en": "Wilaya / city",
    "ar": "الولاية / المدينة"
  },
  "company": {
    "fr": "Entreprise / établissement",
    "en": "Company / business",
    "ar": "الشركة / المؤسسة"
  },
  "email": {
    "fr": "Adresse e-mail",
    "en": "Email address",
    "ar": "البريد الإلكتروني"
  },
  "date": {
    "fr": "Date souhaitée",
    "en": "Preferred date",
    "ar": "التاريخ المرغوب"
  },
  "datePlaceholder": {
    "fr": "ex. 15 décembre",
    "en": "e.g. 15 December",
    "ar": "مثال: 15 ديسمبر"
  },
  "budget": {
    "fr": "Budget indicatif (DA)",
    "en": "Indicative budget (DA)",
    "ar": "الميزانية التقريبية (دج)"
  },
  "reply": {
    "fr": "Réponse par",
    "en": "Reply by",
    "ar": "الرد عبر"
  },
  "replyBy": {
    "whatsapp": {
      "fr": "WhatsApp",
      "en": "WhatsApp",
      "ar": "واتساب"
    },
    "call": {
      "fr": "Appel",
      "en": "Call",
      "ar": "مكالمة"
    },
    "email": {
      "fr": "E-mail",
      "en": "Email",
      "ar": "البريد الإلكتروني"
    }
  },
  "missingTitle": {
    "fr": "Champs obligatoires manquants",
    "en": "Required fields missing",
    "ar": "حقول إلزامية ناقصة"
  },
  "less": {
    "fr": "Moins",
    "en": "Less",
    "ar": "أقل"
  },
  "more": {
    "fr": "Plus",
    "en": "More",
    "ar": "أكثر"
  },
  "qty": {
    "fr": "Quantité",
    "en": "Quantity",
    "ar": "الكمية"
  },
  "width": {
    "fr": "Largeur (cm)",
    "en": "Width (cm)",
    "ar": "العرض (سم)"
  },
  "height": {
    "fr": "Hauteur (cm)",
    "en": "Height (cm)",
    "ar": "الارتفاع (سم)"
  },
  "area": {
    "fr": "Surface totale : {m2} m²",
    "en": "Total area: {m2} m²",
    "ar": "المساحة الإجمالية: {m2} م²"
  },
  "min": {
    "fr": "Minimum {n} pièces",
    "en": "Minimum {n} pieces",
    "ar": "الحد الأدنى {n} قطعة"
  },
  "maxChoices": {
    "fr": "{n} choix maximum",
    "en": "{n} choices maximum",
    "ar": "{n} اختيارات كحد أقصى"
  },
  "next": {
    "fr": "Continuer",
    "en": "Continue",
    "ar": "متابعة"
  },
  "back": {
    "fr": "Retour",
    "en": "Go back",
    "ar": "رجوع"
  },
  "review": {
    "fr": "Vérifier mon projet",
    "en": "Review your project",
    "ar": "راجع مشروعك"
  },
  "step": {
    "fr": "Étape {n} / {total}",
    "en": "Step {n} / {total}",
    "ar": "الخطوة {n} / {total}"
  },
  "addService": {
    "fr": "+ Ajouter un autre service",
    "en": "+ Add another service",
    "ar": "+ أضف خدمة أخرى"
  },
  "yes": {
    "fr": "Oui",
    "en": "Yes",
    "ar": "نعم"
  },
  "no": {
    "fr": "Non",
    "en": "No",
    "ar": "لا"
  },
  "chatHello": {
    "fr": "Bonjour Pixel, j’ai une question.",
    "en": "Hello Pixel, I have a question.",
    "ar": "السلام عليكم Pixel، لدي سؤال."
  },
  "chatAbout": {
    "fr": "Bonjour Pixel, j’ai une question sur {service}.",
    "en": "Hello Pixel, I have a question about {service}.",
    "ar": "السلام عليكم Pixel، لدي سؤال حول {service}."
  },
  "chatLabel": {
    "fr": "Écrire à Pixel sur WhatsApp",
    "en": "Message Pixel on WhatsApp",
    "ar": "راسل Pixel عبر واتساب"
  }
} as const satisfies Tree

export const eventsText = {
  "tag": {
    "fr": "PHOTO & VIDÉO",
    "en": "PHOTO & VIDEO",
    "ar": "تصوير و فيديو"
  },
  "weddingTitle": {
    "fr": "Mariage · les packs",
    "en": "Wedding · the packs",
    "ar": "الأعراس · الباقات"
  },
  "weddingIntro": {
    "fr": "Choisissez un pack, ajoutez vos extras : le total se calcule tout seul.",
    "en": "Pick a pack, add your extras: the total adds itself up.",
    "ar": "اختر باقة وأضف الإضافات: يُحسب المجموع تلقائيًا."
  },
  "price": {
    "fr": "{amount} DA",
    "en": "{amount} DA",
    "ar": "{amount} دج"
  },
  "plus": {
    "fr": "+ {amount} DA",
    "en": "+ {amount} DA",
    "ar": "+ {amount} دج"
  },
  "included": {
    "fr": "Inclus dans le pack",
    "en": "Included in the pack",
    "ar": "مشمول في الباقة"
  },
  "inc": {
    "photographers": {
      "fr": "{n} photographes",
      "en": "{n} photographers",
      "ar": "{n} مصورين"
    },
    "coverage": {
      "fr": "Couverture photo et vidéo",
      "en": "Photo and video coverage",
      "ar": "تغطية بالصور والفيديو"
    },
    "prepOne": {
      "fr": "Préparation : homme ou femme",
      "en": "Preparation: groom or bride",
      "ar": "التحضير: العريس أو العروس"
    },
    "prepBoth": {
      "fr": "Préparation : homme et femme",
      "en": "Preparation: groom and bride",
      "ar": "التحضير: العريس والعروس"
    },
    "studio": {
      "fr": "Shooting studio",
      "en": "Studio shoot",
      "ar": "جلسة تصوير في الاستوديو"
    },
    "video": {
      "fr": "Montage vidéo {res}",
      "en": "{res} video editing",
      "ar": "مونتاج فيديو {res}"
    },
    "shortMovie": {
      "fr": "Short movie {res}",
      "en": "{res} short movie",
      "ar": "فيلم قصير {res}"
    },
    "retouch": {
      "fr": "Traitement des photos",
      "en": "Photo retouching",
      "ar": "معالجة الصور"
    },
    "photobook": {
      "fr": "Photobook",
      "en": "Photobook",
      "ar": "ألبوم صور"
    },
    "frames": {
      "fr": "{n} cadres de 60 × 40 cm",
      "en": "{n} frames, 60 × 40 cm",
      "ar": "{n} إطارات 60 × 40 سم"
    },
    "usb": {
      "fr": "Clé USB {n} Go",
      "en": "{n} GB USB drive",
      "ar": "مفتاح USB {n} جيغا"
    },
    "drone": {
      "fr": "Drone",
      "en": "Drone",
      "ar": "درون"
    }
  },
  "extrasTitle": {
    "fr": "Extras",
    "en": "Extras",
    "ar": "الإضافات"
  },
  "extrasHint": {
    "fr": "Seuls les extras non inclus dans votre pack sont proposés.",
    "en": "Only extras your pack doesn’t include are offered.",
    "ar": "تظهر فقط الإضافات غير المشمولة في باقتك."
  },
  "extra": {
    "drone": {
      "fr": "Drone",
      "en": "Drone",
      "ar": "درون"
    },
    "shooting": {
      "fr": "Shooting photo professionnel",
      "en": "Professional photo shoot",
      "ar": "جلسة تصوير احترافية"
    },
    "prep": {
      "fr": "Préparation avant mariage",
      "en": "Pre-wedding preparation",
      "ar": "التحضير قبل العرس"
    }
  },
  "photobook": {
    "fr": "Photobook",
    "en": "Photobook",
    "ar": "ألبوم صور"
  },
  "photobookNone": {
    "fr": "Sans",
    "en": "None",
    "ar": "بدون"
  },
  "photobookIncluded": {
    "fr": "Photobook inclus : choisissez le format, sans supplément.",
    "en": "Photobook included: pick the format, at no extra cost.",
    "ar": "الألبوم مشمول: اختر المقاس دون أي تكلفة إضافية."
  },
  "secondPrep": {
    "fr": "Préparation de la seconde personne : sur devis.",
    "en": "Preparation for the second person: on quote.",
    "ar": "تحضير الشخص الثاني: حسب الطلب."
  },
  "travel": {
    "fr": "Mariage hors wilaya",
    "en": "Wedding outside the wilaya",
    "ar": "عرس خارج الولاية"
  },
  "travelHint": {
    "fr": "Déplacement facturé en supplément, sur devis.",
    "en": "Travel billed on top, on quote.",
    "ar": "التنقل يُحتسب إضافيًا، حسب الطلب."
  },
  "total": {
    "fr": "Total",
    "en": "Total",
    "ar": "المجموع"
  },
  "travelQuote": {
    "fr": "+ déplacement sur devis",
    "en": "+ travel on quote",
    "ar": "+ التنقل حسب الطلب"
  },
  "book": {
    "fr": "Réserver sur WhatsApp",
    "en": "Book on WhatsApp",
    "ar": "احجز عبر واتساب"
  },
  "otherTitle": {
    "fr": "Autres évènements",
    "en": "Other events",
    "ar": "مناسبات أخرى"
  },
  "onQuote": {
    "fr": "Sur devis",
    "en": "On quote",
    "ar": "حسب الطلب"
  },
  "types": {
    "soutenance": {
      "fr": "Soutenance",
      "en": "Thesis defense",
      "ar": "مناقشة مذكرة"
    },
    "media": {
      "fr": "Couverture média",
      "en": "Media coverage",
      "ar": "تغطية إعلامية"
    },
    "concert": {
      "fr": "Couverture de concert",
      "en": "Concert coverage",
      "ar": "تغطية حفل موسيقي"
    },
    "thara": {
      "fr": "Thara",
      "en": "Thara (circumcision)",
      "ar": "طهارة"
    },
    "henna": {
      "fr": "Henna",
      "en": "Henna night",
      "ar": "حنة"
    }
  },
  "msgBooking": {
    "fr": "Bonjour Pixel Events, je souhaite réserver le pack {pack} ({price}).",
    "en": "Hello Pixel Events, I’d like to book the {pack} pack ({price}).",
    "ar": "السلام عليكم Pixel Events، أريد حجز باقة {pack} ({price})."
  },
  "msgExtras": {
    "fr": "Extras : {list}",
    "en": "Extras: {list}",
    "ar": "الإضافات: {list}"
  },
  "msgPhotobook": {
    "fr": "Photobook {format}",
    "en": "Photobook {format}",
    "ar": "ألبوم صور {format}"
  },
  "msgTravel": {
    "fr": "Mariage hors wilaya.",
    "en": "Wedding outside the wilaya.",
    "ar": "عرس خارج الولاية."
  },
  "msgTotal": {
    "fr": "Total : {total}",
    "en": "Total: {total}",
    "ar": "المجموع: {total}"
  },
  "msgQuote": {
    "fr": "Bonjour Pixel Events, je souhaite un devis pour : {event}.",
    "en": "Hello Pixel Events, I’d like a quote for: {event}.",
    "ar": "السلام عليكم Pixel Events، أريد عرض سعر لـ: {event}."
  }
} as const satisfies Tree

export const servicesText = {
  "featuredTag": {
    "fr": "DISPONIBLE · NOUVEAU",
    "en": "AVAILABLE · NEW",
    "ar": "متوفر · جديد"
  },
  "featuredTitle": {
    "fr": "Votre carte digitale",
    "en": "Your digital card",
    "ar": "بطاقتك الرقمية"
  },
  "featuredBody": {
    "fr": "Un QR code sur vos cartes de visite, une page qui vous ressemble.",
    "en": "A QR code on your business cards, a page that looks like you.",
    "ar": "رمز QR على بطاقات زيارتك، وصفحة تشبهك."
  },
  "featuredCtaGuest": {
    "fr": "J’ai un compte",
    "en": "I have an account",
    "ar": "لدي حساب"
  },
  "featuredCtaMember": {
    "fr": "Ouvrir ma carte",
    "en": "Open my card",
    "ar": "فتح بطاقتي"
  },
  "upcoming": {
    "fr": "Nos services",
    "en": "Our services",
    "ar": "خدماتنا"
  },
  "soonTag": {
    "fr": "BIENTÔT",
    "en": "COMING SOON",
    "ar": "قريبًا"
  },
  "soonTitle": {
    "fr": "Ça arrive bientôt dans l’app.",
    "en": "Coming soon to the app.",
    "ar": "قريبًا في التطبيق."
  },
  "soonBody": {
    "fr": "Ce service Pixel est en préparation. Activez la notification : on vous écrit dès qu’il est disponible.",
    "en": "This Pixel service is on its way. Turn on notifications and we will tell you as soon as it is available.",
    "ar": "هذه الخدمة من Pixel قيد التحضير. فعّل الإشعار وسنخبرك فور توفرها."
  },
  "soonNotify": {
    "fr": "Me prévenir",
    "en": "Notify me",
    "ar": "أعلمني"
  },
  "soonFollowing": {
    "fr": "On vous préviendra",
    "en": "We will let you know",
    "ar": "سنُعلمك"
  },
  "items": {
    "creative": {
      "name": {
        "fr": "Pixel Creative",
        "en": "Pixel Creative",
        "ar": "Pixel Creative"
      },
      "desc": {
        "fr": "Identités de marque, design graphique et concepts créatifs.",
        "en": "Brand identities, graphic design and creative concepts.",
        "ar": "هويات العلامات التجارية، التصميم الجرافيكي والمفاهيم الإبداعية."
      }
    },
    "photo": {
      "name": {
        "fr": "Pixel Photo Lab",
        "en": "Pixel Photo Lab",
        "ar": "Pixel Photo Lab"
      },
      "desc": {
        "fr": "Photo studio, photo produit, portraits et shootings commerciaux.",
        "en": "Studio, product, portrait and commercial photography.",
        "ar": "تصوير في الاستوديو، تصوير المنتجات، البورتريه والجلسات التجارية."
      }
    },
    "dev": {
      "name": {
        "fr": "Pixel Dev",
        "en": "Pixel Dev",
        "ar": "Pixel Dev"
      },
      "desc": {
        "fr": "Sites web, plateformes en ligne et solutions digitales.",
        "en": "Websites, web platforms and digital solutions.",
        "ar": "مواقع إلكترونية، منصات رقمية وحلول رقمية."
      }
    },
    "events": {
      "name": {
        "fr": "Pixel Events",
        "en": "Pixel Events",
        "ar": "Pixel Events"
      },
      "desc": {
        "fr": "Photo et film de mariage, couverture d’événements.",
        "en": "Wedding photography, films and event coverage.",
        "ar": "تصوير وأفلام الأعراس وتغطية المناسبات."
      }
    },
    "sounds": {
      "name": {
        "fr": "Pixel Sounds",
        "en": "Pixel Sounds",
        "ar": "Pixel Sounds"
      },
      "desc": {
        "fr": "Voix off, production audio et sound design.",
        "en": "Voice over, audio production and sound design.",
        "ar": "تعليق صوتي، إنتاج صوتي وتصميم صوتي."
      }
    },
    "enseigne": {
      "name": {
        "fr": "Pixel Enseigne",
        "en": "Pixel Enseigne",
        "ar": "Pixel Enseigne"
      },
      "desc": {
        "fr": "Enseignes, signalétique et habillage de façades et de vitrines.",
        "en": "Shop signs, signage and storefront branding.",
        "ar": "لافتات المحلات، اللوحات الإرشادية وتزيين الواجهات."
      }
    },
    "tapini": {
      "name": {
        "fr": "Tapini",
        "en": "Tapini",
        "ar": "Tapini"
      },
      "desc": {
        "fr": "Cartes et supports NFC : un geste du téléphone ouvre vos contacts, vos avis ou votre menu.",
        "en": "NFC cards and supports: one tap of a phone opens your contacts, reviews or menu.",
        "ar": "بطاقات ووسائط NFC: لمسة هاتف تفتح معلوماتك أو تقييماتك أو قائمتك."
      },
      "tagline": {
        "fr": "Supports & services connectés",
        "en": "Connected supports & services",
        "ar": "وسائط وخدمات متصلة"
      }
    }
  }
} as const satisfies Tree
