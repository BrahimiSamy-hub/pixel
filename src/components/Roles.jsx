import { useTranslation } from 'react-i18next'
import {
  loupBleu,
  villagois,
  filleDeJoie,
  avocat,
  barbu,
  bourreau,
  chaman,
  chasseur,
  chevalier,
  comedien,
  corbeau,
  cupidon,
  detective,
  doubleur,
  enfantSauvage,
  fantome,
  flutiste,
  jokerLoup,
  idiot,
  lancien,
  lePreux,
  loupNormal,
  loupMystique,
  loupAlpha,
  loupBlanc,
  loupRouge,
  magicien,
  maitreDuTemps,
  noName,
  petiteFille,
  renard,
  revenant,
  salvateur,
  sorciere,
  tueurEnSerie,
  vampire,
  voleur,
  voyant,
} from '../assets'

const Roles = () => {
  const { t } = useTranslation()

  const roles = [
    {
      image: villagois,
      titleKey: 'Villageois',
      descriptionKey: 'VillageoisDescription',
    },
    {
      image: loupNormal,
      titleKey: 'LoupNormal',
      descriptionKey: 'LoupNormalDescription',
    },

    {
      image: sorciere,
      titleKey: 'Sorciere',
      descriptionKey: 'SorciereDescription',
    },
    {
      image: salvateur,
      titleKey: 'Salvateur',
      descriptionKey: 'SalvateurDescription',
    },
    {
      image: chasseur,
      titleKey: 'Chasseur',
      descriptionKey: 'ChasseurDescription',
    },
    {
      image: voyant,
      titleKey: 'Voyant',
      descriptionKey: 'VoyantDescription',
    },
    {
      image: doubleur,
      titleKey: 'Doubleur',
      descriptionKey: 'DoubleurDescription',
    },
    {
      image: petiteFille,
      titleKey: 'PetiteFille',
      descriptionKey: 'PetiteFilleDescription',
    },
    {
      image: cupidon,
      titleKey: 'Cupidon',
      descriptionKey: 'CupidonDescription',
    },
    { image: idiot, titleKey: 'Idiot', descriptionKey: 'IdiotDescription' },
    {
      image: loupAlpha,
      titleKey: 'LoupAlpha',
      descriptionKey: 'LoupAlphaDescription',
    },
    {
      image: loupRouge,
      titleKey: 'LoupRouge',
      descriptionKey: 'LoupRougeDescription',
    },
    {
      image: loupMystique,
      titleKey: 'LoupMystique',
      descriptionKey: 'LoupMystiqueDescription',
    },
    {
      image: loupBleu,
      titleKey: 'LoupBleu',
      descriptionKey: 'LoupBleuDescription',
    },
    {
      image: loupBlanc,
      titleKey: 'LoupBlanc',
      descriptionKey: 'LoupBlancDescription',
    },
    {
      image: enfantSauvage,
      titleKey: 'EnfantSauvage',
      descriptionKey: 'EnfantSauvageDescription',
    },
    {
      image: flutiste,
      titleKey: 'Flutiste',
      descriptionKey: 'FlutisteDescription',
    },
    {
      image: vampire,
      titleKey: 'Vampire',
      descriptionKey: 'VampireDescription',
    },
    {
      image: fantome,
      titleKey: 'Fantome',
      descriptionKey: 'FantomeDescription',
    },
    {
      image: voleur,
      titleKey: 'Voleur',
      descriptionKey: 'VoleurDescription',
    },
    {
      image: filleDeJoie,
      titleKey: 'FilleDeJoie',
      descriptionKey: 'FilleDeJoieDescription',
    },
    {
      image: comedien,
      titleKey: 'Comedien',
      descriptionKey: 'ComedienDescription',
    },
    {
      image: avocat,
      titleKey: 'Avocat',
      descriptionKey: 'AvocatDescription',
    },
    {
      image: lePreux,
      titleKey: 'LePreux',
      descriptionKey: 'LePreuxDescription',
    },
    { image: barbu, titleKey: 'Barbu', descriptionKey: 'BarbuDescription' },
    {
      image: bourreau,
      titleKey: 'Bourreau',
      descriptionKey: 'BourreauDescription',
    },
    {
      image: revenant,
      titleKey: 'Revenant',
      descriptionKey: 'RevenantDescription',
    },
    {
      image: jokerLoup,
      titleKey: 'JokerLoup',
      descriptionKey: 'JokerLoupDescription',
    },
    {
      image: chevalier,
      titleKey: 'Chevalier',
      descriptionKey: 'ChevalierDescription',
    },
    {
      image: lancien,
      titleKey: 'Lancien',
      descriptionKey: 'LancienDescription',
    },
    {
      image: detective,
      titleKey: 'Detective',
      descriptionKey: 'DetectiveDescription',
    },
    {
      image: tueurEnSerie,
      titleKey: 'TueurEnSerie',
      descriptionKey: 'TueurEnSerieDescription',
    },
    {
      image: maitreDuTemps,
      titleKey: 'MaitreDuTemps',
      descriptionKey: 'MaitreDuTempsDescription',
    },
    {
      image: magicien,
      titleKey: 'Magicien',
      descriptionKey: 'MagicienDescription',
    },
    {
      image: noName,
      titleKey: 'PilleurDeTombe',
      descriptionKey: 'PilleurDeTombeDescription',
    },
    {
      image: chaman,
      titleKey: 'Chaman',
      descriptionKey: 'ChamanDescription',
    },
    {
      image: corbeau,
      titleKey: 'Corbeau',
      descriptionKey: 'CorbeauDescription',
    },
    {
      image: renard,
      titleKey: 'Renard',
      descriptionKey: 'RenardDescription',
    },
  ]

  return (
    <div className='mt-8'>
      <h2 className='h2 uppercase mb-8'>{t('rolesWerwolf')}</h2>
      <ul className='grid grid-cols-1 gap-5 my-8 h6 items-center'>
        {roles.map((role, index) => (
          <li key={index} className='col-span-1 flex gap-4'>
            <img
              src={role.image}
              alt=''
              className='w-14 h-20'
              draggable='false'
            />
            <div>
              <h2 className='h4'>{t(role.titleKey)}</h2>
              <p>{t(role.descriptionKey)}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Roles
