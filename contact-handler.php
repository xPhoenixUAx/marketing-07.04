<?php

declare(strict_types=1);

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: contact.html');
    exit;
}

function redirect_with_state(string $state): never
{
    header('Location: contact.html?form=' . rawurlencode($state));
    exit;
}

function clean_field(?string $value): string
{
    $value = trim((string) $value);
    $value = str_replace(["\r", "\n"], ' ', $value);
    return strip_tags($value);
}

$honeypot = trim((string) ($_POST['company_website'] ?? ''));
if ($honeypot !== '') {
    redirect_with_state('success');
}

$fullName = clean_field($_POST['full_name'] ?? '');
$email = filter_var(trim((string) ($_POST['email'] ?? '')), FILTER_VALIDATE_EMAIL);
$company = clean_field($_POST['company'] ?? '');
$website = trim((string) ($_POST['website'] ?? ''));
$serviceInterest = clean_field($_POST['service_interest'] ?? '');
$budgetRange = clean_field($_POST['budget_range'] ?? '');
$message = trim((string) ($_POST['message'] ?? ''));

if ($fullName === '' || $email === false || $serviceInterest === '' || $message === '') {
    redirect_with_state('invalid');
}

if ($website !== '' && filter_var($website, FILTER_VALIDATE_URL) === false) {
    redirect_with_state('invalid');
}

$safeMessage = trim(strip_tags($message));
if ($safeMessage === '') {
    redirect_with_state('invalid');
}

$to = 'support@primesetltd.com';
$subject = 'New website inquiry from ' . $fullName;

$bodyLines = [
    'New inquiry received from primesetltd.com',
    '',
    'Full Name: ' . $fullName,
    'Email: ' . $email,
    'Company: ' . ($company !== '' ? $company : 'Not provided'),
    'Website: ' . ($website !== '' ? $website : 'Not provided'),
    'Service of Interest: ' . $serviceInterest,
    'Budget Range: ' . ($budgetRange !== '' ? $budgetRange : 'Not provided'),
    '',
    'Message:',
    $safeMessage,
];

$headers = [
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'From: PRIMESET LIMITED <support@primesetltd.com>',
    'Reply-To: ' . $email,
];

$sent = mail(
    $to,
    $subject,
    implode(PHP_EOL, $bodyLines),
    implode(PHP_EOL, $headers)
);

redirect_with_state($sent ? 'success' : 'error');
