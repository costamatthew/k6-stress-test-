import http from 'k6/http'
import { check, sleep } from 'k6'

/**
 * etapas do nosso teste:
 * os primeiros 30 segundos teremos um aumento de 0 a 5 usuarios acessando a api
 * em seguida um periodo de 1m e 30s com o pico de 5 usuarios fazendo requisicoes em loop infinito
 * depois gradativamente os usuarios vao deixar de acessar a api de 5 até chegarem a 0 em 20 segundos
 * **/
export const options = {
  stages: [
    { duration: '30s', target: 5 },
    { duration: '1m30s', target: 5 },
    { duration: '20s', target: 0 },
    // { duration: '5s', target: 5 },
    // { duration: '10s', target: 5 },
    // { duration: '5s', target: 0 },
  ],
}

export default async function () {
  const url = ''
  const payload = JSON.stringify()
  const payload2 = JSON.stringify()

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  console.log(`calling [${url}]`)
  const response = http.post(url, payload, params)
  const response2 = http.post(url, payload2, params)

  check(response, { 'CCOB - status is 201': (r) => r.status === 201 }) //validacao
  check(response2, { 'CRED - status is 201': (r) => r.status === 201 }) //validacao
  sleep(1) //intervalo entre as chamadas
}
