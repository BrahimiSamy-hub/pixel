import Section from '@/components/Section'

export const metadata = {
  title: 'Politique de Confidentialité | Pixel Creative Agency',
  description: 'Notre politique de confidentialité explique comment nous collectons, utilisons et protégeons vos données personnelles.',
  alternates: { canonical: '/privacy-policy' },
}

export default function PrivacyPolicyPage() {
  return (
    <Section className="pt-[10rem] -mt-[5.25rem]">
      <div className="container">
        <h1 className="h1 mb-8">Politique de Confidentialité</h1>
        <div className="space-y-6 text-n-3">
          <section>
            <h2 className="h4 text-n-1 mb-4">1. Introduction</h2>
            <p>
              Chez Pixel Creative Agency, nous accordons une grande importance à la protection de vos données personnelles. 
              Cette politique de confidentialité vous informe sur la manière dont nous collectons et traitons vos données 
              conformément à la législation en vigueur en Algérie.
            </p>
          </section>

          <section>
            <h2 className="h4 text-n-1 mb-4">2. Données collectées</h2>
            <p>
              Nous collectons les informations que vous nous fournissez directement via nos formulaires de contact ou lors de vos commandes :
            </p>
            <ul className="list-disc ml-6 mt-2 space-y-2">
              <li>Nom et prénom</li>
              <li>Adresse e-mail</li>
              <li>Numéro de téléphone</li>
              <li>Détails de votre projet ou commande</li>
            </ul>
          </section>

          <section>
            <h2 className="h4 text-n-1 mb-4">3. Utilisation des données</h2>
            <p>Vos données sont utilisées exclusivement pour :</p>
            <ul className="list-disc ml-6 mt-2 space-y-2">
              <li>Répondre à vos demandes de devis ou d'informations</li>
              <li>Gérer vos commandes et la livraison de nos services</li>
              <li>Améliorer nos services et votre expérience sur notre site</li>
            </ul>
          </section>

          <section>
            <h2 className="h4 text-n-1 mb-4">4. Conservation des données</h2>
            <p>
              Nous conservons vos données personnelles uniquement pour la durée nécessaire aux finalités pour lesquelles elles ont été collectées, 
              sauf si la loi exige une durée de conservation plus longue.
            </p>
          </section>

          <section>
            <h2 className="h4 text-n-1 mb-4">5. Vos droits</h2>
            <p>
              Conformément à la loi 18-07 relative à la protection des personnes physiques dans le traitement des données à caractère personnel, 
              vous disposez d'un droit d'accès, de rectification et de suppression de vos données.
            </p>
          </section>

          <section>
            <h2 className="h4 text-n-1 mb-4">6. Contact</h2>
            <p>
              Pour toute question concernant votre confidentialité, vous pouvez nous contacter à : 
              <a href="mailto:contact@pixeldz.store" className="text-color-1 ml-1">contact@pixeldz.store</a>
            </p>
          </section>

          <div className="pt-8 border-t border-n-6 text-sm">
            Dernière mise à jour : 3 Avril 2026
          </div>
        </div>
      </div>
    </Section>
  )
}
