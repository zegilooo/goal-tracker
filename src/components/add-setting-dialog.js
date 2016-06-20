// Ajout/modification de paramètre
// ===============================

// C’est en fait une boîte de dialogue, inclue d’office dans
// le conteneur parent (`SettingsScreen`), et qui va donc être
// initialement *rendered* sans objectif (`goal`), puis verra ses
// propriétés mises à jour à chaque utilisation (`goal` vide pour
// un ajout, `goal` rempli, dont son `id`, pour une modification).
// D'où le `componentWillReceiveProps`…

import autobind from 'autobind-decorator'
import React, { Component, PropTypes } from 'react'

import ContentAdd from 'material-ui/svg-icons/content/add'
import ContentEdit from 'material-ui/svg-icons/content/create'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'

const DEFAULT_STATE = { id: undefined, name: '', target: 5, units: '' }

// Le composant “bête” (présentationnel)
// -------------------------------------

export default class AddSettingDialog extends Component {
  // Comme pour tous les composants “bêtes”, la bonne pratique
  // consiste à expliciter les propriétés autorisées.  Puisqu’on est
  // dans une classe ES6 et qu'on a configuré Babel avec le plugin
  // `transform-class-properties`, on peut se servir de cette syntaxe,
  // actuellement au [stade 1](https://tc39.github.io/process-document/),
  // prévue pour ES8+.
  static propTypes = {
    onAdd: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired
  };

  // Classe ES6 avec un état transient?  On initialise `this.state`
  // dans le constructeur…
  constructor () {
    super()
    this.state = DEFAULT_STATE
  }

  // Lorsqu’on reçoit une mise à jour de `this.props.goal`, on resynchronise
  // notre état transient en commençant par l'état par défaut, suivi de surcharges
  // éventuelles par l’objectif existant passé.  Merci la syntaxe
  // [*object spread*](https://github.com/sebmarkbage/ecmascript-rest-spread)
  // prévue pour ES8+ (stade 2) et fournie par le preset Babel `stage-2`.
  componentWillReceiveProps ({ goal }) {
    this.setState({ ...DEFAULT_STATE, ...goal })
  }

  // Gestionnaire générique de modification de champ, qui reflète la valeur de champ
  // de formulaire (forcément `String`) dans le bon champ de `this.state`, avec une
  // conversion de type à la volée si besoin.
  //
  // Ce code est particulièrement intéressant, parce qu'on y voit…
  //
  // - Une sélection dynamique de fonction (`Number` ou `String`)
  // - Une propriété dynamique/calculée (`[field]`)
  handleChange (field, event) {
    const caster = field === 'target' ? Number : String
    this.setState({ [field]: caster(event.target.value) })
  }

  // Et finalement le `render()`
  render () {
    const { open, onCancel } = this.props
    // Si le `goal` passé a une propriété `id`, c’est un objectif existant, donc
    // on le “modifie”, sinon c'est du vide et on “ajoute” un nouvel objectif.
    const isEditing = 'id' in this.props.goal

    const actions = [
      <FlatButton label='Annuler' secondary onTouchTap={onCancel} />
    ]
    if (isEditing) {
      actions.push(<FlatButton label='Modifier' primary onTouchTap={this.triggerAdd} icon={<ContentEdit />} />)
    } else {
      actions.push(<FlatButton label='Ajouter' primary onTouchTap={this.triggerAdd} icon={<ContentAdd />} />)
    }

    return (
      <Dialog
        title={isEditing ? 'Modifier un objectif' : 'Ajouter un objectif'}
        actions={actions}
        open={open}
        onRequestClose={onCancel}
      >
        <TextField name='name' floatingLabelText='Nom' required fullWidth autoFocus
          value={this.state.name} onChange={this.handleChange.bind(this, 'name')}
        />
        <TextField name='target' floatingLabelText='Quantité par jour' type='number' required
          value={this.state.target} onChange={this.handleChange.bind(this, 'target')}
        />
        {' '}
        <TextField name='units' floatingLabelText='Unité' hintText='pas, minutes de course…' required
          value={this.state.units} onChange={this.handleChange.bind(this, 'units')}
        />
      </Dialog>
    )
  }

  // Pour plus de détails sur cette syntaxe `@autobind`, voyez la documentation
  // du conteneur de connexion.
  @autobind
  triggerAdd () {
    this.props.onAdd(this.state)
    // On réinitialise toujours à l’état par défaut après un ajout, juste au cas où.
    this.setState(DEFAULT_STATE)
  }
}
