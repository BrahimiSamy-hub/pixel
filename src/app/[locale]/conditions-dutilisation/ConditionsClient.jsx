"use client"
import { motion } from 'framer-motion'
import Section from '@/components/Section'
import ButtonGradient from '@/assets/svg/ButtonGradient'
import { useLocale } from 'next-intl'
import { Link } from '@/navigation'
import { FaFileContract, FaShieldAlt, FaGavel, FaCopyright, FaEnvelope } from 'react-icons/fa'

const sections = [
  {
    id: 'acceptance',
    icon: FaFileContract,
    title: "1. Acceptation des conditions",
    content: `En accédant et en utilisant le site web de Pixel Creative Agency (pixeldz.store), vous acceptez d'être lié par les présentes Conditions Générales d'Utilisation. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser notre site.`,
  },
  {
    id: 'services',
    icon: FaShieldAlt,
    title: '2. Services proposés',
    content: `Pixel Creative Agency propose des services de photographie professionnelle, design graphique, développement web, production audio et vidéo, et publicité. Les détails de chaque service, y compris les tarifs, sont disponibles sur notre site. Nous nous réservons le droit de modifier nos services à tout moment.`,
  },
  {
    id: 'property',
    icon: FaCopyright,
    title: '3. Propriété intellectuelle',
    content: `Tout le contenu présent sur ce site (textes, images, vidéos, logos, design) est la propriété exclusive de Pixel Creative Agency et est protégé par les lois sur le droit d'auteur en vigueur en Algérie. Toute reproduction, distribution ou utilisation sans autorisation écrite préalable est strictement interdite.`,
  },
  {
    id: 'privacy',
    icon: FaShieldAlt,
    title: '4. Données personnelles et cookies',
    content: `Nous collectons certaines données personnelles lors de l'utilisation de notre site (via des formulaires de contact, commandes, etc.). Ces données sont traitées conformément à notre Politique de Confidentialité. Nous utilisons également des cookies analytiques (Google Analytics) pour améliorer notre site — vous pouvez gérer votre consentement via la bannière de cookies.`,
  },
  {
    id: 'liability',
    icon: FaGavel,
    title: '5. Limitation de responsabilité',
    content: `Pixel Creative Agency s'efforce de maintenir les informations du site à jour et exactes, mais ne peut garantir leur exhaustivité ou leur exactitude à tout moment. Nous déclinons toute responsabilité pour les dommages directs ou indirects résultant de l'utilisation de notre site ou de nos services.`,
  },
  {
    id: 'law',
    icon: FaGavel,
    title: '6. Droit applicable',
    content: `Les présentes conditions sont régies par le droit algérien. Tout litige relatif à leur interprétation ou exécution sera soumis aux tribunaux compétents de la wilaya de Batna, Algérie.`,
  },
  {
    id: 'modifications',
    icon: FaFileContract,
    title: '7. Modifications',
    content: `Nous nous réservons le droit de modifier ces Conditions Générales d'Utilisation à tout moment. Les modifications prennent effet dès leur publication sur le site. Nous vous encourageons à consulter régulièrement cette page.`,
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

const ConditionsClient = () => {
  const locale = useLocale()

  return (
    <>
      <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
        <Section
          className="pt-[6rem] -mt-[5.25rem] min-h-screen"
          crosses
          crossesOffset="lg:translate-y-[5.25rem]"
          customPaddings
        >
          <div className="container pb-16">
            {/* Hero Header */}
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-14"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F17A28]/10 border border-[#F17A28]/30 text-[#F17A28] text-xs font-semibold uppercase tracking-wider mb-6">
                <FaFileContract />
                Document légal
              </div>
              <h1 className="h2 uppercase mb-4 bg-gradient-to-r from-n-1 via-[#F17A28] to-n-1 bg-clip-text text-transparent">
                Conditions Générales d&apos;Utilisation
              </h1>
              <p className="text-n-3 text-sm max-w-xl mx-auto leading-relaxed">
                Pixel Creative Agency — Batna, Algérie<br />
                <span className="text-n-4">Dernière mise à jour : Mai 2026</span>
              </p>
              <div className="h-px w-24 mx-auto mt-6 bg-gradient-to-r from-transparent via-[#F17A28] to-transparent" />
            </motion.div>

            {/* Sections */}
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="max-w-3xl mx-auto space-y-6"
            >
              {sections.map((section) => {
                const Icon = section.icon
                return (
                  <motion.div
                    key={section.id}
                    variants={item}
                    className="group relative bg-n-7/50 backdrop-blur-sm border border-n-6 hover:border-[#F17A28]/40 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-[#F17A28]/5"
                  >
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#F17A28]/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#F17A28]/10 border border-[#F17A28]/20 flex items-center justify-center group-hover:bg-[#F17A28]/20 transition-colors duration-300">
                        <Icon className="text-[#F17A28] text-sm" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h2 className="font-bold text-n-1 mb-2 text-base">{section.title}</h2>
                        <p className="text-n-3 text-sm leading-7">{section.content}</p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}

              {/* Contact Section */}
              <motion.div
                variants={item}
                className="bg-gradient-to-br from-[#F17A28]/10 to-n-7/50 border border-[#F17A28]/30 rounded-2xl p-6 text-center"
              >
                <FaEnvelope className="text-[#F17A28] text-2xl mx-auto mb-3" />
                <h2 className="font-bold text-n-1 mb-2 text-base">8. Contact</h2>
                <p className="text-n-3 text-sm mb-4 leading-relaxed">
                  Pour toute question relative à ces conditions, contactez-nous :
                </p>
                <div className="flex flex-wrap gap-3 justify-center">
                  <a
                    href="mailto:contact@pixeldz.store"
                    id="cgu-email-link"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#F17A28] hover:bg-[#d96920] text-white text-sm font-semibold rounded-xl transition-colors duration-200"
                  >
                    contact@pixeldz.store
                  </a>
                  <Link
                    href="/contact"
                    id="cgu-contact-link"
                    className="inline-flex items-center gap-2 px-4 py-2 border border-n-5 hover:border-[#F17A28] text-n-3 hover:text-[#F17A28] text-sm font-semibold rounded-xl transition-colors duration-200"
                  >
                    Formulaire de contact
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </Section>
      </div>
      <ButtonGradient />
    </>
  )
}

export default ConditionsClient
