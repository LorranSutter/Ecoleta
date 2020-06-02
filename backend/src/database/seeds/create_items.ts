import Knex from 'knex';

export async function seed(knex: Knex) {
    await knex('items').insert([
        { title: 'Lamps', image: 'lamps.svg' },
        { title: 'Bateries', image: 'bateries.svg' },
        { title: 'Paper and Cardboard', image: 'paper-cardboard.svg' },
        { title: 'Electronics', image: 'electronics.svg' },
        { title: 'Organics', image: 'organics.svg' },
        { title: 'Oil', image: 'oil.svg' }
    ])
}