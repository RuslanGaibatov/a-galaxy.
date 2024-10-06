import numpy as np

# Пример расчетов гравитационных взаимодействий с использованием NumPy
G = 6.67430e-11  # Гравитационная постоянная

class CelestialObject:
    def __init__(self, x, y, mass, vx=0, vy=0):
        self.x = x
        self.y = y
        self.mass = mass
        self.vx = vx
        self.vy = vy

    def update_position(self, fx, fy, dt):
        ax = fx / self.mass
        ay = fy / self.mass
        self.vx += ax * dt
        self.vy += ay * dt
        self.x += self.vx * dt
        self.y += self.vy * dt

def calculate_gravitational_force(obj1, obj2):
    dx = obj2.x - obj1.x
    dy = obj2.y - obj1.y
    dist = np.sqrt(dx**2 + dy**2)
    
    if dist == 0:
        return 0, 0

    force = G * obj1.mass * obj2.mass / dist**2
    fx = (dx / dist) * force
    fy = (dy / dist) * force
    
    return fx, fy

# Пример использования
star = CelestialObject(0, 0, 1e10)
planet = CelestialObject(100, 0, 1e6, 0, 30)

fx, fy = calculate_gravitational_force(star, planet)
planet.update_position(fx, fy, 1)
