CREATE TABLE `note` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`time` integer NOT NULL,
	`text` text NOT NULL,
	`type` integer DEFAULT 0 NOT NULL,
	`scope` integer DEFAULT 0 NOT NULL,
	`parentID` integer
);
