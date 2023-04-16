const express = require('express');
const axios = require('axios');
const router = express.Router();
const dotenv = require('dotenv');
dotenv.config();

const BASE_URL = 'https://gorest.co.in/public/v2';
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

// middleware для збору статистики
const statsMiddleware = (req, res, next) => {
  const { method, path, params, query } = req;
  const stats = { method, path, params, query };
  console.log('Stats:', stats);
  next();
};

// додавання middleware до кожного маршруту
router.use(statsMiddleware);

// Список всіх користувачів
router.get('/', async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/users`, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Знайти користувача по id 
router.get('/:id', async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/users/${req.params.id}`, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Створити нового користувача
router.post('/', async (req, res) => {
  try {
    const response = await axios.post(`${BASE_URL}/users`, req.body, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Оновити інформацію про користувача
router.patch('/:id', async (req, res) => {
  try {
    const response = await axios.patch(`${BASE_URL}/users/${req.params.id}`, req.body, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// Видалити користувача
router.delete('/:id', async (req, res) => {
  try {
    const response = await axios.delete(`${BASE_URL}/users/${req.params.id}`, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
