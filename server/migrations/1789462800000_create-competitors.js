/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
  pgm.createTable('competitors', {
    id: 'id',
    name: { type: 'text', notNull: true },
    positioning: { type: 'text', notNull: true, default: '' },
    created_at: { type: 'timestamptz', notNull: true, default: pgm.func('now()') },
    updated_at: { type: 'timestamptz', notNull: true, default: pgm.func('now()') },
  });

  pgm.createTable('competitor_pricing_history', {
    id: 'id',
    competitor_id: {
      type: 'integer',
      notNull: true,
      references: 'competitors',
      onDelete: 'CASCADE',
    },
    date: { type: 'date', notNull: true },
    price: { type: 'numeric(10,2)', notNull: true },
    plan: { type: 'text', notNull: true },
    created_at: { type: 'timestamptz', notNull: true, default: pgm.func('now()') },
  });

  pgm.createTable('company_pricing_plans', {
    id: 'id',
    plan: { type: 'text', notNull: true },
    price: { type: 'numeric(10,2)', notNull: true },
    effective_date: { type: 'date', notNull: true },
    created_at: { type: 'timestamptz', notNull: true, default: pgm.func('now()') },
  });

  pgm.createTable('competitor_edit_requests', {
    id: 'id',
    competitor_id: {
      type: 'integer',
      notNull: true,
      references: 'competitors',
      onDelete: 'CASCADE',
    },
    staff_id: {
      type: 'integer',
      notNull: true,
      references: 'users',
      onDelete: 'CASCADE',
    },
    field: { type: 'text', notNull: true, check: "field IN ('pricing', 'positioning')" },
    proposed_value: { type: 'text', notNull: true },
    reason: { type: 'text', notNull: true },
    status: {
      type: 'text',
      notNull: true,
      default: 'pending',
      check: "status IN ('pending', 'approved', 'rejected')",
    },
    resolved_by: {
      type: 'integer',
      references: 'users',
      onDelete: 'SET NULL',
    },
    resolved_at: { type: 'timestamptz' },
    created_at: { type: 'timestamptz', notNull: true, default: pgm.func('now()') },
  });

  pgm.createTable('notifications', {
    id: 'id',
    user_id: {
      type: 'integer',
      notNull: true,
      references: 'users',
      onDelete: 'CASCADE',
    },
    message: { type: 'text', notNull: true },
    edit_request_id: {
      type: 'integer',
      references: 'competitor_edit_requests',
      onDelete: 'CASCADE',
    },
    is_read: { type: 'boolean', notNull: true, default: false },
    created_at: { type: 'timestamptz', notNull: true, default: pgm.func('now()') },
  });

  pgm.createIndex('competitor_pricing_history', 'competitor_id');
  pgm.createIndex('competitor_edit_requests', 'competitor_id');
  pgm.createIndex('competitor_edit_requests', 'status');
  pgm.createIndex('notifications', 'user_id');
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropTable('notifications');
  pgm.dropTable('competitor_edit_requests');
  pgm.dropTable('company_pricing_plans');
  pgm.dropTable('competitor_pricing_history');
  pgm.dropTable('competitors');
};
