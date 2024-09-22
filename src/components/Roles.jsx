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
  loupAlpha,
  loupBlanc,
  loupIcon,
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
      image: loupBleu,
      titleKey: 'LoupBleu',
      descriptionKey: 'LoupBleuDescription',
    },
    {
      image: filleDeJoie,
      titleKey: 'FilleDeJoie',
      descriptionKey: 'FilleDeJoieDescription',
    },
    {
      image: avocat,
      titleKey: 'Avocat',
      descriptionKey: 'AvocatDescription',
    },
    { image: barbu, titleKey: 'Barbu', descriptionKey: 'BarbuDescription' },
    {
      image: bourreau,
      titleKey: 'Bourreau',
      descriptionKey: 'BourreauDescription',
    },
    {
      image: chaman,
      titleKey: 'Chaman',
      descriptionKey: 'ChamanDescription',
    },
    {
      image: chasseur,
      titleKey: 'Chasseur',
      descriptionKey: 'ChasseurDescription',
    },
    {
      image: chevalier,
      titleKey: 'Chevalier',
      descriptionKey: 'ChevalierDescription',
    },
    {
      image: comedien,
      titleKey: 'Comedien',
      descriptionKey: 'ComedienDescription',
    },
    {
      image: corbeau,
      titleKey: 'Corbeau',
      descriptionKey: 'CorbeauDescription',
    },
    {
      image: cupidon,
      titleKey: 'Cupidon',
      descriptionKey: 'CupidonDescription',
    },
    {
      image: detective,
      titleKey: 'Detective',
      descriptionKey: 'DetectiveDescription',
    },
    {
      image: doubleur,
      titleKey: 'Doubleur',
      descriptionKey: 'DoubleurDescription',
    },
    {
      image: enfantSauvage,
      titleKey: 'EnfantSauvage',
      descriptionKey: 'EnfantSauvageDescription',
    },
    {
      image: fantome,
      titleKey: 'Fantome',
      descriptionKey: 'FantomeDescription',
    },
    {
      image: flutiste,
      titleKey: 'Flutiste',
      descriptionKey: 'FlutisteDescription',
    },
    {
      image: jokerLoup,
      titleKey: 'JokerLoup',
      descriptionKey: 'JokerLoupDescription',
    },
    { image: idiot, titleKey: 'Idiot', descriptionKey: 'IdiotDescription' },
    {
      image: lancien,
      titleKey: 'Lancien',
      descriptionKey: 'LancienDescription',
    },
    {
      image: lePreux,
      titleKey: 'LePreux',
      descriptionKey: 'LePreuxDescription',
    },
    {
      image: loupNormal,
      titleKey: 'LoupNormal',
      descriptionKey: 'LoupNormalDescription',
    },
    {
      image: loupAlpha,
      titleKey: 'LoupAlpha',
      descriptionKey: 'LoupAlphaDescription',
    },
    {
      image: loupBlanc,
      titleKey: 'LoupBlanc',
      descriptionKey: 'LoupBlancDescription',
    },
    {
      image: loupIcon,
      titleKey: 'LoupIcon',
      descriptionKey: 'LoupIconDescription',
    },
    {
      image: loupRouge,
      titleKey: 'LoupRouge',
      descriptionKey: 'LoupRougeDescription',
    },
    {
      image: magicien,
      titleKey: 'Magicien',
      descriptionKey: 'MagicienDescription',
    },
    {
      image: maitreDuTemps,
      titleKey: 'MaitreDuTemps',
      descriptionKey: 'MaitreDuTempsDescription',
    },
    {
      image: noName,
      titleKey: 'PilleurDeTombe',
      descriptionKey: 'PilleurDeTombeDescription',
    },
    {
      image: petiteFille,
      titleKey: 'PetiteFille',
      descriptionKey: 'PetiteFilleDescription',
    },
    {
      image: renard,
      titleKey: 'Renard',
      descriptionKey: 'RenardDescription',
    },
    {
      image: revenant,
      titleKey: 'Revenant',
      descriptionKey: 'RevenantDescription',
    },
    {
      image: salvateur,
      titleKey: 'Salvateur',
      descriptionKey: 'SalvateurDescription',
    },
    {
      image: sorciere,
      titleKey: 'Sorciere',
      descriptionKey: 'SorciereDescription',
    },
    {
      image: tueurEnSerie,
      titleKey: 'TueurEnSerie',
      descriptionKey: 'TueurEnSerieDescription',
    },
    {
      image: vampire,
      titleKey: 'Vampire',
      descriptionKey: 'VampireDescription',
    },
    {
      image: voleur,
      titleKey: 'Voleur',
      descriptionKey: 'VoleurDescription',
    },
    {
      image: voyant,
      titleKey: 'Voyant',
      descriptionKey: 'VoyantDescription',
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
