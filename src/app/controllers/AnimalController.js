import * as Yup from 'yup';
import Animal from '../models/Animal';

class AnimalController {
  async index(req, res) {
    const animal = await Animal.findOne({
      _id: req.params.id,
    });

    return res.json(animal);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      type: Yup.string().required(),
      name: Yup.string().required(),
      weight: Yup.number()
        .required()
        .positive(),
      age: Yup.number()
        .positive()
        .integer()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { type, name, weight, age } = req.body;

    const animal = await Animal.create({
      type,
      name,
      weight,
      age,
    });

    return res.json(animal);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      type: Yup.string().required(),
      name: Yup.string().required(),
      weight: Yup.number()
        .positive()
        .required(),
      age: Yup.number()
        .positive()
        .integer()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { type, name, weight, age } = req.body;
    const animalId = req.params.id;

    const animal = await Animal.findByIdAndUpdate(
      animalId,
      {
        type,
        name,
        weight,
        age,
      },
      { new: true }
    );

    return res.json(animal);
  }
}

export default new AnimalController();
