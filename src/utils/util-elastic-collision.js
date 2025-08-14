/**
 * Rotates coordinate system for velocities
 *
 * Takes velocities and alters them as if the coordinate system they're on was rotated
 *
 * @param  Object | velocity | The velocity of an individual particle
 * @param  Float  | angle    | The angle of collision between two objects in radians
 * @return Object | The altered x and y velocities after the coordinate system has been rotated
 */
/**
 * Gira o sistema de coordenadas para velocidades
 *
 * Toma as velocidades e as altera como se o sistema de coordenadas em que estão fosse girado
 *
 * @param  Object | velocidade | A velocidade de uma partícula individual
 * @param  Float  | ângulo    | O ângulo de colisão entre dois objetos em radianos
 * @return Object | As velocidades x e y alteradas após o sistema de coordenadas ter
 */

function rotate(velocity, angle) {
  const rotatedVelocities = {
    x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
    y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle),
  };

  return rotatedVelocities;
}

/**
 * Swaps out two colliding particles' x and y velocities after running through
 * an elastic collision reaction equation
 *
 * @param  Object | particle      | A particle object with x and y coordinates, plus velocity
 * @param  Object | otherParticle | A particle object with x and y coordinates, plus velocity
 * @return Null | Does not return a value
 */
/**
 * Troca as velocidades de duas partículas em colisão' velocidades x e y após passar
 * por uma equação de reação de colisão elástica
 *
 * @param  Object | particle      | Um objeto partícula com coordenadas x e y, mais a velocidade
 * @param  Object | outraParticle | Um objeto partícula com coordenadas x e y, mais a velocidade
 * @return Null | Não retorna um valor
 */

function resolveCollision(particle, otherParticle) {
  const xVelocityDiff = particle.velocity.x - otherParticle.velocity.x;
  const yVelocityDiff = particle.velocity.y - otherParticle.velocity.y;

  const xDist = otherParticle.x - particle.x;
  const yDist = otherParticle.y - particle.y;

  // Prevent accidental overlap of particles
  // Evitar sobreposição acidental de partículas
  if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {
    // Grab angle between the two colliding particles
    // Pega o ângulo entre as duas partículas em colisão
    const angle = -Math.atan2(
      otherParticle.y - particle.y,
      otherParticle.x - particle.x,
    );

    // Store mass in var for better readability in collision equation
    // Armazena a massa em var para melhor legibilidade na equação de colisão
    const m1 = particle.mass;
    const m2 = otherParticle.mass;

    // Velocity before equation
    // Velocidade antes da equação
    const u1 = rotate(particle.velocity, angle);
    const u2 = rotate(otherParticle.velocity, angle);

    // Velocity after 1d collision equation
    // Velocidade após a equação de colisão 1d (essa equação apenas funciona em uma dimensão)
    const v1 = {
      x: (u1.x * (m1 - m2)) / (m1 + m2) + (u2.x * 2 * m2) / (m1 + m2),
      y: u1.y,
    };
    const v2 = {
      x: (u2.x * (m1 - m2)) / (m1 + m2) + (u1.x * 2 * m2) / (m1 + m2),
      y: u2.y,
    };

    // Final velocity after rotating axis back to original location
    // Velocidade final após girar o eixo de volta para a localização original
    const vFinal1 = rotate(v1, -angle);
    const vFinal2 = rotate(v2, -angle);

    // Swap particle velocities for realistic bounce effect
    // Troca as velocidades das partículas para um efeito de salto realista
    particle.velocity.x = vFinal1.x;
    particle.velocity.y = vFinal1.y;

    otherParticle.velocity.x = vFinal2.x;
    otherParticle.velocity.y = vFinal2.y;
  }
}

export default { rotate, resolveCollision };
