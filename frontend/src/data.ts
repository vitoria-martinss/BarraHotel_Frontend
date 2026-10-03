// ─── Types ────────────────────────────────────────────────────────────────────

export type RoomCategory = 'Single' | 'Casal' | 'Triplo' | 'Quádruplo';
export type RoomSubcategory =
  | 'com ar-condicionado'
  | 'com ventilador'
  | 'com ar-condicionado + frigobar';
export type RoomStatus = 'Disponível' | 'Reservado' | 'Ocupado' | 'Limpeza' | 'Manutenção';
export type ReservationStatus =
  | 'Pendente'
  | 'Confirmada'
  | 'Em hospedagem'
  | 'Finalizada'
  | 'Cancelada';
export type PaymentMethod =
  | 'PIX'
  | 'Cartão de crédito'
  | 'Cartão de débito'
  | 'Dinheiro';
export type EmployeeRole = 'Administrador' | 'Gerente' | 'Recepcionista' | 'Funcionário';
export type TaskStatus = 'Pendente' | 'Em andamento' | 'Concluído';
export type TaskType = 'Limpeza' | 'Manutenção';
export type UserRole = 'guest' | 'staff' | 'admin';

export interface Room {
  id: string;
  number: string;
  floor: number;
  category: RoomCategory;
  subcategory: RoomSubcategory;
  capacity: number;
  beds: number;
  bedType: string;
  amenities: string[];
  description: string;
  dailyRate: number;
  status: RoomStatus;
  photo: string;
  observations?: string;
}

export interface Guest {
  id: string;
  name: string;
  cpf: string;
  birthDate: string;
  gender: 'Masculino' | 'Feminino' | 'Outro';
  email: string;
  phone: string;
  mobile: string;
  zipCode: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  addressNumber: string;
  complement?: string;
  registeredAt: string;
  status: 'Ativo' | 'Inativo';
  totalReservations: number;
  lastStay?: string;
}

export interface Reservation {
  id: string;
  code: string;
  guestId: string;
  roomId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  dailyRate: number;
  nights: number;
  total: number;
  paymentMethod: PaymentMethod;
  status: ReservationStatus;
  createdAt: string;
  notes?: string;
}

export interface Employee {
  id: string;
  name: string;
  cpf: string;
  birthDate: string;
  email: string;
  phone: string;
  role: EmployeeRole;
  department: string;
  hiredAt: string;
  status: 'Ativo' | 'Inativo';
  username: string;
}

export interface Task {
  id: string;
  roomId: string;
  type: TaskType;
  employeeId: string;
  date: string;
  time: string;
  status: TaskStatus;
  notes?: string;
  priority: 'Baixa' | 'Média' | 'Alta';
}

export interface Notification {
  id: string;
  type: 'success' | 'warning' | 'info' | 'error';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

// ─── Room Photos (Unsplash) ───────────────────────────────────────────────────
const ROOM_PHOTOS = {
  single: [
    'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&h=600&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1629140727571-9b5c6f6267b4?w=800&h=600&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1711059985570-4c32ed12a12c?w=800&h=600&fit=crop&auto=format',
  ],
  casal: [
    'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&h=600&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1578898886225-c7c894047899?w=800&h=600&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1731336478850-6bce7235e320?w=800&h=600&fit=crop&auto=format',
  ],
  triplo: [
    'https://images.unsplash.com/photo-1605346434674-a440ca4dc4c0?w=800&h=600&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&h=600&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1629140727571-9b5c6f6267b4?w=800&h=600&fit=crop&auto=format',
  ],
  quadruplo: [
    'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&h=600&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1605346434674-a440ca4dc4c0?w=800&h=600&fit=crop&auto=format',
    'https://images.unsplash.com/photo-1578898886225-c7c894047899?w=800&h=600&fit=crop&auto=format',
  ],
};

// ─── Rooms (36 rooms) ─────────────────────────────────────────────────────────
export const rooms: Room[] = [
  // Single com ar-condicionado (101-103)
  { id: 'R001', number: '101', floor: 1, category: 'Single', subcategory: 'com ar-condicionado', capacity: 1, beds: 1, bedType: 'Solteiro', amenities: ['Ar-condicionado', 'Wi-Fi', 'TV 32"', 'Banheiro privativo', 'Cofre'], description: 'Quarto individual confortável com ar-condicionado, ideal para viajantes a negócios.', dailyRate: 120, status: 'Disponível', photo: '/images/IMG-20260226-WA0080.jpg' },
  { id: 'R002', number: '102', floor: 1, category: 'Single', subcategory: 'com ar-condicionado', capacity: 1, beds: 1, bedType: 'Solteiro', amenities: ['Ar-condicionado', 'Wi-Fi', 'TV 32"', 'Banheiro privativo', 'Cofre'], description: 'Quarto individual com vista para o jardim interno.', dailyRate: 120, status: 'Ocupado', photo: ROOM_PHOTOS.single[1] },
  { id: 'R003', number: '103', floor: 1, category: 'Single', subcategory: 'com ar-condicionado', capacity: 1, beds: 1, bedType: 'Solteiro', amenities: ['Ar-condicionado', 'Wi-Fi', 'TV 32"', 'Banheiro privativo', 'Cofre'], description: 'Quarto individual com ar-condicionado e mobília moderna.', dailyRate: 120, status: 'Reservado', photo: ROOM_PHOTOS.single[2] },

  // Single com ventilador (104-106)
  { id: 'R004', number: '104', floor: 1, category: 'Single', subcategory: 'com ventilador', capacity: 1, beds: 1, bedType: 'Solteiro', amenities: ['Ventilador de teto', 'Wi-Fi', 'TV 32"', 'Banheiro privativo'], description: 'Quarto individual econômico com ventilador de teto.', dailyRate: 90, status: 'Disponível', photo: '/images/IMG-20260226-WA0076.jpg' },
  { id: 'R005', number: '105', floor: 1, category: 'Single', subcategory: 'com ventilador', capacity: 1, beds: 1, bedType: 'Solteiro', amenities: ['Ventilador de teto', 'Wi-Fi', 'TV 32"', 'Banheiro privativo'], description: 'Quarto individual simples e aconchegante.', dailyRate: 90, status: 'Limpeza', photo: ROOM_PHOTOS.single[1] },
  { id: 'R006', number: '106', floor: 1, category: 'Casal', subcategory: 'com ar-condicionado', capacity: 2, beds: 2, bedType: 'Casal', amenities: ['Ar-condicionado', 'Wi-Fi', 'TV 32"', 'Banheiro privativo'], description: 'Quarto standard para casal com ar-condicionado.', dailyRate: 130, status: 'Disponível', photo: '/images/IMG_20260501_142233625_HDR.jpg' },

  // Single com ar + frigobar (107-109)
  { id: 'R007', number: '107', floor: 1, category: 'Single', subcategory: 'com ar-condicionado + frigobar', capacity: 1, beds: 1, bedType: 'Solteiro', amenities: ['Ar-condicionado', 'Frigobar', 'Wi-Fi', 'TV 40"', 'Banheiro privativo', 'Cofre', 'Mesa de trabalho'], description: 'Quarto individual premium com ar-condicionado e frigobar abastecido.', dailyRate: 150, status: 'Disponível', photo: '/images/IMG-20260226-WA0080.jpg' },
  { id: 'R008', number: '108', floor: 1, category: 'Single', subcategory: 'com ar-condicionado + frigobar', capacity: 1, beds: 1, bedType: 'Solteiro', amenities: ['Ar-condicionado', 'Frigobar', 'Wi-Fi', 'TV 40"', 'Banheiro privativo', 'Cofre', 'Mesa de trabalho'], description: 'Quarto individual superior com frigobar e vista privilegiada.', dailyRate: 150, status: 'Manutenção', photo: ROOM_PHOTOS.single[1], observations: 'Ar-condicionado em manutenção' },
  { id: 'R009', number: '109', floor: 1, category: 'Single', subcategory: 'com ar-condicionado + frigobar', capacity: 1, beds: 1, bedType: 'Solteiro', amenities: ['Ar-condicionado', 'Frigobar', 'Wi-Fi', 'TV 40"', 'Banheiro privativo', 'Cofre', 'Mesa de trabalho'], description: 'Quarto individual executivo com todas as comodidades.', dailyRate: 150, status: 'Disponível', photo: ROOM_PHOTOS.single[2] },

  // Casal com ar-condicionado (201-203)
  { id: 'R010', number: '201', floor: 2, category: 'Casal', subcategory: 'com ar-condicionado', capacity: 2, beds: 1, bedType: 'Casal', amenities: ['Ar-condicionado', 'Wi-Fi', 'TV 40"', 'Banheiro privativo', 'Varanda', 'Cofre'], description: 'Quarto casal elegante com varanda e ar-condicionado.', dailyRate: 180, status: 'Disponível', photo: ROOM_PHOTOS.casal[0] },
  { id: 'R011', number: '202', floor: 2, category: 'Casal', subcategory: 'com ar-condicionado', capacity: 2, beds: 1, bedType: 'Casal', amenities: ['Ar-condicionado', 'Wi-Fi', 'TV 40"', 'Banheiro privativo', 'Varanda', 'Cofre'], description: 'Quarto casal com vista para a cidade e cama king size.', dailyRate: 180, status: 'Ocupado', photo: ROOM_PHOTOS.casal[1] },
  { id: 'R012', number: '203', floor: 2, category: 'Casal', subcategory: 'com ar-condicionado', capacity: 2, beds: 1, bedType: 'Casal', amenities: ['Ar-condicionado', 'Wi-Fi', 'TV 40"', 'Banheiro privativo', 'Varanda', 'Cofre'], description: 'Quarto casal confortável com decoração moderna.', dailyRate: 180, status: 'Reservado', photo: ROOM_PHOTOS.casal[2] },

  // Casal com ventilador (204-206)
  { id: 'R013', number: '204', floor: 2, category: 'Casal', subcategory: 'com ventilador', capacity: 2, beds: 1, bedType: 'Casal', amenities: ['Ventilador de teto', 'Wi-Fi', 'TV 40"', 'Banheiro privativo'], description: 'Quarto casal econômico com cama de casal e ventilador.', dailyRate: 140, status: 'Disponível', photo: ROOM_PHOTOS.casal[0] },
  { id: 'R014', number: '205', floor: 2, category: 'Casal', subcategory: 'com ventilador', capacity: 2, beds: 1, bedType: 'Casal', amenities: ['Ventilador de teto', 'Wi-Fi', 'TV 40"', 'Banheiro privativo'], description: 'Quarto casal aconchegante com boa ventilação natural.', dailyRate: 140, status: 'Disponível', photo: ROOM_PHOTOS.casal[1] },
  { id: 'R015', number: '206', floor: 2, category: 'Casal', subcategory: 'com ventilador', capacity: 2, beds: 1, bedType: 'Casal', amenities: ['Ventilador de teto', 'Wi-Fi', 'TV 40"', 'Banheiro privativo'], description: 'Quarto casal simples e espaçoso.', dailyRate: 140, status: 'Limpeza', photo: ROOM_PHOTOS.casal[2] },

  // Casal com ar + frigobar (207-209)
  { id: 'R016', number: '207', floor: 2, category: 'Casal', subcategory: 'com ar-condicionado + frigobar', capacity: 2, beds: 1, bedType: 'King', amenities: ['Ar-condicionado', 'Frigobar', 'Wi-Fi', 'TV 50"', 'Banheiro com banheira', 'Varanda', 'Cofre', 'Secador'], description: 'Suíte casal luxuosa com banheira e frigobar premium.', dailyRate: 220, status: 'Disponível', photo: ROOM_PHOTOS.casal[0] },
  { id: 'R017', number: '208', floor: 2, category: 'Casal', subcategory: 'com ar-condicionado + frigobar', capacity: 2, beds: 1, bedType: 'King', amenities: ['Ar-condicionado', 'Frigobar', 'Wi-Fi', 'TV 50"', 'Banheiro com banheira', 'Varanda', 'Cofre', 'Secador'], description: 'Suíte romântica com vista panorâmica e cama king.', dailyRate: 220, status: 'Ocupado', photo: ROOM_PHOTOS.casal[1] },
  { id: 'R018', number: '209', floor: 2, category: 'Casal', subcategory: 'com ar-condicionado + frigobar', capacity: 2, beds: 1, bedType: 'King', amenities: ['Ar-condicionado', 'Frigobar', 'Wi-Fi', 'TV 50"', 'Banheiro com banheira', 'Varanda', 'Cofre', 'Secador'], description: 'Suíte casal com decoração exclusiva e conforto máximo.', dailyRate: 220, status: 'Reservado', photo: ROOM_PHOTOS.casal[2] },

  // Triplo com ar-condicionado (301-303)
  { id: 'R019', number: '301', floor: 3, category: 'Triplo', subcategory: 'com ar-condicionado', capacity: 3, beds: 3, bedType: 'Solteiro', amenities: ['Ar-condicionado', 'Wi-Fi', 'TV 40"', 'Banheiro privativo', 'Cofre'], description: 'Quarto triplo ideal para famílias ou grupos de 3 pessoas.', dailyRate: 250, status: 'Disponível', photo: ROOM_PHOTOS.triplo[0] },
  { id: 'R020', number: '302', floor: 3, category: 'Triplo', subcategory: 'com ar-condicionado', capacity: 3, beds: 3, bedType: 'Solteiro', amenities: ['Ar-condicionado', 'Wi-Fi', 'TV 40"', 'Banheiro privativo', 'Cofre'], description: 'Quarto triplo espaçoso com ar-condicionado e 3 camas solteiro.', dailyRate: 250, status: 'Ocupado', photo: ROOM_PHOTOS.triplo[1] },
  { id: 'R021', number: '303', floor: 3, category: 'Triplo', subcategory: 'com ar-condicionado', capacity: 3, beds: 3, bedType: 'Solteiro', amenities: ['Ar-condicionado', 'Wi-Fi', 'TV 40"', 'Banheiro privativo', 'Cofre'], description: 'Quarto triplo confortável para viagens em grupo.', dailyRate: 250, status: 'Disponível', photo: ROOM_PHOTOS.triplo[2] },

  // Triplo com ventilador (304-306)
  { id: 'R022', number: '304', floor: 3, category: 'Triplo', subcategory: 'com ventilador', capacity: 3, beds: 3, bedType: 'Solteiro', amenities: ['Ventilador de teto', 'Wi-Fi', 'TV 40"', 'Banheiro privativo'], description: 'Quarto triplo econômico com boa ventilação.', dailyRate: 200, status: 'Disponível', photo: ROOM_PHOTOS.triplo[0] },
  { id: 'R023', number: '305', floor: 3, category: 'Triplo', subcategory: 'com ventilador', capacity: 3, beds: 3, bedType: 'Solteiro', amenities: ['Ventilador de teto', 'Wi-Fi', 'TV 40"', 'Banheiro privativo'], description: 'Quarto triplo aconchegante com ventiladores de teto.', dailyRate: 200, status: 'Reservado', photo: ROOM_PHOTOS.triplo[1] },
  { id: 'R024', number: '306', floor: 3, category: 'Triplo', subcategory: 'com ventilador', capacity: 3, beds: 3, bedType: 'Solteiro', amenities: ['Ventilador de teto', 'Wi-Fi', 'TV 40"', 'Banheiro privativo'], description: 'Quarto triplo simples e funcional.', dailyRate: 200, status: 'Disponível', photo: ROOM_PHOTOS.triplo[2] },

  // Triplo com ar + frigobar (307-309)
  { id: 'R025', number: '307', floor: 3, category: 'Triplo', subcategory: 'com ar-condicionado + frigobar', capacity: 3, beds: 3, bedType: 'Solteiro', amenities: ['Ar-condicionado', 'Frigobar', 'Wi-Fi', 'TV 50"', 'Banheiro amplo', 'Cofre', 'Secador'], description: 'Quarto triplo superior com frigobar e todas as comodidades.', dailyRate: 300, status: 'Disponível', photo: ROOM_PHOTOS.triplo[0] },
  { id: 'R026', number: '308', floor: 3, category: 'Triplo', subcategory: 'com ar-condicionado + frigobar', capacity: 3, beds: 3, bedType: 'Solteiro', amenities: ['Ar-condicionado', 'Frigobar', 'Wi-Fi', 'TV 50"', 'Banheiro amplo', 'Cofre', 'Secador'], description: 'Quarto triplo premium com vista e frigobar completo.', dailyRate: 300, status: 'Ocupado', photo: ROOM_PHOTOS.triplo[1] },
  { id: 'R027', number: '309', floor: 3, category: 'Triplo', subcategory: 'com ar-condicionado + frigobar', capacity: 3, beds: 3, bedType: 'Solteiro', amenities: ['Ar-condicionado', 'Frigobar', 'Wi-Fi', 'TV 50"', 'Banheiro amplo', 'Cofre', 'Secador'], description: 'Quarto triplo deluxe para famílias que buscam conforto.', dailyRate: 300, status: 'Limpeza', photo: ROOM_PHOTOS.triplo[2] },

  // Quádruplo com ar-condicionado (401-403)
  { id: 'R028', number: '401', floor: 4, category: 'Quádruplo', subcategory: 'com ar-condicionado', capacity: 4, beds: 4, bedType: 'Solteiro', amenities: ['Ar-condicionado', 'Wi-Fi', 'TV 40"', 'Banheiro privativo', 'Cofre', 'Varanda'], description: 'Quarto quádruplo amplo com 4 camas solteiro e ar-condicionado.', dailyRate: 320, status: 'Disponível', photo: ROOM_PHOTOS.quadruplo[0] },
  { id: 'R029', number: '402', floor: 4, category: 'Quádruplo', subcategory: 'com ar-condicionado', capacity: 4, beds: 4, bedType: 'Solteiro', amenities: ['Ar-condicionado', 'Wi-Fi', 'TV 40"', 'Banheiro privativo', 'Cofre', 'Varanda'], description: 'Quarto quádruplo com varanda e vista panorâmica.', dailyRate: 320, status: 'Reservado', photo: ROOM_PHOTOS.quadruplo[1] },
  { id: 'R030', number: '403', floor: 4, category: 'Quádruplo', subcategory: 'com ar-condicionado', capacity: 4, beds: 4, bedType: 'Solteiro', amenities: ['Ar-condicionado', 'Wi-Fi', 'TV 40"', 'Banheiro privativo', 'Cofre', 'Varanda'], description: 'Quarto quádruplo ideal para famílias numerosas.', dailyRate: 320, status: 'Disponível', photo: ROOM_PHOTOS.quadruplo[2] },

  // Quádruplo com ventilador (404-406)
  { id: 'R031', number: '404', floor: 4, category: 'Quádruplo', subcategory: 'com ventilador', capacity: 4, beds: 4, bedType: 'Solteiro', amenities: ['Ventilador de teto', 'Wi-Fi', 'TV 40"', 'Banheiro privativo'], description: 'Quarto quádruplo econômico com ventiladores de teto.', dailyRate: 260, status: 'Disponível', photo: ROOM_PHOTOS.quadruplo[0] },
  { id: 'R032', number: '405', floor: 4, category: 'Quádruplo', subcategory: 'com ventilador', capacity: 4, beds: 4, bedType: 'Solteiro', amenities: ['Ventilador de teto', 'Wi-Fi', 'TV 40"', 'Banheiro privativo'], description: 'Quarto quádruplo espaçoso e bem ventilado.', dailyRate: 260, status: 'Disponível', photo: ROOM_PHOTOS.quadruplo[1] },
  { id: 'R033', number: '406', floor: 4, category: 'Quádruplo', subcategory: 'com ventilador', capacity: 4, beds: 4, bedType: 'Solteiro', amenities: ['Ventilador de teto', 'Wi-Fi', 'TV 40"', 'Banheiro privativo'], description: 'Quarto quádruplo simples com boa relação custo-benefício.', dailyRate: 260, status: 'Ocupado', photo: ROOM_PHOTOS.quadruplo[2] },

  // Quádruplo com ar + frigobar (407-409)
  { id: 'R034', number: '407', floor: 4, category: 'Quádruplo', subcategory: 'com ar-condicionado + frigobar', capacity: 4, beds: 4, bedType: 'Solteiro', amenities: ['Ar-condicionado', 'Frigobar', 'Wi-Fi', 'TV 55"', 'Banheiro duplo', 'Cofre', 'Varanda ampla', 'Secador'], description: 'Suíte quádrupla premium com frigobar e dois banheiros.', dailyRate: 380, status: 'Disponível', photo: ROOM_PHOTOS.quadruplo[0] },
  { id: 'R035', number: '408', floor: 4, category: 'Quádruplo', subcategory: 'com ar-condicionado + frigobar', capacity: 4, beds: 4, bedType: 'Solteiro', amenities: ['Ar-condicionado', 'Frigobar', 'Wi-Fi', 'TV 55"', 'Banheiro duplo', 'Cofre', 'Varanda ampla', 'Secador'], description: 'Suíte quádrupla de luxo com varanda e vista privilegiada.', dailyRate: 380, status: 'Reservado', photo: ROOM_PHOTOS.quadruplo[1] },
  { id: 'R036', number: '409', floor: 4, category: 'Quádruplo', subcategory: 'com ar-condicionado + frigobar', capacity: 4, beds: 4, bedType: 'Solteiro', amenities: ['Ar-condicionado', 'Frigobar', 'Wi-Fi', 'TV 55"', 'Banheiro duplo', 'Cofre', 'Varanda ampla', 'Secador'], description: 'Suíte quádrupla exclusiva para famílias que exigem o melhor.', dailyRate: 380, status: 'Disponível', photo: ROOM_PHOTOS.quadruplo[2] },
];

// ─── Guests (35) ─────────────────────────────────────────────────────────────
export const guests: Guest[] = [
  { id: 'G001', name: 'Ana Carolina Silva Santos', cpf: '432.156.789-01', birthDate: '1990-03-15', gender: 'Feminino', email: 'ana.carolina@email.com', phone: '(11) 3456-7890', mobile: '(11) 99234-5678', zipCode: '01310-100', state: 'SP', city: 'São Paulo', neighborhood: 'Bela Vista', street: 'Rua da Consolação', addressNumber: '1200', registeredAt: '2023-01-15', status: 'Ativo', totalReservations: 5, lastStay: '2025-07-10' },
  { id: 'G002', name: 'Roberto Ferreira Alves', cpf: '567.890.123-45', birthDate: '1985-07-22', gender: 'Masculino', email: 'roberto.alves@email.com', phone: '(21) 2345-6789', mobile: '(21) 98765-4321', zipCode: '22041-001', state: 'RJ', city: 'Rio de Janeiro', neighborhood: 'Copacabana', street: 'Av. Atlântica', addressNumber: '500', registeredAt: '2023-02-20', status: 'Ativo', totalReservations: 3, lastStay: '2025-06-22' },
  { id: 'G003', name: 'Mariana Costa Oliveira', cpf: '234.567.890-12', birthDate: '1992-11-08', gender: 'Feminino', email: 'mariana.oliveira@email.com', phone: '(31) 3123-4567', mobile: '(31) 97654-3210', zipCode: '30130-110', state: 'MG', city: 'Belo Horizonte', neighborhood: 'Savassi', street: 'Rua Pernambuco', addressNumber: '342', registeredAt: '2023-03-10', status: 'Ativo', totalReservations: 7, lastStay: '2025-08-01' },
  { id: 'G004', name: 'João Pedro Nascimento', cpf: '789.012.345-67', birthDate: '1988-05-30', gender: 'Masculino', email: 'joao.nascimento@email.com', phone: '(71) 3456-7890', mobile: '(71) 99123-4567', zipCode: '40020-010', state: 'BA', city: 'Salvador', neighborhood: 'Barra', street: 'Av. Oceânica', addressNumber: '890', registeredAt: '2023-04-05', status: 'Ativo', totalReservations: 2, lastStay: '2025-05-15' },
  { id: 'G005', name: 'Fernanda Lima Rodrigues', cpf: '123.456.789-00', birthDate: '1995-09-12', gender: 'Feminino', email: 'fernanda.rodrigues@email.com', phone: '(81) 3234-5678', mobile: '(81) 98901-2345', zipCode: '50030-230', state: 'PE', city: 'Recife', neighborhood: 'Boa Viagem', street: 'Av. Boa Viagem', addressNumber: '2100', registeredAt: '2023-05-18', status: 'Ativo', totalReservations: 4, lastStay: '2025-07-28' },
  { id: 'G006', name: 'Carlos Eduardo Martins', cpf: '890.123.456-78', birthDate: '1982-01-25', gender: 'Masculino', email: 'carlos.martins@email.com', phone: '(11) 3987-6543', mobile: '(11) 97890-1234', zipCode: '04538-133', state: 'SP', city: 'São Paulo', neighborhood: 'Itaim Bibi', street: 'Rua Joaquim Floriano', addressNumber: '72', registeredAt: '2023-06-12', status: 'Ativo', totalReservations: 9, lastStay: '2025-08-10' },
  { id: 'G007', name: 'Juliana Sousa Pereira', cpf: '345.678.901-23', birthDate: '1991-12-03', gender: 'Feminino', email: 'juliana.pereira@email.com', phone: '(62) 3345-6789', mobile: '(62) 99678-9012', zipCode: '74110-010', state: 'GO', city: 'Goiânia', neighborhood: 'Setor Bueno', street: 'Av. T-10', addressNumber: '1500', registeredAt: '2023-07-22', status: 'Ativo', totalReservations: 1, lastStay: '2025-03-10' },
  { id: 'G008', name: 'Pedro Henrique Araújo', cpf: '678.901.234-56', birthDate: '1987-06-17', gender: 'Masculino', email: 'pedro.araujo@email.com', phone: '(85) 3456-7890', mobile: '(85) 99234-5678', zipCode: '60175-047', state: 'CE', city: 'Fortaleza', neighborhood: 'Meireles', street: 'Rua dos Tabajaras', addressNumber: '320', registeredAt: '2023-08-15', status: 'Ativo', totalReservations: 6, lastStay: '2025-07-05' },
  { id: 'G009', name: 'Lucia Helena Barbosa', cpf: '901.234.567-89', birthDate: '1978-04-20', gender: 'Feminino', email: 'lucia.barbosa@email.com', phone: '(48) 3234-5678', mobile: '(48) 99012-3456', zipCode: '88015-200', state: 'SC', city: 'Florianópolis', neighborhood: 'Centro', street: 'Rua Felipe Schmidt', addressNumber: '115', registeredAt: '2023-09-01', status: 'Ativo', totalReservations: 3, lastStay: '2025-06-18' },
  { id: 'G010', name: 'Marcelo dos Santos Costa', cpf: '012.345.678-90', birthDate: '1993-08-28', gender: 'Masculino', email: 'marcelo.costa@email.com', phone: '(41) 3123-4567', mobile: '(41) 98765-0123', zipCode: '80230-130', state: 'PR', city: 'Curitiba', neighborhood: 'Batel', street: 'Av. do Batel', addressNumber: '880', registeredAt: '2023-09-20', status: 'Ativo', totalReservations: 4, lastStay: '2025-07-20' },
  { id: 'G011', name: 'Tatiana Mendes Ribeiro', cpf: '456.789.012-34', birthDate: '1989-02-14', gender: 'Feminino', email: 'tatiana.ribeiro@email.com', phone: '(92) 3456-7890', mobile: '(92) 99876-5432', zipCode: '69010-060', state: 'AM', city: 'Manaus', neighborhood: 'Centro', street: 'Av. Eduardo Ribeiro', addressNumber: '520', registeredAt: '2023-10-05', status: 'Ativo', totalReservations: 2, lastStay: '2025-04-12' },
  { id: 'G012', name: 'Rafael Gomes da Silva', cpf: '234.890.567-12', birthDate: '1996-10-07', gender: 'Masculino', email: 'rafael.silva@email.com', phone: '(65) 3234-5678', mobile: '(65) 99345-6789', zipCode: '78048-545', state: 'MT', city: 'Cuiabá', neighborhood: 'Centro-Norte', street: 'Av. Getúlio Vargas', addressNumber: '730', registeredAt: '2023-10-25', status: 'Ativo', totalReservations: 1, lastStay: '2025-02-28' },
  { id: 'G013', name: 'Beatriz Cavalcante Moura', cpf: '678.123.456-89', birthDate: '1994-07-11', gender: 'Feminino', email: 'beatriz.moura@email.com', phone: '(98) 3345-6789', mobile: '(98) 98901-2345', zipCode: '65010-650', state: 'MA', city: 'São Luís', neighborhood: 'Centro', street: 'Rua Grande', addressNumber: '195', registeredAt: '2023-11-08', status: 'Ativo', totalReservations: 5, lastStay: '2025-08-05' },
  { id: 'G014', name: 'Alexandre Cardoso Nunes', cpf: '901.567.234-78', birthDate: '1983-03-19', gender: 'Masculino', email: 'alexandre.nunes@email.com', phone: '(27) 3456-7890', mobile: '(27) 99456-7890', zipCode: '29050-410', state: 'ES', city: 'Vitória', neighborhood: 'Jardim da Penha', street: 'Av. Adalberto Simão Nader', addressNumber: '1500', registeredAt: '2023-11-30', status: 'Ativo', totalReservations: 3, lastStay: '2025-06-30' },
  { id: 'G015', name: 'Priscila Torres Vieira', cpf: '345.012.678-90', birthDate: '1998-12-25', gender: 'Feminino', email: 'priscila.vieira@email.com', phone: '(84) 3234-5678', mobile: '(84) 99234-5678', zipCode: '59020-300', state: 'RN', city: 'Natal', neighborhood: 'Petrópolis', street: 'Av. Hermes da Fonseca', addressNumber: '720', registeredAt: '2024-01-10', status: 'Ativo', totalReservations: 2, lastStay: '2025-05-20' },
  { id: 'G016', name: 'Lucas Andrade Ferreira', cpf: '567.234.890-12', birthDate: '1990-09-05', gender: 'Masculino', email: 'lucas.ferreira@email.com', phone: '(86) 3345-6789', mobile: '(86) 99567-8901', zipCode: '64049-550', state: 'PI', city: 'Teresina', neighborhood: 'Fátima', street: 'Av. Frei Serafim', addressNumber: '2240', registeredAt: '2024-01-28', status: 'Ativo', totalReservations: 1, lastStay: '2025-01-15' },
  { id: 'G017', name: 'Camila Rocha Figueiredo', cpf: '890.456.123-34', birthDate: '1993-05-22', gender: 'Feminino', email: 'camila.figueiredo@email.com', phone: '(83) 3456-7890', mobile: '(83) 99678-9012', zipCode: '58010-490', state: 'PB', city: 'João Pessoa', neighborhood: 'Tambaú', street: 'Av. Almirante Tamandaré', addressNumber: '640', registeredAt: '2024-02-15', status: 'Ativo', totalReservations: 4, lastStay: '2025-07-15' },
  { id: 'G018', name: 'Thiago Melo Souza', cpf: '123.789.456-01', birthDate: '1986-11-30', gender: 'Masculino', email: 'thiago.souza@email.com', phone: '(82) 3234-5678', mobile: '(82) 99012-3456', zipCode: '57020-050', state: 'AL', city: 'Maceió', neighborhood: 'Ponta Verde', street: 'Av. Álvaro Otacílio', addressNumber: '2915', registeredAt: '2024-02-28', status: 'Ativo', totalReservations: 3, lastStay: '2025-06-05' },
  { id: 'G019', name: 'Gabriela Pinto Lemos', cpf: '456.123.789-23', birthDate: '1997-08-16', gender: 'Feminino', email: 'gabriela.lemos@email.com', phone: '(79) 3345-6789', mobile: '(79) 99345-6789', zipCode: '49010-640', state: 'SE', city: 'Aracaju', neighborhood: 'Atalaia', street: 'Av. Santos Dumont', addressNumber: '1100', registeredAt: '2024-03-12', status: 'Ativo', totalReservations: 2, lastStay: '2025-04-28' },
  { id: 'G020', name: 'Felipe Correia Dias', cpf: '789.456.123-56', birthDate: '1991-01-09', gender: 'Masculino', email: 'felipe.dias@email.com', phone: '(63) 3456-7890', mobile: '(63) 99456-7890', zipCode: '77015-016', state: 'TO', city: 'Palmas', neighborhood: 'Plano Diretor Sul', street: 'Quadra 504 Sul', addressNumber: '15', registeredAt: '2024-03-25', status: 'Ativo', totalReservations: 1, lastStay: '2025-03-20' },
  { id: 'G021', name: 'Amanda Borges Ramos', cpf: '012.678.345-67', birthDate: '1994-04-14', gender: 'Feminino', email: 'amanda.ramos@email.com', phone: '(61) 3234-5678', mobile: '(61) 99789-0123', zipCode: '70310-500', state: 'DF', city: 'Brasília', neighborhood: 'Asa Norte', street: 'SQN 316 Bloco B', addressNumber: '210', registeredAt: '2024-04-08', status: 'Ativo', totalReservations: 6, lastStay: '2025-08-08' },
  { id: 'G022', name: 'Gustavo Alves Miranda', cpf: '345.901.678-89', birthDate: '1980-06-27', gender: 'Masculino', email: 'gustavo.miranda@email.com', phone: '(31) 3456-7890', mobile: '(31) 99890-1234', zipCode: '30140-071', state: 'MG', city: 'Belo Horizonte', neighborhood: 'Lourdes', street: 'Av. Álvares Cabral', addressNumber: '1800', registeredAt: '2024-04-20', status: 'Ativo', totalReservations: 4, lastStay: '2025-07-25' },
  { id: 'G023', name: 'Natália Carvalho Monteiro', cpf: '678.345.012-01', birthDate: '1995-02-18', gender: 'Feminino', email: 'natalia.monteiro@email.com', phone: '(51) 3234-5678', mobile: '(51) 99012-3456', zipCode: '90050-170', state: 'RS', city: 'Porto Alegre', neighborhood: 'Moinhos de Vento', street: 'Rua Padre Chagas', addressNumber: '280', registeredAt: '2024-05-03', status: 'Ativo', totalReservations: 3, lastStay: '2025-06-12' },
  { id: 'G024', name: 'Eduardo Batista Pires', cpf: '901.678.345-12', birthDate: '1984-10-01', gender: 'Masculino', email: 'eduardo.pires@email.com', phone: '(11) 3789-0123', mobile: '(11) 97123-4567', zipCode: '01422-001', state: 'SP', city: 'São Paulo', neighborhood: 'Jardim Paulista', street: 'Alameda Franca', addressNumber: '950', registeredAt: '2024-05-18', status: 'Ativo', totalReservations: 8, lastStay: '2025-08-12' },
  { id: 'G025', name: 'Renata Campos Silva', cpf: '234.012.567-34', birthDate: '1989-07-05', gender: 'Feminino', email: 'renata.silva@email.com', phone: '(21) 3456-7890', mobile: '(21) 98456-7890', zipCode: '20521-180', state: 'RJ', city: 'Rio de Janeiro', neighborhood: 'Botafogo', street: 'Rua Voluntários da Pátria', addressNumber: '445', registeredAt: '2024-06-01', status: 'Ativo', totalReservations: 2, lastStay: '2025-05-08' },
  { id: 'G026', name: 'Diego Machado Costa', cpf: '567.345.901-23', birthDate: '1992-03-12', gender: 'Masculino', email: 'diego.costa@email.com', phone: '(41) 3234-5678', mobile: '(41) 99345-6789', zipCode: '80250-020', state: 'PR', city: 'Curitiba', neighborhood: 'Centro Cívico', street: 'Av. Cândido de Abreu', addressNumber: '817', registeredAt: '2024-06-15', status: 'Ativo', totalReservations: 3, lastStay: '2025-07-02' },
  { id: 'G027', name: 'Isabela Freitas Lopes', cpf: '890.234.567-45', birthDate: '1996-11-20', gender: 'Feminino', email: 'isabela.lopes@email.com', phone: '(85) 3345-6789', mobile: '(85) 99678-9012', zipCode: '60160-200', state: 'CE', city: 'Fortaleza', neighborhood: 'Aldeota', street: 'Av. Dom Luís', addressNumber: '500', registeredAt: '2024-07-08', status: 'Ativo', totalReservations: 1, lastStay: '2025-04-05' },
  { id: 'G028', name: 'Rodrigo Cunha Neves', cpf: '123.567.890-56', birthDate: '1981-08-24', gender: 'Masculino', email: 'rodrigo.neves@email.com', phone: '(71) 3456-7890', mobile: '(71) 99012-3456', zipCode: '40140-130', state: 'BA', city: 'Salvador', neighborhood: 'Pituba', street: 'Av. Manoel Dias', addressNumber: '1280', registeredAt: '2024-07-22', status: 'Ativo', totalReservations: 5, lastStay: '2025-08-15' },
  { id: 'G029', name: 'Larissa Teixeira Almeida', cpf: '456.890.123-67', birthDate: '1993-01-30', gender: 'Feminino', email: 'larissa.almeida@email.com', phone: '(62) 3234-5678', mobile: '(62) 99234-5678', zipCode: '74093-020', state: 'GO', city: 'Goiânia', neighborhood: 'Jardim América', street: 'Av. 85', addressNumber: '425', registeredAt: '2024-08-05', status: 'Ativo', totalReservations: 2, lastStay: '2025-06-25' },
  { id: 'G030', name: 'Vinícius Borges Carmo', cpf: '789.123.456-78', birthDate: '1987-05-15', gender: 'Masculino', email: 'vinicius.carmo@email.com', phone: '(11) 3890-1234', mobile: '(11) 98678-9012', zipCode: '05416-001', state: 'SP', city: 'São Paulo', neighborhood: 'Pinheiros', street: 'Rua dos Pinheiros', addressNumber: '1050', registeredAt: '2024-08-18', status: 'Ativo', totalReservations: 7, lastStay: '2025-08-18' },
  { id: 'G031', name: 'Aline Santos Guimarães', cpf: '012.456.789-89', birthDate: '1994-09-08', gender: 'Feminino', email: 'aline.guimaraes@email.com', phone: '(81) 3345-6789', mobile: '(81) 99456-7890', zipCode: '50040-090', state: 'PE', city: 'Recife', neighborhood: 'Espinheiro', street: 'Rua Júlio de Albuquerque', addressNumber: '680', registeredAt: '2024-09-02', status: 'Ativo', totalReservations: 3, lastStay: '2025-07-10' },
  { id: 'G032', name: 'Matheus Oliveira Santana', cpf: '345.678.012-01', birthDate: '1998-04-22', gender: 'Masculino', email: 'matheus.santana@email.com', phone: '(31) 3567-8901', mobile: '(31) 99890-0123', zipCode: '30110-001', state: 'MG', city: 'Belo Horizonte', neighborhood: 'Centro', street: 'Av. Afonso Pena', addressNumber: '3000', registeredAt: '2024-09-15', status: 'Ativo', totalReservations: 1, lastStay: '2025-05-30' },
  { id: 'G033', name: 'Patrícia Reis Cavalcanti', cpf: '678.012.345-12', birthDate: '1986-12-10', gender: 'Feminino', email: 'patricia.cavalcanti@email.com', phone: '(21) 3678-9012', mobile: '(21) 97567-8901', zipCode: '22060-022', state: 'RJ', city: 'Rio de Janeiro', neighborhood: 'Ipanema', street: 'Rua Visconde de Pirajá', addressNumber: '550', registeredAt: '2024-10-01', status: 'Inativo', totalReservations: 2, lastStay: '2024-12-20' },
  { id: 'G034', name: 'Bruno Moraes Tavares', cpf: '901.345.678-23', birthDate: '1990-07-07', gender: 'Masculino', email: 'bruno.tavares@email.com', phone: '(92) 3456-7890', mobile: '(92) 99123-4567', zipCode: '69040-010', state: 'AM', city: 'Manaus', neighborhood: 'Adrianópolis', street: 'Rua Rio Jutaí', addressNumber: '210', registeredAt: '2024-10-20', status: 'Ativo', totalReservations: 2, lastStay: '2025-06-08' },
  { id: 'G035', name: 'Samira Farias Azevedo', cpf: '234.678.901-34', birthDate: '1995-06-03', gender: 'Feminino', email: 'samira.azevedo@email.com', phone: '(91) 3234-5678', mobile: '(91) 99345-6789', zipCode: '66035-110', state: 'PA', city: 'Belém', neighborhood: 'Umarizal', street: 'Av. Nazaré', addressNumber: '870', registeredAt: '2024-11-05', status: 'Ativo', totalReservations: 1, lastStay: '2025-07-30' },
];

// ─── Employees (12) ───────────────────────────────────────────────────────────
export const employees: Employee[] = [
  { id: 'E001', name: 'Maria José Andrade', cpf: '111.222.333-44', birthDate: '1975-04-10', email: 'maria.andrade@barrahotel.com', phone: '(11) 3000-1001', role: 'Administrador', department: 'Administração', hiredAt: '2018-03-01', status: 'Ativo', username: 'maria.andrade' },
  { id: 'E002', name: 'Sérgio Lima Ferraz', cpf: '222.333.444-55', birthDate: '1979-08-22', email: 'sergio.ferraz@barrahotel.com', phone: '(11) 3000-1002', role: 'Gerente', department: 'Operações', hiredAt: '2019-06-15', status: 'Ativo', username: 'sergio.ferraz' },
  { id: 'E003', name: 'Carolina Santos Neves', cpf: '333.444.555-66', birthDate: '1992-02-18', email: 'carolina.neves@barrahotel.com', phone: '(11) 3000-1003', role: 'Recepcionista', department: 'Recepção', hiredAt: '2020-01-10', status: 'Ativo', username: 'carolina.neves' },
  { id: 'E004', name: 'Antônio Carlos Pinto', cpf: '444.555.666-77', birthDate: '1988-11-05', email: 'antonio.pinto@barrahotel.com', phone: '(11) 3000-1004', role: 'Recepcionista', department: 'Recepção', hiredAt: '2020-04-20', status: 'Ativo', username: 'antonio.pinto' },
  { id: 'E005', name: 'Vanessa Rodrigues Costa', cpf: '555.666.777-88', birthDate: '1994-07-30', email: 'vanessa.costa@barrahotel.com', phone: '(11) 3000-1005', role: 'Recepcionista', department: 'Recepção', hiredAt: '2021-02-15', status: 'Ativo', username: 'vanessa.costa' },
  { id: 'E006', name: 'José Paulo Melo', cpf: '666.777.888-99', birthDate: '1983-03-14', email: 'jose.melo@barrahotel.com', phone: '(11) 3000-1006', role: 'Funcionário', department: 'Governança', hiredAt: '2019-09-01', status: 'Ativo', username: 'jose.melo' },
  { id: 'E007', name: 'Sônia Maria Faria', cpf: '777.888.999-00', birthDate: '1980-12-20', email: 'sonia.faria@barrahotel.com', phone: '(11) 3000-1007', role: 'Funcionário', department: 'Governança', hiredAt: '2018-07-15', status: 'Ativo', username: 'sonia.faria' },
  { id: 'E008', name: 'Marcelo Teixeira Lima', cpf: '888.999.000-11', birthDate: '1977-09-08', email: 'marcelo.lima@barrahotel.com', phone: '(11) 3000-1008', role: 'Funcionário', department: 'Manutenção', hiredAt: '2017-11-01', status: 'Ativo', username: 'marcelo.lima' },
  { id: 'E009', name: 'Rosa Helena Gomes', cpf: '999.000.111-22', birthDate: '1985-05-25', email: 'rosa.gomes@barrahotel.com', phone: '(11) 3000-1009', role: 'Funcionário', department: 'Governança', hiredAt: '2022-03-01', status: 'Ativo', username: 'rosa.gomes' },
  { id: 'E010', name: 'Paulo Roberto Silva', cpf: '000.111.222-33', birthDate: '1970-01-15', email: 'paulo.silva@barrahotel.com', phone: '(11) 3000-1010', role: 'Gerente', department: 'Financeiro', hiredAt: '2016-05-01', status: 'Ativo', username: 'paulo.silva' },
  { id: 'E011', name: 'Eliane Borges Cruz', cpf: '111.333.555-77', birthDate: '1990-10-12', email: 'eliane.cruz@barrahotel.com', phone: '(11) 3000-1011', role: 'Funcionário', department: 'Recepção', hiredAt: '2021-08-20', status: 'Ativo', username: 'eliane.cruz' },
  { id: 'E012', name: 'Flávio Mendonça Souza', cpf: '222.444.666-88', birthDate: '1982-06-18', email: 'flavio.souza@barrahotel.com', phone: '(11) 3000-1012', role: 'Funcionário', department: 'Manutenção', hiredAt: '2020-11-10', status: 'Inativo', username: 'flavio.souza' },
];

// ─── Reservations (30) ────────────────────────────────────────────────────────
export const reservations: Reservation[] = [
  { id: 'RES001', code: 'BH-2025-001', guestId: 'G006', roomId: 'R010', checkIn: '2025-08-15', checkOut: '2025-08-20', guests: 2, dailyRate: 180, nights: 5, total: 900, paymentMethod: 'PIX', status: 'Em hospedagem', createdAt: '2025-08-01' },
  { id: 'RES002', code: 'BH-2025-002', guestId: 'G003', roomId: 'R017', checkIn: '2025-08-12', checkOut: '2025-08-19', guests: 2, dailyRate: 220, nights: 7, total: 1540, paymentMethod: 'Cartão de crédito', status: 'Em hospedagem', createdAt: '2025-07-28' },
  { id: 'RES003', code: 'BH-2025-003', guestId: 'G024', roomId: 'R020', checkIn: '2025-08-10', checkOut: '2025-08-17', guests: 3, dailyRate: 250, nights: 7, total: 1750, paymentMethod: 'Cartão de crédito', status: 'Em hospedagem', createdAt: '2025-07-25' },
  { id: 'RES004', code: 'BH-2025-004', guestId: 'G030', roomId: 'R026', checkIn: '2025-08-14', checkOut: '2025-08-18', guests: 3, dailyRate: 300, nights: 4, total: 1200, paymentMethod: 'PIX', status: 'Em hospedagem', createdAt: '2025-08-02' },
  { id: 'RES005', code: 'BH-2025-005', guestId: 'G021', roomId: 'R033', checkIn: '2025-08-16', checkOut: '2025-08-23', guests: 4, dailyRate: 260, nights: 7, total: 1820, paymentMethod: 'Cartão de débito', status: 'Em hospedagem', createdAt: '2025-08-04' },
  { id: 'RES006', code: 'BH-2025-006', guestId: 'G001', roomId: 'R002', checkIn: '2025-08-11', checkOut: '2025-08-13', guests: 1, dailyRate: 120, nights: 2, total: 240, paymentMethod: 'Dinheiro', status: 'Finalizada', createdAt: '2025-07-30' },
  { id: 'RES007', code: 'BH-2025-007', guestId: 'G008', roomId: 'R011', checkIn: '2025-08-20', checkOut: '2025-08-25', guests: 2, dailyRate: 180, nights: 5, total: 900, paymentMethod: 'PIX', status: 'Confirmada', createdAt: '2025-08-05' },
  { id: 'RES008', code: 'BH-2025-008', guestId: 'G013', roomId: 'R016', checkIn: '2025-08-22', checkOut: '2025-08-27', guests: 2, dailyRate: 220, nights: 5, total: 1100, paymentMethod: 'Cartão de crédito', status: 'Confirmada', createdAt: '2025-08-06' },
  { id: 'RES009', code: 'BH-2025-009', guestId: 'G028', roomId: 'R018', checkIn: '2025-08-25', checkOut: '2025-08-30', guests: 2, dailyRate: 220, nights: 5, total: 1100, paymentMethod: 'PIX', status: 'Confirmada', createdAt: '2025-08-07' },
  { id: 'RES010', code: 'BH-2025-010', guestId: 'G022', roomId: 'R029', checkIn: '2025-08-19', checkOut: '2025-08-24', guests: 4, dailyRate: 320, nights: 5, total: 1600, paymentMethod: 'Cartão de crédito', status: 'Confirmada', createdAt: '2025-08-08' },
  { id: 'RES011', code: 'BH-2025-011', guestId: 'G005', roomId: 'R003', checkIn: '2025-08-21', checkOut: '2025-08-23', guests: 1, dailyRate: 120, nights: 2, total: 240, paymentMethod: 'Dinheiro', status: 'Confirmada', createdAt: '2025-08-09' },
  { id: 'RES012', code: 'BH-2025-012', guestId: 'G017', roomId: 'R023', checkIn: '2025-08-23', checkOut: '2025-08-28', guests: 3, dailyRate: 200, nights: 5, total: 1000, paymentMethod: 'PIX', status: 'Confirmada', createdAt: '2025-08-10' },
  { id: 'RES013', code: 'BH-2025-013', guestId: 'G010', roomId: 'R035', checkIn: '2025-08-28', checkOut: '2025-09-03', guests: 4, dailyRate: 380, nights: 6, total: 2280, paymentMethod: 'Cartão de crédito', status: 'Confirmada', createdAt: '2025-08-11' },
  { id: 'RES014', code: 'BH-2025-014', guestId: 'G002', roomId: 'R007', checkIn: '2025-09-01', checkOut: '2025-09-05', guests: 1, dailyRate: 150, nights: 4, total: 600, paymentMethod: 'PIX', status: 'Pendente', createdAt: '2025-08-12' },
  { id: 'RES015', code: 'BH-2025-015', guestId: 'G031', roomId: 'R014', checkIn: '2025-09-05', checkOut: '2025-09-10', guests: 2, dailyRate: 140, nights: 5, total: 700, paymentMethod: 'Cartão de débito', status: 'Pendente', createdAt: '2025-08-13' },
  { id: 'RES016', code: 'BH-2025-016', guestId: 'G004', roomId: 'R001', checkIn: '2025-07-20', checkOut: '2025-07-24', guests: 1, dailyRate: 120, nights: 4, total: 480, paymentMethod: 'PIX', status: 'Finalizada', createdAt: '2025-07-10' },
  { id: 'RES017', code: 'BH-2025-017', guestId: 'G009', roomId: 'R010', checkIn: '2025-07-10', checkOut: '2025-07-15', guests: 2, dailyRate: 180, nights: 5, total: 900, paymentMethod: 'Cartão de crédito', status: 'Finalizada', createdAt: '2025-06-28' },
  { id: 'RES018', code: 'BH-2025-018', guestId: 'G023', roomId: 'R016', checkIn: '2025-06-25', checkOut: '2025-06-30', guests: 2, dailyRate: 220, nights: 5, total: 1100, paymentMethod: 'PIX', status: 'Finalizada', createdAt: '2025-06-10' },
  { id: 'RES019', code: 'BH-2025-019', guestId: 'G014', roomId: 'R019', checkIn: '2025-07-01', checkOut: '2025-07-06', guests: 3, dailyRate: 250, nights: 5, total: 1250, paymentMethod: 'Dinheiro', status: 'Finalizada', createdAt: '2025-06-15' },
  { id: 'RES020', code: 'BH-2025-020', guestId: 'G026', roomId: 'R028', checkIn: '2025-07-15', checkOut: '2025-07-20', guests: 4, dailyRate: 320, nights: 5, total: 1600, paymentMethod: 'Cartão de crédito', status: 'Finalizada', createdAt: '2025-07-01' },
  { id: 'RES021', code: 'BH-2025-021', guestId: 'G011', roomId: 'R004', checkIn: '2025-08-01', checkOut: '2025-08-05', guests: 1, dailyRate: 90, nights: 4, total: 360, paymentMethod: 'PIX', status: 'Finalizada', createdAt: '2025-07-20' },
  { id: 'RES022', code: 'BH-2025-022', guestId: 'G007', roomId: 'R013', checkIn: '2025-07-28', checkOut: '2025-08-01', guests: 2, dailyRate: 140, nights: 4, total: 560, paymentMethod: 'Cartão de débito', status: 'Finalizada', createdAt: '2025-07-15' },
  { id: 'RES023', code: 'BH-2025-023', guestId: 'G015', roomId: 'R009', checkIn: '2025-08-30', checkOut: '2025-09-02', guests: 1, dailyRate: 150, nights: 3, total: 450, paymentMethod: 'PIX', status: 'Pendente', createdAt: '2025-08-15' },
  { id: 'RES024', code: 'BH-2025-024', guestId: 'G029', roomId: 'R016', checkIn: '2025-06-10', checkOut: '2025-06-15', guests: 2, dailyRate: 220, nights: 5, total: 1100, paymentMethod: 'Cartão de crédito', status: 'Cancelada', createdAt: '2025-05-28', notes: 'Cancelada a pedido do hóspede' },
  { id: 'RES025', code: 'BH-2025-025', guestId: 'G016', roomId: 'R005', checkIn: '2025-07-05', checkOut: '2025-07-08', guests: 1, dailyRate: 90, nights: 3, total: 270, paymentMethod: 'Dinheiro', status: 'Cancelada', createdAt: '2025-06-20', notes: 'Cancelada - emergência familiar' },
  { id: 'RES026', code: 'BH-2025-026', guestId: 'G033', roomId: 'R022', checkIn: '2025-06-20', checkOut: '2025-06-25', guests: 3, dailyRate: 200, nights: 5, total: 1000, paymentMethod: 'PIX', status: 'Cancelada', createdAt: '2025-06-01' },
  { id: 'RES027', code: 'BH-2025-027', guestId: 'G035', roomId: 'R007', checkIn: '2025-08-28', checkOut: '2025-08-31', guests: 1, dailyRate: 150, nights: 3, total: 450, paymentMethod: 'PIX', status: 'Confirmada', createdAt: '2025-08-14' },
  { id: 'RES028', code: 'BH-2025-028', guestId: 'G034', roomId: 'R012', checkIn: '2025-09-10', checkOut: '2025-09-15', guests: 2, dailyRate: 180, nights: 5, total: 900, paymentMethod: 'Cartão de crédito', status: 'Pendente', createdAt: '2025-08-15' },
  { id: 'RES029', code: 'BH-2025-029', guestId: 'G025', roomId: 'R025', checkIn: '2025-09-03', checkOut: '2025-09-08', guests: 3, dailyRate: 300, nights: 5, total: 1500, paymentMethod: 'PIX', status: 'Confirmada', createdAt: '2025-08-14' },
  { id: 'RES030', code: 'BH-2025-030', guestId: 'G019', roomId: 'R034', checkIn: '2025-09-12', checkOut: '2025-09-18', guests: 4, dailyRate: 380, nights: 6, total: 2280, paymentMethod: 'Cartão de crédito', status: 'Pendente', createdAt: '2025-08-15' },
];

// ─── Tasks (housekeeping + maintenance) ──────────────────────────────────────
export const tasks: Task[] = [
  { id: 'T001', roomId: 'R005', type: 'Limpeza', employeeId: 'E007', date: '2025-08-20', time: '09:00', status: 'Em andamento', priority: 'Alta', notes: 'Limpeza pós check-out' },
  { id: 'T002', roomId: 'R015', type: 'Limpeza', employeeId: 'E006', date: '2025-08-20', time: '10:00', status: 'Pendente', priority: 'Média' },
  { id: 'T003', roomId: 'R027', type: 'Limpeza', employeeId: 'E009', date: '2025-08-20', time: '11:00', status: 'Pendente', priority: 'Alta', notes: 'Limpeza profunda solicitada pelo hóspede anterior' },
  { id: 'T004', roomId: 'R008', type: 'Manutenção', employeeId: 'E008', date: '2025-08-20', time: '08:00', status: 'Em andamento', priority: 'Alta', notes: 'Troca de filtro do ar-condicionado' },
  { id: 'T005', roomId: 'R004', type: 'Limpeza', employeeId: 'E007', date: '2025-08-20', time: '14:00', status: 'Concluído', priority: 'Baixa' },
  { id: 'T006', roomId: 'R013', type: 'Limpeza', employeeId: 'E009', date: '2025-08-20', time: '15:00', status: 'Concluído', priority: 'Média' },
  { id: 'T007', roomId: 'R021', type: 'Manutenção', employeeId: 'E008', date: '2025-08-21', time: '09:00', status: 'Pendente', priority: 'Média', notes: 'Verificação da rede elétrica' },
  { id: 'T008', roomId: 'R006', type: 'Limpeza', employeeId: 'E006', date: '2025-08-21', time: '08:00', status: 'Pendente', priority: 'Alta' },
  { id: 'T009', roomId: 'R030', type: 'Limpeza', employeeId: 'E007', date: '2025-08-19', time: '16:00', status: 'Concluído', priority: 'Alta' },
  { id: 'T010', roomId: 'R031', type: 'Manutenção', employeeId: 'E008', date: '2025-08-22', time: '10:00', status: 'Pendente', priority: 'Baixa', notes: 'Substituição de torneira' },
];

// ─── Notifications ────────────────────────────────────────────────────────────
export const notifications: Notification[] = [
  { id: 'N001', type: 'info', title: 'Nova reserva', message: 'Reserva BH-2025-030 criada por Gabriela Pinto Lemos', time: '10 min atrás', read: false },
  { id: 'N002', type: 'warning', title: 'Check-out próximo', message: 'Quarto 309 com check-out previsto para hoje às 12:00', time: '30 min atrás', read: false },
  { id: 'N003', type: 'success', title: 'Pagamento confirmado', message: 'Reserva BH-2025-007 paga via PIX — R$ 900,00', time: '1h atrás', read: false },
  { id: 'N004', type: 'error', title: 'Manutenção urgente', message: 'Quarto 108: ar-condicionado com falha reportada', time: '2h atrás', read: true },
  { id: 'N005', type: 'info', title: 'Check-in realizado', message: 'Hóspede Carlos Eduardo Martins — Quarto 201', time: '3h atrás', read: true },
  { id: 'N006', type: 'warning', title: 'Reserva pendente', message: 'BH-2025-014 aguardando confirmação de pagamento', time: '4h atrás', read: true },
];

// ─── Analytics Data ───────────────────────────────────────────────────────────
export const monthlyRevenue = [
  { month: 'Mar', receita: 18400, reservas: 42 },
  { month: 'Abr', receita: 22100, reservas: 51 },
  { month: 'Mai', receita: 19800, reservas: 46 },
  { month: 'Jun', receita: 25600, reservas: 58 },
  { month: 'Jul', receita: 31200, reservas: 71 },
  { month: 'Ago', receita: 28900, reservas: 64 },
];

export const occupancyData = [
  { name: 'Single', value: 72 },
  { name: 'Casal', value: 88 },
  { name: 'Triplo', value: 65 },
  { name: 'Quádruplo', value: 57 },
];

export const weeklyCheckins = [
  { dia: 'Seg', checkins: 8, checkouts: 6 },
  { dia: 'Ter', checkins: 5, checkouts: 9 },
  { dia: 'Qua', checkins: 12, checkouts: 7 },
  { dia: 'Qui', checkins: 9, checkouts: 11 },
  { dia: 'Sex', checkins: 15, checkouts: 8 },
  { dia: 'Sáb', checkins: 18, checkouts: 12 },
  { dia: 'Dom', checkins: 11, checkouts: 14 },
];

// ─── Helper functions ─────────────────────────────────────────────────────────
export function getGuestById(id: string): Guest | undefined {
  return guests.find(g => g.id === id);
}

export function getRoomById(id: string): Room | undefined {
  return rooms.find(r => r.id === id);
}

export function getEmployeeById(id: string): Employee | undefined {
  return employees.find(e => e.id === id);
}

export function getReservationsByGuestId(guestId: string): Reservation[] {
  return reservations.filter(r => r.guestId === guestId);
}

export function formatCurrency(value: number): string {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export function formatDate(dateStr: string): string {
  const [year, month, day] = dateStr.split('-');
  return `${day}/${month}/${year}`;
}

export const STATUS_COLORS: Record<string, string> = {
  'Disponível': 'bg-emerald-100 text-emerald-700',
  'Reservado': 'bg-blue-100 text-blue-700',
  'Ocupado': 'bg-amber-100 text-amber-700',
  'Limpeza': 'bg-purple-100 text-purple-700',
  'Manutenção': 'bg-red-100 text-red-700',
  'Pendente': 'bg-amber-100 text-amber-700',
  'Confirmada': 'bg-blue-100 text-blue-700',
  'Em hospedagem': 'bg-emerald-100 text-emerald-700',
  'Finalizada': 'bg-slate-100 text-slate-700',
  'Cancelada': 'bg-red-100 text-red-700',
  'Ativo': 'bg-emerald-100 text-emerald-700',
  'Inativo': 'bg-slate-100 text-slate-500',
  'Em andamento': 'bg-blue-100 text-blue-700',
  'Concluído': 'bg-emerald-100 text-emerald-700',
};
