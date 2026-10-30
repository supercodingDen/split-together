CREATE TABLE `evidence` (
	`id` text PRIMARY KEY NOT NULL,
	`room` text NOT NULL,
	`owner` text NOT NULL,
	`name` text NOT NULL,
	`mime` text NOT NULL,
	`fingerprint` text NOT NULL,
	`note` text DEFAULT '' NOT NULL,
	`payer` text,
	`status` text DEFAULT 'pending' NOT NULL,
	`created` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `grants` (
	`hash` text PRIMARY KEY NOT NULL,
	`room` text NOT NULL,
	`role` text NOT NULL,
	`member` text,
	`created` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `rooms` (
	`id` text PRIMARY KEY NOT NULL,
	`data` text NOT NULL,
	`version` integer DEFAULT 1 NOT NULL,
	`published` integer DEFAULT 0 NOT NULL,
	`updated` text NOT NULL,
	`deleted` integer DEFAULT 0 NOT NULL
);
